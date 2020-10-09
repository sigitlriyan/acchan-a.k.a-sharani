const {MessageEmbed} =require ("discord.js")
const {inspect} = require ("util");
module.exports = {
  config: {
    name:"eval",
    description: "untuk membantu dev",
    usage: [], 
    accessableby: "development",
    aliases: ["ev"],
    category:"core"
},

run:async (bot,message,args)=>{
  
  
  
  if (message.author.id == "492692825704497173"){
  let toEval = args.join(" ");
  let  evaluet
     if (typeof  evaluet!== "string") {
       evaluet = inspect(eval(toEval,{depth: 0} ))}
  try{
      if(toEval) {
      let hrStart = process.hrtime();
        let hrDiff;
        hrDiff= process.hrtime(hrStart)
        const asik = evaluet.substring (evaluet.length - 2000);// pembawa berkahhh
        const embed = new MessageEmbed()
        .setAuthor("output")
        .setColor ("0x42f468")
        .setDescription(`\`\`\`javascript\n ${asik} \n\`\`\`` )
        .setFooter(`⏱${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.`);
        
      message.channel.send(embed) 
      }else{
        return message.channel.send("Error with evaluating: can not avaluated air")
        
      }
  } catch(e){
      message.channel.send(`Error with evaluating : \`${e.message}\` `)
    // return console.log(e);
    }

  }// if 
    else { 
      return message.channel.send ("hannya development acchan yang bisa menggunakannnya").then(d => d.delete(5000));
    }
  
 function  clean(text) {
        if (typeof text === "string")
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    }
}}

  