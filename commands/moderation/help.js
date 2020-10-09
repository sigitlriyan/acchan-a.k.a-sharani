const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const {previx} = require("../../config.json");

module.exports = {
  config: {
    name: "help",
    description: "help to uses any command in bot achan",
    usage: [],
    accessableby: "member",
    aliases: ["h!"],
    category: "moderation"
  },
  run: async (bot, message, args) => {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        `${message.guild.me.displayName} Help`,
        message.guild.iconURL()
      )
      .setThumbnail(bot.user.displayAvatarURL());

    if (!args[0]) {
      const categories = readdirSync("./commands/");
      embed.setDescription( `ini adalah command untuk bot ${message.guild.me.displayName}\n bot Previx: **${previx}**`
      );
      embed.setFooter(
        `UwU ${message.guild.me.displayName}| total commands : ${bot.command.size}`,
        bot.user.displayAvatarURL()
      );

      categories.forEach(category => {
        const dir = bot.command.filter(c => c.config.category === category);
        const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);

        try {
          embed.addField( ` ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\`,`).join(" "));
        } catch (e) {
          console.log(e);
        }
      });
      return message.channel.send(embed);
    } else {
      let command = bot.command.get( bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase()
      );
      if (!command)
        return message.channel.send(
          embed
            .setTitle("ada yang salah dengan commandnya, coba lagi")
            .setDescription(`coba lakukan \`${previx}help\` untuk melihat semua commands`)
    );
      command = command.config;

      embed.setDescription(stripIndents`hallo previx ${
        bot.user.username
      }: \`${previx}\`\n
        **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
        **Description:** ${command.description || "tidak ada descripsi"}
        **Usage:** ${command.usage ? `\`${previx}${command.name}${command.usage}\`` : "No Usage " }
        **Accessable by:** ${command.accessableby || "member"}
        **Aliases:** ${ command.aliases ? command.aliases.join(" ") : "404:not found" }`);
      return message.channel.send(embed);
    }
  }
};
