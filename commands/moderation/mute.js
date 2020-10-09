const {Dsicord,MessageEmbed} =require ("discord.js")
const ms =require ("ms")

module.exports = {
  config: {
    name:"mute",
    description: "mute command",
    usage: [],
    accessableby: "owner",
    aliases: ["mt"],
    category:"moderation"
},
run: async (bot, message, args) =>{
  
  
  let tomute = message.guild.member(message.mentions.users.first()||message.guild.members.cache.get(args[0])) 
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`kamu tidak bisa memute ${tomute}`)
  if(!tomute) return message.reply("tidak bisa menemukan member");
 //if(!tomute.hasPermissions("MANAGE_MASSAGE")) return message.channel.send("kamu tidak bisa me-mute dia");
  const Mrole= message.guild.roles.cache.find(r => r.name === "mute");
  if (!Mrole){
     try{
    Mrole = await message.guild.roles.create({
      data:{
      name: "mute",
      color: "#000000",
      },reason: "for mutee",
      
      
      }).catch(e => console.log(e)),
      message.guild.channel.forEach(async(channel, id)=>{
      await channel.overwritePermissions(Mrole,{
        SEND_MESSAGES: false,
        ADD_REACTION: false
      })
    })
    
  }
  catch(e){
    console.log(e)
    }
  }
   //const setTime = message.channel.delete.get(tomute)
  let time = args[1];
  if(!time) return message.channel.send("masukkan batas waktu mute-nya");

  
  let reason = args.slice(2).join(" ")
  if (!reason) return message.channel.send("tolong memasukan alasan")
  
let on = new MessageEmbed()
 .setColor("#ff0000")
 .addField(`**sudah di mute dengan waktu** \n`, `**\`${ms(ms(time))}\`** \n **dengan alasan :** \n **\`${reason}\`**`)
 .setTimestamp() ;
  
let off = new MessageEmbed()
 .setColor("#00ff00")
 .addField(`ciee dah bisa ngomong...bilang apa ke ${message.guild.me.displayName} ?` ) 
 .setFooter(`selamat sudah di unmute`, bot.user.displayAvatarURL())

    tomute.roles.add(Mrole.id).then( () => {
   message.delete()
  message.reply(tomute, on);
    })
    
  setTimeout(function() { 
    tomute.roles.remove(Mrole.id)
    message.channel.send(tomute, off);
  },ms(time));
}

  }