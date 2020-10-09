// const serverQueue = require ("./play.js")

module.exports = {
  config: {
    name:"volume",
    description: "naik turun kan  volume sesuka kalian ;)",
    usage: [] + " " + "<masukan no volume>", 
    accessableby: "Members",
    aliases: ["v","vol"],
    category:"mussic"
},

run: async (bot, message, args) =>{ 
  
  const serverQueue = bot.queue.get(message.guild.id) // wait minta link server ok, udah gan
  //let serverQueue = queue.find((g)=> g.guild.id = message.guild.id);
   const apa = message.member.voice.channel;
   // const volume = args[1];
  
  if(!apa) return message.channel.send("anda harus masuk ke voice channel dulu!");
  if(!serverQueue) return message.channel.send("tidak ada lagu di antrian! ");
  if(!args[0]) return message.channel.send(`volume saat ini : **\`${serverQueue.volume}\`**% `);
  serverQueue.volume = args[0];
  if(isNaN(args[0])) return message.channel.send("tolong masukan nomor untuk tingkat volume").then(m=>m.delete({timeout: 4000}),false);
  if(args[0] < 5 ||args[0] > 100  ) return message.channel.send("pilih volume 5 - 100");
  serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100) 
  return message.channel.send(`volume di set ke: **\`${args[0]}\`%**`);
   
		
 
}}

