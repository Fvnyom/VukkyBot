const embeds = require("../utilities/embeds");
const vukkytils = require("../utilities/vukkytils");
const Discord = require("discord.js");

module.exports = {
	name: "unmute",
	description: "okay you can talk now <3",
	botPermissions: ["EMBED_LINKS", "MANAGE_ROLES"],
	userPermissions: ["MANAGE_ROLES"],
	guildOnly: true,
	args: true,
	usage: "<@user> [reason]",
	cooldown: 0,
	execute(message, args) {

		// Variables
		var mentionedUser = message.guild.member(message.mentions.users.first());
		var muteRole = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("muted"));
		// Conditions
		if (!mentionedUser) return message.channel.send(vukkytils.getString("PING_REQUIRED"));
		var authorHighestRole = message.member.roles.highest.position;
		var mentionHighestRole = mentionedUser.roles.highest.position;
		if(mentionHighestRole >= authorHighestRole) return message.channel.send("you cant unmute members with an equal or higher position than you");
		//if(!mentionedUser.muteable) return message.channel.send("i cant mute this user");




	}

	
};