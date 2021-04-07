
const embeds = require("../embeds.js");
const config = require("../config.json");

module.exports = {
	name: "say",
	description: "Make VukkyBot say things!",
	dcPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
	execute(message, args) {
		if(message.author.id != "125644326037487616") {
			if(message.author.id == config.misc.owner) {
				let say = args.slice(0).join(" ");
				message.delete();
				message.channel.send(say);
			} else {
				message.channel.send("Sorry, but you're not the owner of this VukkyBot.");
			}
		} else {
			message.channel.send(embeds.errorEmbed("go the fuck away from me ville"));
            
                
            
		}
       
	}
};