const Discord = require ("discord.js")
// const queue = new Map();
// const songs = require ("./play.js");
module.exports = {
  config: {
    name:"leave",
    description: "keep chill with your mussic",
    usage: [], 
    accessableby: "Members",
    aliases: ["out","keluar"],
    category:"mussic"
},

run: async (bot, message, args) =>{
    	
	const serverQueue = bot.queue.get(message.guild.id);
  

   const apa = message.member.voice.channel;
//   return message.reply("**acchan pergi dulu ya!**");
   
    
  if (!apa) return message.channel.send('kamu sedang tidak di voice channel!');
	if (!serverQueue) return message.channel.send('gak ada musik yang bisa di stop .');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
    message.reply(`**${message.guild.me.displayName}pergi dulu ya!**`);
		return undefined;
  
}

  
}