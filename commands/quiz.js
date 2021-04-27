// Copyright (C) 2020-2021 Vukky

const embeds = require("../utilities/embeds");
const vukkytils = require("../utilities/vukkytils");

module.exports = {
	name: "quiz",
	description: "aer you the big dumb or the big smart",
	botPermissions: ["EMBED_LINKS", "ADD_REACTIONS"],
	aliases: ["trivia"],
	execute(message, args) {
		console.log("lets play a quiz");
		const quiz = vukkytils.getStrings(`../strings/quiz/${vukkytils.language}`);
		const config = require("../config.json");
		const item = quiz[Math.floor(Math.random() * quiz.length)];
		const filter = response => {
			return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
		};

		// customization
		const quizTimeSeconds = config.commands.quiz.timeSeconds;
        
		message.channel.send(embeds.quizStartEmbed(item.question, quizTimeSeconds, item.hint, item.author, item.categories)).then(() => {
			message.channel.awaitMessages(filter, { max: 1, time: quizTimeSeconds * 1000, errors: ["time"] })
				.then(collected => {
					message.channel.send(embeds.quizWinnerEmbed(collected.first()));
					wannaPlayAgain(message, args);
				})
				.catch(collected => {
					message.channel.send(embeds.quizLoseEmbed(`hah big dumb \nthe answers were ||${item.answers.join(", ")}||.`));
					wannaPlayAgain(message, args);
				});
		});

		function wannaPlayAgain(message, args) {
			message.channel.send(embeds.inputEmbed("wanna play again?")).then((confirmMessage) => {
				confirmMessage.react("👍").then(() => confirmMessage.react("👎"));
				const filter = (reaction, user) => {
					return ["👍", "👎"].includes(reaction.emoji.name) && user.bot === false;
				};
				confirmMessage.awaitReactions(filter, { max: 1, time: 15000, errors: ["time"] })
					.then(collected => {
						const reaction = collected.first();
						if (reaction.emoji.name === "👍") {
							message.client.commands.get("quiz").execute(message, args);
						} else {
							confirmMessage.channel.send(embeds.infoEmbed("hah cringe"));
						}
					})
					.catch(collected => {
						confirmMessage.channel.send("ill take that as a no");
					});
			});
		}
	},
};