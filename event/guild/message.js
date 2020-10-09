// const {previx} = require ("../../acchan2.js")

// module.exports =  async (bot, message) => {
 
  
//   if(!message.guild)return;
//   if(!message.content.startsWith(previx))return;  //printah abal abal
//   if(message.author.bot) return;
//  if(message.channel.type === "dm" ) return; 
  
   
//   let {cooldown} = require ("./cooldown.js");
//   let commandcooldown = cooldown 
//  let msg = message.content.toLowerCase();
//   let sender = message.author;
//   let args = message.content.slice(previx.length).trim().split(/ +/g);
//   let cmd =args.shift().toLowerCase();
//   let commandFile = bot.command.get(cmd) || bot.command.get(bot.aliases.get(cmd))
//   if(commandFile) commandFile.run(bot, message, args)
//   let author = message.author; //abal abal
  
   
//     if(commandcooldown.has(message.author.id)){
    
//        return message.channel.send("jangan chat acchan dulu ya..nanti tunggu 5 detik").then (msg => msg.delete(4000));
//  }
   
//   commandcooldown.add(message.author.id);
//   setTimeout(() => {
//     cooldown.delete(message.author.id);
//  },5000)
  
//   console.log(`${message.author.username} menggunakan command ${cmd}`);
  
  
  

   
  
// }