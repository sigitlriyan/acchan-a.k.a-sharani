module.exports = (bot) => {
  let prompt = process.openStdin()
  prompt.addListener("data", res=>{
   let x = res.toString().trim().split(/ +/g)
   bot.channels.get("677472531636158464").send(x.join(" "));
   }
  )
}