module.exports = {
  config: {
    name:"prune",
    description: "mute command",
    usage: [] + "masukan berapa yg ingin di hapus", 
    accessableby: "only admin",
    aliases: ["pr"],
    category:"moderation"
},
run: async (bot, message, args) =>{ 

  if(!message.member.hasPermission(["MANAGE_CHANNELS", 'MANAGE_MESSAGES'])) return message.channel.send("kamu tidak bisa menghapus message");
  if(!args[0]) return message.channel.send("tolong masukan jumlah untuk message ingin dihapus").then(m => m.delete({timeout : 3000}));
    const amount = parseInt(args[0]) ;
  if(amount < 2 || amount > 150) return message.channel.send("kamu hanya bisa menghapus message minimal 2 max sampai 150 msg!!");
  
  message.channel.bulkDelete(amount).then(() =>
  message.channel.send(`menghapus **${amount}** message sukses`).then(msg => msg.delete({timeout:3000}))
  );


}}