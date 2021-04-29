const {  logChannelID } = require('../config.json')

module.exports = (client, message) => {
  if(message.channel.type != "dm") return;
  client.channels.cache.get(logChannelID).send(`Message sent by ${message.author.tag} (${message.author.id}): ${message.content}. Time: ${message.createdAt}`)
}
