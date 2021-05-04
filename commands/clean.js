// Copyright (C) 2020-2021 Vukky

const embeds = require("../utilities/embeds");
const vukkytils = require("../utilities/vukkytils");
const format = require("util").format;

module.exports = {
	name: "eat",
	description: "nom",
	botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
	userPermissions: ["MANAGE_MESSAGES"],
	args: true,
	guildOnly: true,
	usage: "<amount of messages to clear>",
	aliases: ["clear", "wipe", "clean"],
	execute(message, args) {
		if(parseInt(args[0]) < 1 || isNaN(parseInt(args[0]))) return message.channel.send(embeds.errorEmbed("its either thats not a number or it **is** but it's less than 1."));
		if(parseInt(args[0]) > 99) return message.channel.send(embeds.errorEmbed("i cant count that high aaaa"));

		message.channel.bulkDelete(parseInt(args[0]) + 1, true).then(() => {
			message.channel.send(format(vukkytils.getString("CLEANED_MESSAGES"), args[0])).then(msg => msg.delete({timeout: 2000}));
		});
	},
};
