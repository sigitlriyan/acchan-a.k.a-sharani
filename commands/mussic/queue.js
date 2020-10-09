const {MessageEmbed} = require ("discord.js");
module.exports = {
  config: {
    name:"queue",
    description: "lihat antrian lagu ",
    usage: [], 
    accessableby: "Members",
    aliases: [],
    category:"mussic"
},

run: async (bot, message, args) =>{ 

  const serverQueue = bot.queue.get(message.guild.id);
  //const title = serverQueue.songs.filter(balon => balon.title );
  if(!serverQueue)return message.channel.send("tidak ada antrian lagu saat ini ");
  // return 
  let index =0
  let ess = new MessageEmbed()
  .setColor("RANDOM")
  .setTitle(" **daftar antrian lagu saat ini**")
  .setDescription(serverQueue.songs.map(song => `${++index}**|** [${song.title}](${song.url})`).join("\n"))
  .setFooter(`yang sekarang di putar: ${serverQueue.songs[0].title}`)
  message.channel.send(ess);

}}

  