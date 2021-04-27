// Copyright (C) 2020-2021 Vukky

const embeds = require("../utilities/embeds");

module.exports = {
	name: "talk",
	description: "talk to a puddle of piss",
	cooldown: 1,
	execute(message, args) {
		var responses = ["*i wait on the floor, menacingly.*", "slurp", "drink me.", "Fvn is too lazy to make more than **4** responces"];
		message.channel.send(responses[Math.floor(Math.random() * responses.length)]);
	},
};
