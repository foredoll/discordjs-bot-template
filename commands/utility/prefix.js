const db = require('quick.db')

module.exports = {
  name: "prefix",
  aliases:['setprefix','set-prefix'],
  description:"Sets the prefix for a server.",
  cooldown: 5,
  usage: '[prefix]',
  args: true,
  permissions: ['MANAGE_GUILD'],
  execute (message, args) {
      let setprefix = args[0]
      if(setprefix.length > 5) return message.channel.send("The prefix you indicated is too long. Please try again with a shorter one.")
      if(!setprefix) {
        db.set(`prefix_${message.guild.id}`, ".")
        return message.channel.send("Prefix for this server has been reset.")
      }
      let prefix = db.fetch(`prefix_${message.guild.id}`)
      db.set(`prefix_${message.guild.id}`, args[0])
   }
}
