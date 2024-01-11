const { infoEmbed } = require("../embeds.js");
const config = require("../config.json");
const embeds = require("../embeds.js");

module.exports = {
	name: "ping",
	description: "Ping!",
	dcPermissions: ["EMBED_LINKS"],
	execute(message, args) {
		if(message.author.id != config.misc.owner) {
			message.channel.send(embeds.errorEmbed("Sorry, but you're not the owner of this SGRDINKDFGUJHNDF."));
		} else {
			message.channel.send(infoEmbed("Pong. test lmao GFJKNGDFJHKG"));
		}
	},
};
