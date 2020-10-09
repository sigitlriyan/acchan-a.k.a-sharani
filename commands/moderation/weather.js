const{MessageEmbed}= require ("discord.js")
const weather = require ("weather-js")

module.exports = {
  config: {
    name:"weather",
    description: "weather of worlds",
    usage: [], 
    accessableby: "member",
    aliases: ["wh"],
    category:"moderation"
},
run: async (bot, message, args)=>{
  
  weather.find({search: args.join(" "), degreeType: `C` }, function (err, result){
    if(err) return message.channel.send(err)
    
    let current = result[0].current
    let location = result[0].location
    
    const em = new  MessageEmbed()
      .setDescription(`**${current.skytext}**`)
      .setAuthor(`cuaca untuk: ${current.observationpoint}`)
      .setThumbnail(current.imageUrl)
      .setColor('RANDOM')
      .setImage(current.imageUrl)
      .addField('Timezone', `UTC ${location.timezone}`, true)
      .addField('degree type', location.degreetype, true)
      .addField('Temperature', `${current.temperature}°C`, true)
      .addField('Feels Like',`${current.feelslike} Degrees`, true)
      .addField('Wind',`${current.winddisplay}`,true)
      .addField('Humidity', `${current.humidity}%`,true)
      .setTimestamp()
      .setFooter(`${message.author.tag}`,message.author.displayAvatarURL)
    
    message.channel.send(em)
  })
  
}
}
      