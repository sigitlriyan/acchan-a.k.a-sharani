const Discord =require ("discord.js");

module.exports.run= async (bot, message, args) =>{
  
  let acchan = bot.user.displayAvatarURL;
    let server =message.guild.iconURL;
    
    
    
    let embed = new Discord.RichEmbed()
    .setThumbnail(server)
    .setAuthor("acchan", acchan)
    .addField(`🔊:headphones: play music:headphones: 🔊` , `\`play insert link\`,  \`leave\`, \`pause\`, \`resume\``  )
    .addField(`profile acchan`, `[\`sentuh acchan\`](https://www.youtube.com/user/TaraArtsDrawing)`)
    .setColor("RANDOM")
    .setFooter(`message. For ${message.author.tag}`, message.author.displayAvatarURL)
    .setTimestamp();
   
    message.channel.send(embed)
    
  
}

module.exports.help={
  name: "help"
}