const ca = ["✌",  "🖐",  "✊" ]
const {Discord, MessageEmbed} = require ("discord.js")
const {promptMessage} = require ("../function.js");
module.exports = {
  config: {
    name:"suit",
    description: "ang",
    usage:[], 
    accessableby: "Members",
    aliases: [],
    category:"fun"
},

run:async (bot,message,args)=>{

  
  
  
  const layer = new MessageEmbed()
  
        .setColor ("RANDOM")
        .setFooter  (message.guild.me.displayName, bot.user.displayAvatarURL())
        .setDescription("pilih emoticon, untuk memulai permainannya" )
        .setTimestamp();
   
   const m = await message.channel.send(layer);
  
  const react = await promptMessage(m, message.author, 30 , ca);
  const bc  = ca[Math.floor(Math.random() * ca.length)];
  const aw = await getResult(react, bc)
  await m.reactions.removeAll();
  
  layer 
      .setDescription("")
      .addField(`${aw}, ${react} vs ${bc}`)
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

}}//awalan event
//    promptMassage:( async function (message, author, time) {
//     time *= 1000;
//     const ca = ["✌",  "🖐",  "✊" ]
//     for(const reaction of ca)await message.react(reaction);
//     const filter =  (reaction, user) =>  ca.includes(reaction.emoji.name)&& user.id === message.author.id;
    
//     return message
//             .awaitReaction(filter,{max:1, time: time})
//             .then(collected => collected.first()&&collected.first().emoji.name() )
//      })