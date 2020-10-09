const fetch = require ("node-fetch");
const request = require ('request');
const dateformat = require ("dateformat");
const {MessageEmbed} = require ("discord.js");
module.exports = {
  config: {
    name:"jadwalsholat",
    description: "jadwal sholat",
    usage:[], 
    accessableby: "Members",
    aliases: ["sh"],
    category:"fun"
},

run:async (bot,message,args)=>{ 
  let msg = message.content.toLowerCase();
 const text = msg.replace(/\s\s+/g, ' '),
      teks = text.split(" ")
const  awal = args[0]
const akhir = args[1]
const semua = `${args}`.substr(`${args}`.indexOf(" ")+1);
const smbesok = `${args}`.substr(`${args}`.indexOf(" ")+1);

  if(!args[0])return message.channel.send("tolong masukan nama daerah");
// const data =await fetch(`https://api.banghasan.com/sholat/format/json/kota/nama/${args[0]}`);
//   const js = await data.json();
  const tgl = (akhir== 'besok') ? dateformat(new Date(Date.now()+24*60*60*1000), 'yyyy-mm-dd') : dateformat(new Date(), "yyyy-mm-dd"),
          query = (akhir == 'besok') ? smbesok : semua,
          kunci = isNaN(query) ? `nama` : `kode`
  
  var urlbr = 'http://api.banghasan.com/sholat/format/json/kota/'+ kunci + '/'+ query
  request(urlbr, function (err,response, body){
     
    const kota = JSON.parse(body);
      var jml = kota.kota,
          kode = kota.kota[0].id,
          nkota = kota.kota[0].nama,
          dfkota=""
      
  
      
  const url = 'https://api.banghasan.com/sholat/format/json/jadwal/kota/' + `${kode}`+'/tanggal/' + `${tgl}` ;
  request(url, function(err, response, body){
if(err)return message.channel.send("sedang ada gangguan tolong coba lagi nanti");
else{

        // if(jml.kota == 1)
    
      
      const sholat = JSON.parse(body),
           tgl = sholat.jadwal.data.tanggal,
           imsak = sholat.jadwal.data.imsak,
           shubuh = sholat.jadwal.data.subuh,
           terbit = sholat.jadwal.data.terbit,
           dhuha = sholat.jadwal.data.dhuha,
           dzuhur = sholat.jadwal.data.dzuhur,
           ashar = sholat.jadwal.data.ashar,
           maghrib = sholat.jadwal.data.maghrib,
           isya = sholat.jadwal.data.isya
   
      let coba = new MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(bot.user.displayAvatarURL())
    .setDescription(`
     **Jadwal Waktu sholat ** \n tanggal: ${tgl} untuk kota ${nkota} ${kode} dan sekitarnya \n
\`\`\`
imsakiah: ${imsak} \n
subuh : ${shubuh}\n
dhuha : ${dhuha}\n
dzuhur: ${dzuhur}\n
ashar : ${ashar}\n
magrib: ${maghrib}\n
isya  : ${isya}\`\`\``)
      .setTimestamp()
      return message.channel.send(coba)
      
}
      
  })//req akhir..dalem
  })//request awal...luar
    
      // console.log(sholat)
  
  





}}