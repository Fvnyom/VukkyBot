// Copyright (C) 2020-2021 Vukky

const embeds = require("../utilities/embeds");
const packagejson = require("../package.json");
const config = require("../config.json");
var os = require("os");

module.exports = {
	name: "about",
	description: "learn about this puddle of piss",
	botPermissions: ["EMBED_LINKS"],
	aliases: ["info"],
	execute(message, args) {
		let owners = config.misc.owner;
		for (let i = 0; i < owners.length; i++) {
			owners[i] = `<@${owners[i]}>`;
		}
		message.channel.send(embeds.aboutEmbed(`${packagejson.version} (${packagejson.date})`, packagejson.dependencies["discord.js"].substring(1), `${os.type().replace(/_/g, " ")} ${os.release}`, owners));
	},
};
