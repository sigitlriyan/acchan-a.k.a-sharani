module.exports = {
  config: {
    name:"resume",
    description: "melanjutkan lagu yang sudah di pause",
    usage: [] , 
    accessableby: "Members",
    aliases: ["rsm"],
    category:"mussic"
},

run: async (bot, message, args) =>{

const serverQueue =bot.queue.get(message.guild.id);
  
  if(serverQueue && serverQueue.playing);
  serverQueue.playing= true;
  serverQueue.connection.dispatcher.resume();
  return message.channel.send("berhasil melanjutkan lagu");

}}