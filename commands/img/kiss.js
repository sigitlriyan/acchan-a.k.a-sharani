const {MessageEmbed}=require ("discord.js")
const client = require("nekos.life") //gkwajib
const nekos = new client //gkwajib
const {get}= require ("superagent")

module.exports = {
  config: {
    name:"kiss",
    description: "ciuman maut",
    usage: [], 
    accessableby: "Members",
    aliases: ["ks"],
    category:"img"
},

run: async function (bot,message,args ){
  
  let {body} = await  get (`https://nekos.life/api/kiss`)
  
  const ara = new MessageEmbed()
   .setColor("RANDOM")
   .setAuthor(`ahhh..acchan belum cukup umur untuk itu...${message.author.tag}`)
   .setThumbnail(message.guild.iconURL)
   .setImage(body.url)
   .setTimestamp()
   .setFooter(message.author.tag, message.author.displayAvatarURL)
  
  message.channel.send(ara)
  
  
 }
}