 module.exports = {
  config: {
    name:"remove",
    description: "menghapus lagu di antrian  ",
    usage: [] + " " + "<no yang ingin di hapus>", 
    accessableby: "Members",
    aliases: [],
    category:"mussic"
},

run: async (bot, message, args) =>{  
const serverQueue = bot.queue.get(message.guild.id);
const apa = message.member.voice.channel;

  if (!apa) return message.channel.send("kamu tidak dilam voice channel!!");
  if(!serverQueue) return message.channel.send("tidak ada antrina saat ini ");
  if(!args[0]) return message.channel.send("tolong masukan urutan lagu yang akan di hapus");
 try{ 
   serverQueue.songs.splice(args[0]-1,1);
  return message.channel.send('sukses menghapus lagu di antrian');
  }catch (e)
{
  console.log(e)
}
}}