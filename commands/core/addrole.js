const {MessageCollector} = require ("discord.js");

let msgCollectorfilter = (newmsg,Originalmsg) =>{
  let {cache} = Originalmsg.guild.emojis;
  if(newmsg.author.id !== Originalmsg.author.id) return false;
  let [emojiName, roleName] = Originalmsg.content.split(/,\s+/);
  if(!emojiName && !roleName) return false;
  
  let emoji = cache.find(emoji => emoji.name.toLowerCase() === emojiName.toLowerCase());
  if(!emoji){
    Originalmsg.channel.send("emoji tidak dapat ditemukan tolong coba lagi!")
     .then(m=>m.delete({timeout: 5000}))
     .catch(e=>console.log(e))
    return false;
  }
  let role = Originalmsg.guild.roles.cache.find(role=>role.name.toLowerCase() === roleName.toLowerCase());
  if(!role){
    Originalmsg.channel.send("kesalahan dalam penulisan nama role coba lagi")
    .then(rd => rd.delete({timeout: 5000}))
    .catch(e=>console.log(e))
    return false;
  }
  return true;
  
}

module.exports = {
  config: {
    name:"addrole",
    description: "role reaction",
    usage: [] + "masukan id message", 
    accessableby: "admin server",
    aliases: ["arl"],
    category:"core"
},

run:async (bot,message,args)=>{ 

  if(args.slice(/\s+/).length !== 1){
    
    let msg = await message.channel.send("terlalu banyak kalimat tolong coba lagi");
    await msg.delete({timeout: 5000});
  }
    else {
      try{ let fecthedmessage = await message.channel.messages.fetch(args.join(" "));
          if(fecthedmessage){
            await message.channel.send("tolong masukan emoji dan nama role nya ")
            let collec = new MessageCollector(message.channel, msgCollectorfilter.bind(null, message))
            collec.on ("collect", msg =>{
               let {cache} = msg.guild.emojis;
                let [emojiName, roleName] = msg.content.split(/,\s+/);
                let emoji = cache.find(emoji => emoji.name.toLowerCase() === emojiName.toLowerCase());
                let role = msg.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
               if(emoji && role) {
                 fecthedmessage.react(emoji)
                  .then(emoji => console.log("reacted..."))
                  .catch(e => console.log(e))
               }
            });
          }
      
      }catch(e){
      console.log(e)
        message.channel.send("message tidak dapat di temukan").then(m => m.delete({timeout: 5000}))
   
    
    }
  }


}}