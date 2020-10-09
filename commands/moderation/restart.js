module.exports = {
  config: {
    name:"restart",
    description: "reload command",
    usage: [], 
    accessableby: "owner",
    aliases: ["rs"],
    category:"moderation"
},

run: async (bot, message, args)=>{
  if (message.author.id !== "492692825704497173") return message.channel.send("hanya development yg bisa menggunakan ini");
  
  message.channel.send("berhasil di restart").then( ()=> process.exit(1))
  
  
}}