const {readdirSync} =require ("fs")

module.exports = bot => {
  const load = dirs =>{
    const event = readdirSync(`./event/${dirs}`).filter(d => d.endsWith('.js'))
    for(let file of event){
      const evn = require (`../event/${dirs}/${file}`)
      let eName= file.split(".")[0]
      bot.on(eName, evn.bind(null, bot))
                          
    }
  }
  ["client"].forEach(x=> load(x));
} 