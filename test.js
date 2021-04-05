
const cfg = require("./utilities/config.js");
async function tester() {
	cfg.init();
	console.log(await cfg.get("counting.channelName"));
	await cfg.set("counting.channelName", "poooooo");
	console.log(await cfg.get("counting.channelName"));
}
tester();
