const {MessageEmbed}=require ("discord.js")
const client = require("nekos.life") //gkwajib
const nekos = new client //gkwajib
const {get}= require ("superagent")

module.exports = {
  config: {
    name:"nw2",
    description: "gif pendosa atau gambar pendosa",
    usage: "A.nw2", 
    accessableby: "admin maybe",
    aliases: ["nw2"],
    category:"core"
},

run:async (bot,message,args)=>{
  if(!message.channel.nsfw)return message.channel.send("dilarang menggunakan command diluar channel nsfw!!");
  let {body} = await  get (`https://nekos.life/api/v2/img/classic`)
  
  const ara = new MessageEmbed()
   .setColor("RANDOM")
   .setAuthor(`acchan nemu neko lucu untuk: ${message.author.tag}`)
   .setThumbnail(body.url)
   .setImage(body.url)
   .setTimestamp()
   .setFooter(message.author.tag, message.author.displayAvatarURL)
  
  message.channel.send(ara)
  
  
}

}