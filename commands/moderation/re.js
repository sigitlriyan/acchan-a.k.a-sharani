const Discord = require ("discord.js");
const {readdirSync} = require ("fs")
module.exports = {
  config: {
    name:"re",
    description: "reload command",
    usage: [], 
    accessableby: "owner",
    aliases: ["r"],
    category:"moderation"
},

run: async (bot, message, args)=>{
  let categories = readdirSync ("./commands")
  
  if(message.author.id != "492692825704497173") return message.channel.send("you are not my daddy").then(m => m.delete(3000));
  
   if(!args[0])return message.channel.send("tolong masukan command yang ingin di reload ");
 
  // let namacmd=  args[0].toLowerCase()
  let namacmd = bot.command.get( bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase()
      );

  
  
  
  
   categories.forEach( () => {
        const dir = bot.command.filter(c => c.config.category.name);
     console.log (dir)
  
   })
  
  
  // try{
    // delete require.cache[require.resolve(`./${namacmd}.js`)]
 
//  bot.commands.delete(namacmd)
//     const pull = require (`./${namacmd}.js`)
//   bot.commands.set(namacmd, pull)
// }catch{
// return message.channel.send(`tidak bisa menemukan command: .\`${args[0].toLowerCase()}\``)
// }  
//       message.channel.send(`sucess reload command: \`${args[0].toLowerCase()}\``);

                      
}

}