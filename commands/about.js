// Copyright (C) 2020-2021 Vukky

const embeds = require("../utilities/embeds");
const packagejson = require("../package.json");
var os = require("os");

module.exports = {
	name: "about",
	description: "learn about this puddle of piss",
	botPermissions: ["EMBED_LINKS"],
	aliases: ["info"],
	execute(message, args) {
		message.channel.send(embeds.aboutEmbed(`${packagejson.version} (${packagejson.date})`, packagejson.dependencies["discord.js"].substring(1), `${os.type().replace(/_/g, " ")} ${os.release}`));
	},
};
