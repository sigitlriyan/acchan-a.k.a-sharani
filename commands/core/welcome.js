const db = require("quick.db");

module.exports = {
  config: {
    name: "welcome",
    description: "untuk mengedit welcome commands",
    usage: [],
    accessableby: "admin maybe",
    aliases: ["wel"],
    category: "core"
  },

  run: async (bot, message, args) => {
    //  message.channel.send("untuk comand welcome masih dalam  perbaikan yah..")
    // }}
    let aa = message.member.hasPermission([
      "MANAGE_CHANNELS",
      "MANAGE_MESSAGES"
    ]);
    {
      if (!aa)
        return message.channel.send(
          "kamu tidak mempunyai izin Manage Channels "
        );
      const argumen = args[0];
      if (argumen.toLowerCase() === "on") {
        message.channel.send(`on`);
        db.set(`${message.guild.id}.Config.Welcome.ED`, "YA");
      } else if (argumen.toLowerCase() === "off") {
        message.channel.send(`off`);
        db.set(`${message.guild.id}.Config.Welcome.ED`, "TIDAK");
      } 
      
      else if (argumen.toLowerCase() === "channel") {
        let Channel = message.mentions.channels.first();
        if (!Channel) {
          message.channel.send(`Channel??`);
        } else {
          message.channel.send(`Channel: ${Channel}`);
          db.set(`${message.guild.id}.Config.Welcome.Channel`, Channel.id);
        }
      } 
      
      else if (
        argumen.toUpperCase() === "MESSAGE" ||
        argumen.toUpperCase() === "MSG"
      ) {
        let Message = args.slice(1).join(" ");
        if (Message.length > 34) {
          message.channel.send(`Message??`);
        } else {
          message.channel.send(`Message: ${Message}`);
          db.set(`${message.guild.id}.Config.Welcome.Message`, Message);
        }
      } else if (
        argumen.toUpperCase() === "BACKGROUND" ||
        argumen.toUpperCase() === "BG"
      ) {
        let Background = args.slice(1).join(" ");
        if (!Background) {
          message.channel.send(`Background??`);
        } else {
          message.channel.send(`Background: ${Background}`);
          db.set(`${message.guild.id}.Config.Welcome.Background`, Background);
        }
      }

      //    // coba coba color
      //     else if (argumen.toLowerCase() === "color" ) {
      //       const blue =  await jimp.loadFont(jimp.FONT_SANS_32_BLUE);
      //       const black = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
      //      const white=  await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
      //       let Color = args.slice(1).join(" ");
      //       if (!Color) {
      //         message.channel.send(`Color??`);
      //       } else {
      //         message.channel.send(`Color: ${Color}`);
      //         db.set(`${message.guild.id}.Config.Welcome.Color`, Color);
      //       };
      //     };
    }
  }
};
