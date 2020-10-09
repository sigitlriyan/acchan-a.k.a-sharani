const {MessageEmbed} = require ("discord.js");
module.exports = {
  config: {
    name:"nowplaying",
    description: "melihat durasi lagu yang sedang di mainkan",
    usage: [] , 
    accessableby: "Members",
    aliases: ["np"],
    category:"mussic"
},

run: async (bot, message, args) =>{ 
const serverQueue = bot.queue.get(message.guild.id);
  const dh = serverQueue.songs[0].durationH;
  const dm = serverQueue.songs[0].durationM;
  const ds = serverQueue.songs[0].durationS;
 
  let uwu = new MessageEmbed()
  .setColor("#006bff")
  .setDescription(`**lagu saat ini** \n [${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`)
  .addField(` **durasi vidio** \n **\`${dh}:${dm}:${ds}\`** `)
  .setImage(serverQueue.songs[0].thumbnail)
  .setFooter(`**keep at chill with your selection music**`)
return message.channel.send(uwu);

}}