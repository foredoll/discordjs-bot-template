const Discord = require("discord.js");
const client = new Discord.Client({
  disableMentions: 'everyone',
});
const fs = require("fs");
const db = require('quick.db')

client.commands = new Discord.Collection();

client.config = {
  prefix: process.env.PREFIX,
  token: process.env.TOKEN
};

fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: " + eventName);
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: " + commandName);
  });
});

client.login(client.config.token);
