const http = require("http");
const fs = require("fs");
const url = require("url");
const fetch = require("node-fetch");
const config = require("./dashboard/static/dashboard.json");
const port = config.port;
require("dotenv").config();

var sessions = {};

http.createServer((req, res) => {
	if(req.method != "POST") {
		let responseCode = 404;
		let content = "404 Error";
		const urlObj = url.parse(req.url, true);
		if (urlObj.pathname === "/panel") {
			if (urlObj.query.code) {
				const accessCode = urlObj.query.code;
				const data = {
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					grant_type: "authorization_code",
					redirect_uri: config.redirect_uri,
					code: accessCode,
					scope: "identify",
				};

				fetch("https://discord.com/api/oauth2/token", {
					method: "POST",
					body: new URLSearchParams(data),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				})
					.then(discordRes => discordRes.json())
					.then(info => {
						console.log(info);
						sessions[accessCode] = info;
						return info;
					})
					.then(info => fetch("https://discord.com/api/users/@me", {
						headers: {
							authorization: `${info.token_type} ${info.access_token}`,
						},
					}))
					.then(userRes => userRes.json())
					.then(userRes => {
						if (isValidUser(userRes)) {
						//infoJson = userRes;
						//console.log(infoJson);
							responseCode = 200;
							content = fs.readFileSync("./dashboard/html/panel.html");
							res.writeHead(responseCode, {
								"content-type": "text/html;charset=utf-8",
							});
				
							res.write(content);
							res.end();
						} else {
							responseCode = 200; 
							content = fs.readFileSync("./dashboard/html/403.html");
							res.writeHead(responseCode, {
								"content-type": "text/html;charset=utf-8",
							});
				
							res.write(content);
							res.end();
						}
					});
			}
		} else {
			if (urlObj.pathname === "/") {
				responseCode = 200;
				//console.log(infoJson);
				content = fs.readFileSync("./dashboard/html/index.html");
				res.writeHead(responseCode, {
					"content-type": "text/html;charset=utf-8",
				});
		
				res.write(content);
				res.end();
			} else {



				fs.readFile(`${__dirname }/dashboard/static/${req.url}`, function (err,data) {
					if (err) {
						res.writeHead(404);
						res.end(JSON.stringify(err));
						return;
					}
					res.writeHead(200);
					res.end(data);
				});
			}
		}
	} else {
		let body = "";
		req.on("data", chunk => {
			body += chunk.toString(); // convert Buffer to string
		});
		req.on("end", () => {
			let sid = decodeReq(body);
			res.end(JSON.stringify(sessions[sid]));
		});
	}
})
	.listen(port);
function isValidUser(user) {
	return config.dashboardAccess.includes(user.id);
}

function decodeReq(req) {
	return req.split("=")[1];
}