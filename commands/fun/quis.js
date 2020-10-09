const {MessageEmbed} = require("discord.js");
const fetch = require ("node-fetch"); 
module.exports = {
  config: {
    name:"quis",
    description: "family 100",
    usage:[], 
    accessableby: "Members",
    aliases: [],
    category:"fun"
},

run:async (bot,message,args)=>{ 

const source = await fetch("https://opentdb.com/api.php?amount=1&category=31&difficulty=medium&type=boolean");
  const data = await source.json();
  const length = data.results.length;
 const randomNum= Math.floor(Math.random() * length);
  const randomQues = data.results[randomNum];
  const ques = randomQues.question;
  const correctAnswer = randomQues.correct_answer;
  
  let quess = new MessageEmbed()
  .setColor("RANDOM")
  .setDescription(ques)
  .setTimestamp()
  .setFooter(bot.user.displayAvatarURL())
  message.channel.send(ques)
  const filter = m => m.author.id === message.author.id;
  const answer = await message.channel.awaitMessages(filter, { max: 1, time: 10000, errors : ['time', 'max']});
  const ans = answer.first();

  if(ans.content.toLowerCase()=== correctAnswer.toLowerCase())
 { 
   message.channel.send("ya betull")
 }else {
   message.channel.send("kamu salah")
 }
     
}}
