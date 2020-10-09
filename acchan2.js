const Discord = require ("discord.js") ;
const {Client, Collection,MessageEmbed }= require ("discord.js");
const bot = new Client();

const ytdl = require ("ytdl-core");
const opus = require ("@discordjs/opus");
const YouTube = require('simple-youtube-api');
const fs = require ("fs");
const ms = require ("ms");//asal asalan
const superagent =require("superagent");
const {Canvas} = require ('canvas-constructor');
const{resolve, join} = require("path");
const {BOT_TOKEN, previx,YT_API} = require ("./config.json")
const {get}= require("snekfetch");
const fetch = require ("node-fetch");
const db = require ("quick.db");
// require ("./server.js");

  //coba command handler
["command", "aliases"].forEach(x => bot[x] = new Collection() );
["console","command","even"].forEach(x =>  require (`./hendlers/${x}`) (bot) );


//variable kedua
bot.queue = new Map();
const youtube = new YouTube(YT_API);


// const previx = "A.";

bot.on("message",   async message => {


    
  let args = message.content.slice(previx.length).trim().split(/ +/g);
  let cmd =args.shift().toLowerCase();
 

    let commandFile = bot.command.get(cmd) || bot.command.get(bot.aliases.get(cmd));
  if(commandFile) commandFile.run(bot,message,args)
   
    
    if(!message.guild)return;
    if(!message.content.startsWith(previx))return;  //printah abal abal
    if(message.author.bot) return;
    if(message.channel.type === "dm" ) return; 
  
   
    let {cooldown} = require ("./cooldown.js");
    let commandcooldown = cooldown 
    let msg = message.content.toLowerCase();
   

  
   
     if(commandcooldown.has(message.author.id)){
    
      return message.channel.send("jangan chat acchan dulu ya..nanti tunggu 5 detik").then(msg => msg.delete({timeout:4000}));
 }
   
   commandcooldown.add(message.author.id);
   setTimeout(() => {
     cooldown.delete(message.author.id);
  },5000)
  console.log(`${message.author.username} menggunakan command ${cmd}`);
  
  
  //tagg
  
  // if (message.content == `<@${bot.user.id}>` || message.content == `<@!${bot.user.id}>`) {
  //   let TagEmbed = new MessageEmbed()
  //   .setColor("RANDOM")
  //   .setAuthor(`Hello ${message.author.username}`, `${bot.user.displayAvatarURL}`)
  //   .setDescription(`Me Prefix It's \n \`m.\``)
  //   message.channel.send(TagEmbed);
  // }
  //akhir tag
  
 
 
   if (message.mentions.user) {
      message.channel.send("hi");
   } 
   else if (message.content === `${previx}ping`) {
      message.channel.send("PONG")
  } 
 
 
 });

 /// command welcome guild
 bot.on("message", message => {
    if (message.content === `${previx}tes`) {
      bot.emit("guildMemberAdd", message.member);
     }
   });
  bot.on("guildMemberAdd", async member => {
           
   let nameLimit = member.user.username;
   let username = nameLimit.length > 25 ? nameLimit.substring(0, 23) + "..." : nameLimit;
    let Config = await db.get(`${member.guild.id}.Config.Welcome.ED`);
    if (Config === "YA") {
    let Channel = await db.get(`${member.guild.id}.Config.Welcome.Channel`);
   if (!Channel) {
    return;
}
 else {
      let BG = await db.get(`${member.guild.id}.Config.Welcome.Background`);
      if (!BG) BG = "URL DEFAULT BACKGROUND";
      
       let MSG = await db.get(`${member.guild.id}.Config.Welcome.Message`);
      if (!MSG) MSG = "DEFAULT MESSAGE";
     
      let CLR = await db.get(`${member.guild.id}.Config.Welcome.Color`);
      if (!CLR) CLR = "#00ff00"; 
   
      async function createCanvas() {
         // let poto = "https://cdn.discordapp.com/attachments/677472531636158464/685696267145183311/wolf_silhouette_hills_130119_1280x720.jpg" 
      let imgphoto = /\?size=2048$/g;
            let { body : background} = await superagent.get(BG);
            let {body : avatar } = await superagent.get(member.user.displayAvatarURL({format:"jpg"}));
          
          return  new Canvas(1000, 500)
              .addImage(background, 0, 0, 1000, 500) // BACKGROUND
              // .addRoundImage(avatar, 110 ,50, 180, 256, 256, 128) // PROFILE
                .addCircularImage(avatar, 500, 160, 120)
      
               .setColor('#ffffff')
               .setTextFont('bold 40px sans-serif')
               .setTextAlign('center')
               .addText(`${username}#${member.user.discriminator}`, 500, 420)
              //.addText(`Member: ${member.guild.memberCount}`, 500, 400)
              
               .setTextFont("bold 75px K")
               .setTextAlign("center")
               .addText("WELCOME", 500, 370)
      
               .setColor('#ffffff')
               .setTextFont('bold 40px sans-serif')
               .setTextAlign('center')
                .addText(`${MSG}`, 500, 460)
      
              .toBufferAsync()
    };
  
     let channel = bot.channels.cache.get(Channel);
    channel.send({
     files: [{
    attachment:await createCanvas(),
    name: 'welcome.png'}] 
  }).catch(console.error);
    }
    } 
});
// filter word
bot.on("message", async message =>{
   let coba = ["kontol","KONTOL","KNTL","kntl","memek","mmk","bangsat","BANGSAT","BACOT","bacot","bacod","Anjing","ANJING","anjing"];
  
  let foundinText = false;
  
  for(var i in coba){
    if(message.content.toLowerCase().includes(coba[i].toLowerCase())){
      foundinText = true;
    }
    if(foundinText){
      message.delete();
      message.channel.send("dilarang menggunakan 14 bahasa yang dilarang ").then(d => d.delete({timeout: 5000}))
      break;
    }
  }
  
  
  // tag
   if (message.mentions.users.first() === bot.user ) {
    let TagEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Hello ${message.author.username}`, `${bot.user.displayAvatarURL()}`)
    .setDescription(`Prefix saya adalah  **${previx}** \n cara untuk menggunakan saya adalah \n **${previx}help**`)
    message.channel.send(TagEmbed);
  }
  
})//akhr filter word

bot.login(BOT_TOKEN);