const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const command = require('./command')
const ytdl = require('ytdl-core')

client.once('ready', () => {
	console.log('Ready!');

	command(client, 'ping', (message) =>{
		message.channel.send('Pong!')
	})

	command(client, 'ban', (message, args) =>{
		const { member, mentions } = message

		const tag = `<@${member.id}>`

		if(member.hasPermission('ADMINISTRATOR') ||
		   member.hasPermission('BAN_MEMBERS')
		){
			const target = mentions.users.first();

			if(message.author === target){
				message.channel.send(`${tag} You cant ban yourself`)
				return 0;
			}
			if(target){
				const targetMember = message.guild.members.cache.get(target.id)
				targetMember.ban();
				message.channel.send(`${tag} That user has been banned`)
			} else {
				message.channel.send(`${tag} Please specify someone to ban.`)
			}
		} else {
			message.channel.send(`${tag} You do not have permissions to ban.`)
		}
	})//End of ban
	command(client, 'kick', (message, args) =>{
		const { member, mentions } = message

		const tag = `<@${member.id}>`

		if(member.hasPermission('ADMINISTRATOR') ||
		   member.hasPermission('KICK_MEMBERS')
		){
			const target = mentions.users.first();

			if(message.author === target){
				message.channel.send(`${tag} You cant kick yourself`)
				return 0;
			}
			if(target){
				const targetMember = message.guild.members.cache.get(target.id)
				targetMember.kick();
				message.channel.send(`${tag} That user has been kicked from the server`)
			} else {
				message.channel.send(`${tag} Please specify someone to kick.`)
			}
		} else {
			message.channel.send(`${tag} You do not have permissions to kick.`)
		}
	})//End of kick
	command(client, 'mute', (message, args) =>{
		const { member, mentions } = message

		const tag = `<@${member.id}>`

		if(member.hasPermission('ADMINISTRATOR') ||
		   member.hasPermission('MUTE_MEMBERS')
		){
			const target = mentions.users.first();

			if(message.author === target){
				message.channel.send(`${tag} You cant mute yourself`)
				return 0;
			}
			if(target){
				const targetMember = message.guild.members.cache.get(target.id)

				if(targetMember.voice.serverMute == true){
					targetMember.voice.setMute(false);
					message.channel.send(`${tag} The user has been unmuted`)
				}else {
				targetMember.voice.setMute(true);
				message.channel.send(`${tag} That user has been muted`)
				}
			} else {
				message.channel.send(`${tag} Please specify someone to mute.`)
			}
		} else {
			message.channel.send(`${tag} You do not have permissions to mute.`)
		}
	})//End of Mute
	command(client, 'deafen', (message, args) =>{
		const { member, mentions } = message

		const tag = `<@${member.id}>`

		if(member.hasPermission('ADMINISTRATOR') ||
		   member.hasPermission('MUTE_MEMBERS')
		){
			const target = mentions.users.first();

			if(message.author === target){
				message.channel.send(`${tag} You cant deafen yourself`)
				return 0;
			}
			if(target){
				const targetMember = message.guild.members.cache.get(target.id)

				if(targetMember.voice.serverMute == true){
					targetMember.voice.setMute(false);
					targetMember.voice.setDeaf(false);
					message.channel.send(`${tag} The user has been undeafened`)
				}else {
				targetMember.voice.setMute(true);
				targetMember.voice.setDeaf(true);
				message.channel.send(`${tag} That user has been deafened`)
				}
			} else {
				message.channel.send(`${tag} Please specify someone to deafen.`)
			}
		} else {
			message.channel.send(`${tag} You do not have permissions to deafen.`)
		}
	})
	command(client, 'disconnect', (message, args) =>{
		const { member, mentions } = message

		const tag = `<@${member.id}>`

		if(member.hasPermission('ADMINISTRATOR') ||
		   member.hasPermission('MOVE_MEMBERS')
		){
			const target = mentions.users.first();
			if(target){
				const targetMember = message.guild.members.cache.get(target.id)
				if(!targetMember.voice.channel){
					message.channel.send(`${tag} That user isnt in a channel.`)
				} else {
					targetMember.voice.kick();
					message.channel.send(`${tag} The user ${targetMember} has been kicked from the Voice Channel.`)
				}
			} else {
				message.channel.send(`${tag} Please specify someone to disconnect.`)
			}
		} else {
			message.channel.send(`${tag} You do not have permissions to disconnect.`)
		}
	})
	// command(client, 'move', (message, args) =>{
	// 	const { member, mentions } = message

	// 	const tag = `<@${member.id}>`

	// 	if(member.hasPermission('ADMINISTRATOR') ||
	// 	   member.hasPermission('MOVE_MEMBERS')
	// 	){
	// 		const target = mentions.users.first();
	// 		if(target){
	// 			const targetMember = message.guild.members.cache.get(target.id)
	// 			if(!targetMember.voice.channel){
	// 				message.channel.send(`${tag} That user isnt in a channel.`)
	// 			} else {
	// 				targetMember.voice.kick();
	// 				message.channel.send(`${tag} The user ${targetMember} has been moved to another voice channel.`)
	// 			}
	// 		} else {
	// 			message.channel.send(`${tag} Please specify someone to move.`)
	// 		}
	// 	} else {
	// 		message.channel.send(`${tag} You do not have permissions to move people.`)
	// 	}
	// })

	// command(client, 'play', async (message, args) =>{
	// 	const voiceChannel = message.member.voice.channel
	// 	if(!voiceChannel) return message.channel.send("You need to be in a channel to play music");
		
	// 	if(!client.hasPermission('ADMINISTRATOR') ||
	// 	   client.hasPermission('CONNECT') ||
	// 	   client.hasPermission('SPEAK')){
	// 		   message.channel.send("I do not have permission to play music there");
	// 	   }

	// 	   try{
	// 			var connection = await voiceChannel.join();
	// 	   } catch(error){
	// 			console.log(`There was an error connection to the voice channel: ${error}`)
	// 			return message.channel.send("There was an error connecting, please try again")
	// 	   }

	// 	   const dispatcher = connection.play(ytdl)

	// })
})

client.login(config.token);
