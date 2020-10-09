const {Discord, MessageEmbed} = require ("discord.js")
const promptMassage= require ("../folderAC/function.js");


  const ca = ["✌",  "🖐",  "✊" ]

   


module.exports.run = async(bot, message, args,author) => {
  
  
  
  const layer = new MessageEmbed()
  
        .setColor ("RANDOM")
        .setFooter  (message.guild.me.displayName, bot.user.displayAvatarURL)
        .setDescription("pilih emoticon, untuk memulai permainannya" )
        .setTimestamp();
   
   const m = await message.channel.send(layer);
  
  const react = await promptMassage(m, message.author, 30 , ca);
  const bc  = ca[Math.floor(Math.Random()* ca.length)];
  const aw = await getResult(react, bc)
  await m.reactions.removeAll();
  
  layer 
      .setDescription("")
      .addField(`aw, ${react} vs ${bc}`)
     .setTimestamp();
    
    m.edit(layer);
  
  
  function getResult(me, botChosen){
    if((me === "✊:" && botChosen === "✌")||
      (me === "✌" && botChosen === ":🖐")||
      (me ==="🖐" && botChosen === "✊")) {
      return "kamu menang "
    }else if (me === botChosen){
      return "kita seri"
    }else {
      return "kamu kalah ufufufu :face_with_hand_over_mouth: "
    }
    
  
  }
  
  
  
  
  
} 
module.exports.help={
  name:"suit"
}