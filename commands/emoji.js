const { successEmbed, errorEmbed } = require("../utilities/embeds");
const embeds = require("../utilities/embeds");

module.exports = {
	name: "emoji",
	description: "haha cool smol picture thingys",
	botPermissions: ["MANAGE_EMOJIS"],
	userPermissions: ["MANAGE_EMOJIS"],
	args: true,
	guildOnly: true,
	usage: "add <attach image to message> or emoji delete <image ID>",
	aliases: ["emote"],
	execute(message, args) {
		if (args[0] == "add") {
			if (message.attachments.size > 0) {
				if (args.length >= 2) {
					if (args[1].length >= 2) {
						let RegExp = /[^a-z^A-Z^0-9]/gm;
						if (!RegExp.test(args[1])) {
							message.guild.emojis.create((message.attachments).array()[0].url, args[1], { reason: `Done by ${message.author.tag}` })
								.then(emoji => message.channel.send(successEmbed(`I've made a new emoji called ${emoji.name}!`)))
								.catch(error => message.channel.send(errorEmbed(`${error.message}`)));
						} else {
							message.channel.send(errorEmbed("there are things i cant put in the name of the emote"));
						}
					} else {
						message.channel.send(errorEmbed("make the name at least 2 letters nyom"));
					}
				} else {
					message.channel.send(errorEmbed("you didnt give me enough arguments \nusage:`emoji add <emojiName>` with an image as attachment"));
				}
			} else {
				message.channel.send(errorEmbed("you didnt give me enough arguments \nusage:`emoji add <emojiName>` with an image as attachment"));
			}
		} else {
			if (args[0] == "delete" || args[0] == "remove") {
				if(!message.guild.emojis.cache.get(args[1])) return message.channel.send(embeds.errorEmbed(`\`${args[1]}\` is not an emoji ID`));
				let emoji = message.guild.emojis.cache.get(args[1]);
				emoji.delete({ reason: `done by ${message.author.tag}` });
				message.channel.send(embeds.successEmbed(`ive deleted \`${emoji.name}\``));
			} else {
				return message.channel.send(embeds.errorEmbed(`${args[0]} is not supported for this command`));
			}
		}
		
	},
};
