const Genius = new (require("genius-lyrics")).Client("_xN8Ym2Hh749dhWqCR1leYDNdGsg0FfaS8EtculG125Zul4Ct6dUnbW5vYTQ7dEN");
const {MessageEmbed} = require("discord.js");
module.exports = {
  config: {
    name:"lirik",
    description: "looking for song lyrics",
    usage: []+"judul lagu", 
    accessableby: "Members",
    aliases: [],
    category:"mussic"
},

run: async (bot, message, args) =>{
  
 const serverQueue = bot.queue.get(message.guild.id);
 const apa = message.member.voice.channel;
  if(!apa) return;
  // console.log (args.join(" ").include  == `${serverQueue.songs[0].title}`)
  // if(args.join(" ") !== serverQueue.songs[0].title) return message.channel.send("gk sama cog")
  
let mew = new MessageEmbed()  
.setColor("RANDOM")
.setDescription("looking for wait....")

let aha = await message.channel.send(mew);
async function lyrics() {
     try {
          const songs = await Genius.tracks.search(args.join(" "));
          const lyrics = await songs[0].lyrics();
        
  let page = [ lyrics.slice(0, 497), lyrics.slice(497, lyrics.length)];
  let pages = 1;
          
          mew.setDescription(page[pages-1])
          mew.setThumbnail(serverQueue.songs[0].thumbnail)      
       aha.edit(mew).then( msg => {
        msg.react("◀️").then(r => {
        msg.react("▶️")
     
          const mundur = (reaction, user) => reaction.emoji.name === "◀️" && user.id === message.author.id;
          const maju = (reaction, user) => reaction.emoji.name === "▶️" && user.id === message.author.id;
        
          
          const mundurcol = msg.createReactionCollector(mundur, {timeout: 60000});
          const majucol   = msg.createReactionCollector(maju, {timeout: 60000});
          
          
          mundurcol.on('collect', r =>{
            if (pages === 1) return;
            pages--;
            mew.setDescription(page[pages-1])
            mew.setFooter(`halaman ${pages}/${page.length}` )
               mew.setThumbnail(serverQueue.songs[0].thumbnail) 
            msg.edit(mew)
          })
          majucol.on('collect' , r =>{
            if(pages === page.length)return;
            pages++;
            mew.setDescription(page[pages -1])
            mew.setFooter(`halaman ${pages}/${page.length}` )
            mew.setThumbnail(serverQueue.songs[0].thumbnail) 
            msg.edit(mew)

            
          })
        })  
     })
      
      
     } catch(e) {
      console.log(e)
       message.channel.send(e)
     }
}

lyrics();

  
  
  
}}