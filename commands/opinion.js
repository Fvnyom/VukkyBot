const canvacord = require("canvacord").Canvas;
const Discord = require("discord.js");

module.exports = {
	name: "opinion",
	description: "fathers son makes an opinion (real)",
	botPermissions: ["ATTACH_FILES"],
	async execute(message, args) {
		const opinion = await canvacord.opinion(message.author.avatarURL({ format: "png" }), args.slice(0).join(" "));
		message.channel.send(new Discord.MessageAttachment(opinion, "opinion.png"));
	},
};
