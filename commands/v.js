const Discord = require ("discord.js");

exports.run = async (bot, message, args ) =>{

  
 var player = bot.music.players.get(message.guild.id);
  
  if(!player) return message.channel.send("tidak ada lagu yang sedang di mulai di guild");
  if(!args[0]) return message.channel.send("tolong masukan tingkat volumenya");
  if(Number(args[0]) <= 0 || Number(args[0]) > 100) return message.channel.send("kamu hannya bisa memasukan tingkat volume nya sampai 100%")
  
  player.setVolume(Number(args[0]));
  return message.channel.send(`volume di set di tingkat ${args[0]}.`)
}
exports.help={
  name: "v"
}