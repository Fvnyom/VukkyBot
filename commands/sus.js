const { execute } = require("./headpat");

module.exports = {
	name: "sus",
	description: "wben the impsotrtor is sus",
	cooldown: 69,
	execute(message) {
		message.channel.send("no.");
	},
};