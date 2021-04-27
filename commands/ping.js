const { infoEmbed } = require("../utilities/embeds");

module.exports = {
	name: "ping",
	description: "ping",
	botPermissions: ["EMBED_LINKS"],
	async execute(message, args) {
		const ping = await message.channel.send(`<@!${message.author.id}>`);
		ping.edit(infoEmbed(`<@!${message.author.id}> **${ping.createdTimestamp - message.createdTimestamp}ms**`));
	},
};
