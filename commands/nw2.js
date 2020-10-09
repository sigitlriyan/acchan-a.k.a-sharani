const Discord=require ("discord.js")
const client = require("nekos.life") //gkwajib
const nekos = new client //gkwajib
const {get}= require ("superagent")


exports.run =async function (bot,message,args ){
  
  let {body} = await  get (`https://nekos.life/api/v2/img/classic`)
  
  const ara = new Discord.RichEmbed()
   .setColor("RANDOM")
   .setAuthor(`acchan nemu neko lucu untuk: ${message.author.tag}`)
   .setThumbnail(body.url)
   .setImage(body.url)
   .setTimestamp()
   .setFooter(message.author.tag, message.author.displayAvatarURL)
  
  message.channel.send(ara)
  
  
}
exports.help={
  name: "nw2"
}