const {MessageEmbed}=require ("discord.js")
const client = require("nekos.life") //gkwajib
const nekos = new client //gkwajib
const {get}= require ("superagent")


module.exports = {
  config: {
    name:"hug",
    description: "pelukkan maut",
    usage: [], 
    accessableby: "Members",
    aliases: ["hgg"],
    category:"img"  
},
run:async function (bot,message,args ){
  
  let {body} = await  get (`https://nekos.life/api/hug`)
  
  const ara = new MessageEmbed()
   .setColor("RANDOM")
   .setAuthor(`kesepian ya .. sini acchan peluk ${message.author.tag}`)
   .setThumbnail(message.guild.iconURL)
   .setImage(body.url)
   .setTimestamp()
   .setFooter(message.author.tag, message.author.displayAvatarURL)
  
  message.channel.send(ara)
  
  
 }
}
