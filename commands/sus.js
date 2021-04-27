const { execute } = require("./headpat");

module.exports = {
	name: "sus",
	description: "no",
	cooldown: 69,
	execute(message) {
		message.channel.send("no.");
	},
};