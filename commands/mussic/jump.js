module.exports = {
  config: {
    name:"jump",
    description: "keep chill with your mussic",
    usage: [] + "(masukan nomor yang ingin di stel)", 
    accessableby: "Members",
    aliases: [],
    category:"mussic"
},

run: async (bot, message, args) =>{ 
const serverQueue = bot.queue.get(message.guild.id);
const apa = message.member.voice.channel;
  
if(!apa) return message.channel.send("kamu harus masuk ke voice channel dahulu");
if(!serverQueue) return message.channel.send("tidak ada antrian lagu saat ini");
if(!args[0]) return message.channel.send("tolong masukkan nomor di antrian lagu");
  
serverQueue.songs.splice(0, Math.floor(parseInt(args[0])-1))
serverQueue.connection.dispatcher.end()
  
  
}}