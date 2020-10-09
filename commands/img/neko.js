const {MessageEmbed}=require ("discord.js")
const client = require("nekos.life") //gkwajib
const nekos = new client //gkwajib
const {get}= require ("superagent")


module.exports={
  config: {
    name:"neko",
    description: "kucing",
    usage:[], 
    accessableby: "Members",
    aliases: ["nek"],
    category:"img"
},
run: async function (bot,message,args ){
  
  let {body} = await  get (`https://nekos.life/api/neko`)
  
  var men = message.member.toString();
  
  let ara = new MessageEmbed()
   // .setColor("RANDOM")
   .setDescription(`acchan nemu neko lucu untuk: ${men}`)
   .setThumbnail(message.guild.iconURL)
   .setImage(body.neko)
   .setTimestamp()
   .setFooter(message.author.tag, message.author.displayAvatarURL)
  
  message.channel.send(ara)
  
  
}
}