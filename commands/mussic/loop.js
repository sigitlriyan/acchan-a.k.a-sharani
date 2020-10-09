module.exports = {
  config: {
    name:"loop",
    description: "mengulang lagu ",
    usage: [] + " " + "<on/off>", 
    accessableby: "Members",
    aliases: [],
    category:"mussic"
},

run: async (bot, message, args) =>{ 

const serverQueue = bot.queue.get(message.guild.id);
const apa = message.member.voice.channel;

  
  if(!apa)return message.channel.send("kamu harus masuk ke voice channel terlebih dahulu!");
  // if(serverQueue.voice.channel.id !== message.member.voice.channel.id) 
  //   return message.channel.send(`kamu harus didalam **${serverQueue.voiceChannel.name}** untuk memulai loop musik`);
  
  if(!serverQueue) return message.channel.send("tidak ada lagu untuk di loop!");
  
  serverQueue.loop = !serverQueue.loop
  return serverQueue.textChannel
  .send(` loop music ${serverQueue.loop ? "on " : "off"}`)
  .catch(console.error);
  // if (serverQueue.loop) return message ('loop lagu on');
  // return message.channel.send("loop lagu off");


}}