const embeds = require("../utilities/embeds");
const vukkytils = require("../utilities/vukkytils");
const Discord = require("discord.js");

module.exports = {
	name: "mute",
	description: "when you need someone to PLEASE shut the fuck up",
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
		var muteReason = args.slice(1).join(" ") || "no reason specified";
		// Conditions
		if (!mentionedUser) return message.channel.send(vukkytils.getString("PING_REQUIRED"));
		if(mentionedUser.id === message.author.id) return message.channel.send(vukkytils.getString("CANT_MUTE_SELF"));
		if(mentionedUser.id === message.client.user.id) return message.channel.send(vukkytils.getString("BOT_PAIN"));
		var authorHighestRole = message.member.roles.highest.position;
		var mentionHighestRole = mentionedUser.roles.highest.position;
		if(mentionHighestRole >= authorHighestRole) return message.channel.send("you cant mute members with an equal or higher position than you");
		//if(!mentionedUser.muteable) return message.channel.send("i cant mute this user");

		if (!muteReason) muteReason = "no reason given";
		// Embed
		mentionedUser.send(`oh no you got muted from **${message.guild.name}**${(muteReason !== "no reason specified") ? ` for ${muteReason}.` : "."}`)
			.then(() => iHateThis())
			.catch(() => iHateThis());
	
		function iHateThis() {
			mentionedUser.roles.add(muteRole)
				.then(message.channel.send(embeds.successEmbed(`muted <@${mentionedUser.id}> (${mentionedUser.id}) from **${message.guild.name}**${(muteReason !== "no reason specified") ? `, for ${muteReason}.` : "."}`)));
		}

	}
};