const {MessageEmbed}= require("discord.js");
const YouTube = require('simple-youtube-api');
const fs = require ("fs");
const ytdl = require ("ytdl-core");
const { Client, Util } = require('discord.js');
const youtube = new YouTube(process.env.YT_API);
const queue = new Map();
module.exports = {
  config: {
    name:"play",
    description: "play and Fell for the chill a mussic ",
    usage: [] + " " +"<masukkan judul lagu>", 
    accessableby: "Members",
    aliases: ["pp","pl"],
    category:"mussic"
},


run:async (bot, message, args) => {
  
  const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = bot.queue.get(message.guild.id);
  const voiceChannel = message.member.voice.channel; //
		if (!voiceChannel) return message.channel.send('maaf anda harus terlebih dahulu masuk ke Voice Channel!');
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send('acchan gk bisa masuk ke voice channel, kenapa ya?');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send('acchan gk bisa ngomong di channel');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return message.channel.send(`? Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					var embed = new MessageEmbed()
                                .setTitle("🎧🎶 Song Selection 🎶🎧 ")
                                .setDescription(`${videos.map(video2 => `**${++index}** \`${video2.title}\` `).join('\n')}`)
	                              .setColor("RANDOM")
                                .setFooter("Please provide a value to select one of the search results ranging from 1-10.")

                                 message.channel.send(embed).then(msg => {msg.delete({timeout: 20000})});
					// eslint-disable-next-line max-depth
					try {
						var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							max: 1,
							time: 20000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return message.channel.send('waktu untuk pemilihan lagu habis! ');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send('?? I could not obtain any search results.');
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
  

  
  
  async function handleVideo(video, message, voiceChannel, playlist = false) {
	const serverQueue = bot.queue.get(message.guild.id);//
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`,
    thumbnail: video.thumbnails.high.url,
    durationH: video.duration.hours,
    durationM: video.duration.minutes,
    durationS: video.duration.seconds
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 100,
			playing: true
		};
		bot.queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);//buat baru mulai

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			bot.queue.delete(message.guild.id);
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song); // buat queue
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return message.channel.send(`✅**${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = bot.queue.get(message.guild.id);//

	if (!song) {
		serverQueue.voiceChannel.leave();
		bot.queue.delete(guild.id);
		return ;
	}
	console.log(serverQueue.songs);
 

	const dispatcher = serverQueue.connection.play(ytdl(song.url))
		.on('finish', reason => {
			if (reason === 'Stream is not generating quickly enough.') 
        return message.channel.send("antrian sudah habis, saya kan keluar").then(m => m.delete({timeout : 7000}))
        .then( ()=>console.log('Song ended.'));
      else console.log(reason);
			let lop = serverQueue.songs.shift();
      if(serverQueue.loop) serverQueue.songs.push(lop);
			return play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

				 var embed = new MessageEmbed()
                                .setTitle("Song Selection")
                                .setDescription(`🔊 \`Start playing:\` **${song.title}**`)
	                              .setColor("RANDOM")
                                serverQueue.textChannel.send(embed).then(msg => {msg.delete({timeout:10000})});
}
  
}

}