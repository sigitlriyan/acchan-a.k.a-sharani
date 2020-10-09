
const {MessageEmbed} = require("discord.js");
module.exports = {
  config: {
    name:"avatar",
    description: "ang",
    usage:[], 
    accessableby: "Members",
    aliases: ["ava"],
    category:"img"
},

run:async (bot,message,args)=>{
  let target= message.mentions.users.first()||message.author;
return getUserAvatar(target)
  function getUserAvatar (user){
    let em = new MessageEmbed()
  .setDescription(`[link img](${user.displayAvatarURL({format:"png", dynamic: true, size: 1024})})`)
  .setFooter(message.author.username)
  .setImage(user.displayAvatarURL({format:"png", dynamic: true, size: 1024}))
  .setColor("RANDOM")
    return message.channel.send(em);
}
}
  
}

  // {files: [
  //   {
  //     attachment: target.displayAvatarURL()|| target.guild.iconURL(),
  //     name:"avatar.png"
  //   }
  // ]})