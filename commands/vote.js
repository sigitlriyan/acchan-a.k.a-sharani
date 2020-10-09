//const Discord =require ("discord.js")



exports.run = async (bot,cmd, message, args) =>{
  
  let as = await message.channel.send("test");
     await message.react("❤")
     await message.react ("🤣")
  
  const ass = await message.awaitReaction(reaction => reaction.emoji.name === "❤" && reaction.emoji.name==="🤣",{max:1, time:2000})
message.channel.send(`pilihan \n\n${"❤"}: ${ass.get("❤").const-1}\n${"🤣"}: ${ass.get("🤣").const-1}`)  

},exports.help={
  name: "vote"
}
