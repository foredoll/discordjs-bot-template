const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const chalk = require("chalk");
const moment = require("moment");
const config = require("./config.json");

client.login(process.env.TOKEN);

client.on('ready', () => {
  client.user.setGame("in my swamp");
  client.user.setStatus('online');										    
});

const log = message => {
console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
}; 

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err); 
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`); 
    log(`Loading Command: ${props.help.name}..`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => { 
  return new Promise((resolve, reject) => {
    try { 
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  let permlvl = 0;
  if (message.author.id === config.botOwner) permlvl = 4;
  return permlvl;
};

process.on("unhandledRejection", err => {
console.log(err.stack);
});
