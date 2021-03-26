
const cfg = require("./utilities/config.js");
async function tester() {
	cfg.init();
	console.log(await cfg.get("counting.channelName"));

	//cfg.set("misc.owner", ["708333380525228082", "125644326037487616"]);

}
tester();
