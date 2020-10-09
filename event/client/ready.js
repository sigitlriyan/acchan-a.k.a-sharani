const Discord = require ("discord.js")

module.exports = bot => {
  
  bot.user.setActivity("playing dolphin simulator",{type: "PLAYING"})
  console.log (`${bot.user.tag} connect`)
}