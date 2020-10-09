module.exports = {
  config: {
    name:"skip",
    description: "skip lagu saat ini ;)",
    usage: [] , 
    accessableby: "Members",
    aliases: [],
    category:"mussic"
},

run: async (bot, message, args) =>{ 
const serverQueue = bot.queue.get(message.guild.id);
const apa = message.member.voice.channel;
  
  if(!apa) return message.channel.send("kamu sedang tidak di voice channel");
  if(!serverQueue)return message.channel.send("tidak ada lagu untuk di skip");
  serverQueue.connection.dispatcher.end("Skip command has been used!");
 message.channel.send("lagu di skip ke selanjutnya");
  return undefined;

}}