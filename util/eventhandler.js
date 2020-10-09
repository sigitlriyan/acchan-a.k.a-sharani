const reqEvent = (event) => require (`./event/${event}`)

module.exports =bot=>{
  bot.on("ready", function() {reqEvent("ready")(bot)});

}