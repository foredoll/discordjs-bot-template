module.exports = {
  name: "emit",
  args: true,
  execute(client, message, args) {
  if(args[0] === "join") {
    message.reply("Okay, will pretend that you are joining the server!")
    client.emit('guildMemberAdd', message.member) 
    return;
  } 
  }
}
