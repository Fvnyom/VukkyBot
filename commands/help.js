require("dotenv").config();
const prefix = process.env.BOT_PREFIX;
const embeds = require("../utilities/embeds");
const Discord = require("discord.js");
const vukkytils = require("../utilities/vukkytils");

module.exports = {
	name: "help",
	description: "List all of my commands or info about a specific command.",
	aliases: ["commands"],
	usage: "[command name]",
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push("here are my commands:");
			data.push(commands.map(command => command.name).join(", "));
			data.push(`\nyou can send \`${prefix}help [command name]\` to get info on a specific command`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === "dm") return;
					message.channel.send(embeds.successEmbed("sent ya a dm with what i can do"));
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.channel.send(embeds.errorEmbed("i cant dm you pleas enable your dms ty"));
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.channel.send(embeds.errorEmbed(`okay dumbass but im pretty sure **${name}** isn't a command`));
		}

		const helpEmbed = new Discord.MessageEmbed()
			.setColor("#4b83c3")
			.setTitle(`ℹ ${command.name}`)
			.setDescription(command.description)
			.setTimestamp()
			.setFooter(embeds.versionString, embeds.getAvatarURL());

		if (command.aliases) helpEmbed.addField(vukkytils.getString("HELP_ALIASES"), `${command.aliases.join(", ")}`, true);
		if (command.usage) helpEmbed.addField(vukkytils.getString("HELP_USAGE"), `${prefix}${command.name} ${command.usage}`, true);
		helpEmbed.addField(vukkytils.getString("HELP_COOLDOWN"), `${command.cooldown || 3} second(s)`, true);
		if (command.userPermissions) helpEmbed.addField(vukkytils.getString("HELP_USER_PERMISSIONS_REQUIRED"), `${command.userPermissions.join(", ")}`, true);
		if (command.botPermissions) helpEmbed.addField(vukkytils.getString("HELP_BOT_PERMISSIONS_REQUIRED"), `${command.botPermissions.join(", ")}`, true);

		message.channel.send(helpEmbed);
	},
};
