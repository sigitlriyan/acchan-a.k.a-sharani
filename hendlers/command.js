
const {readdirSync}=require ("fs");

 module.exports = bot => {
  const load = dirs=>{
  const commands = readdirSync (`./commands/${dirs}`).filter(d => d.endsWith('.js'))
    for (let file of commands)  {
      let pull = require (`../commands/${dirs}/${file}`) 
      bot.command.set(pull.config.name, pull)
     if(pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name))                   
     }
  }
  ["img","mussic","moderation","core","fun"].forEach(x=>load(x))
 }