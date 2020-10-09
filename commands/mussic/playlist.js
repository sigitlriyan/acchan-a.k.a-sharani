module.exports = {
  config: {
    name:"playlist",
    description: "looking for song lyrics",
    usage: []+"judul lagu", 
    accessableby: "Members",
    aliases: ["pl"],
    category:"mussic"
},

run: async (bot, message, args) =>{
  const apa = message.member.voice.channel;
  const serverQueue = bot.queue.get(message.guild.id);
  const argument = args[0];
  const playlist = [];
  
  if(argument.toLowerCase() === "set"){
    // console.log("halo");
    playlist.push(serverQueue.songs[0].title,serverQueue.songs[0].url)
    return message.channel.send(playlist);
    }
  else if (argument.toLowerCase() === "info"){
    message.channel.send(playlist);
  }
  
}}