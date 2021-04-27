const canvacord = require("canvacord");
const Discord = require('discord.js')

module.exports = {
	name: 'triggered',
	description: 'Get triggered XD',
	async execute(message, args) {
		let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await canvacord.Canvas.trigger(avatar);
    let attachment = new Discord.MessageAttachment(image, "triggered.gif");
    return message.channel.send(attachment);
	},
};
