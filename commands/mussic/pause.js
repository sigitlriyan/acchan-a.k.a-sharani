module.exports = {
  config: {
    name:"pause",
    description: "pause lagu yang sedang di mainkan",
    usage: [] , 
    accessableby: "Members",
    aliases: ["ps"],
    category:"mussic"
},

run: async (bot, message, args) =>{

  const serverQueue = bot.queue.get(message.guild.id)
  if(serverQueue && serverQueue.playing)
    serverQueue.playing = false;
  serverQueue.connection.dispatcher.pause();
  return message.channel.send("pause music sucess")


}}