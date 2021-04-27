const { Permissions } = require("discord.js");
const Base = require("./base.js");
const path = require("path");

class Command extends Base {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);

    this.description = options.description || "No Description Provided.";
    this.ownerOnly = options.ownerOnly || false;
    this.aliases = options.aliases || [];
    this.cooldown = options.cooldown || 0;
    this.nsfw = options.nsfw || false;
    this.category = options.category || this.client.utils.toProperCase(file.path.split(path.sep)[0]) || "Misc";
    this.guildOnly = options.guildOnly || false;
    this.hidden = options.hidden || false;
    this.usage = options.usage || this.name;
    this.loading = options.loading;

    this.botPermissions = new Permissions(options.botPermissions || []).freeze();
    this.userPermissions = new Permissions(options.userPermissions || []).freeze();

    this.responses = this.client.responses;
  }

  async _run(msg, args) {
    try {
      if (this.loading && msg.guild) {
        await msg.send(this.loading
          .replace(/{{displayName}}/g, msg.member.displayName)
          .replace(/{{username}}/g, msg.author.username)
          .replace(/{{tag}}/g, msg.author.tag)
          .replace(/{{mention}}/g, msg.member.toString())
          .replace(/{{guild}}/g, msg.guild.name)
          .replace(/{{typing}}/g, this.client.constants.typing))
          .catch(() => null);
      }

      const check = await this.check(msg, args);

      if (!check) return;

      if (typeof check === "string") return msg.send(check);

      const results = await this.run(msg, args);
 
      if (typeof results === "string") return msg.send(results);
    } catch(err) {
      this.client.emit("commandError", msg, err);
    }
  }

  async check() {
    return true;
  }
	
  async run(msg) {
    return msg.send(`${this.constructor.name} does not provide a \`run()\` implementation.${msg.author.id !== this.client.constants.ownerID ? " This is a bug!" : ""}`);
  }
}

module.exports = Command;
