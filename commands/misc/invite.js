module.exports = {
  name:'invite',
  description: "Gets an invite for the bot.",
  cooldown: 5,
  execute(message, client, Discord) {
    const invite = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setDescription(`[Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) is the link to invite me! Thanks!`)
    return message.channel.send(invite)
  }
}
