const canvacord = require("canvacord").Canvas;
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
	name: "ohno",
	description: "i think this command is broken at the moment so yeah",
	botPermissions: ["ATTACH_FILES"],
	args: true,
	usage: "<text>",
	async execute(message, args) {
		await message.react(config.misc.emoji.loading);
		const ohno = await canvacord.ohno(args.slice(0).join(" "));
		await message.reactions.removeAll();
		message.channel.send(new Discord.MessageAttachment(ohno, "ohno.png"));
	},
};
