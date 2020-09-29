const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
			const args = message.content.slice(prefix.length).trim().split(/ +/);
			const command = args.shift().toLowerCase();

			//Ping Command
		if(command ==='ping'){
			message.channel.send('Pong.');
		} else {
			if(command === 'pong'){
				message.channel.send('Ping.');
			}
		}

			//Kick Command
			if(command ==='kick'){
				var kick = "kick"
				punishments(kick);
			}
			//Ban Command
			if(command ==='ban'){
				var ban = "ban"
				punishments(ban);
			}
			//Server-Mute Command
			if(command ==='mute'){
				var mute = "mute"
				punishments(mute);
			}
			//Server-Deafen Command
			if(command ==='deafen'){
				var deafen = "deafen"
				punishments(deafen);
			}
			//Disconect Command
			if(command ==='disconnect'){
				var disconnect = "disconnect"
				punishments(disconnect);
			}
			//Move-Player-ToChannel
			//Lmao(Random Image from google)

			function punishments(pun){
				if (!message.mentions.users.size) {
					return message.reply('You need to tag a user!');
				}

				const taggedUser = message.mentions.users.first();

				switch(pun){
					case "ban":{
						if(taggedUser){
							const member = message.guild.member(taggedUser);
							if(member){
							member.ban({
									reason: 'They were bad!',
								})
								.then(() => {
									message.reply(`The user '${user.tag}' has been banned`);
								})
								.catch(err => {
									message.reply('I was unable to ban the member');
									console.error(err);
									return 0;
								});
							}
						}
						break;
					}
					case "kick":{
						if(taggedUser){
							const member = message.guild.member(taggedUser);
							if(member){
								member.kick('lalalala').then(()=>
								message.reply(`The user '${taggedUser.username}' has been kicked`)
								).catch(err =>{
									message.reply('I was unable to kick this member');
									console.error(err);
									return 0;
								});
							}
						}
						break;
					}
					case "mute":{
						if(taggedUser){
							const member = message.guild.member(taggedUser);
							if(member.voice.serverMute == true){
								member.voice.setMute(false);
								message.reply(`The user '${taggedUser.username}' has been unmuted`);
								return 0;
							} else {
								if(member){
									member.voice.setMute(true).then(()=>
									message.reply(`The user '${taggedUser.username}' has been muted`)
									).catch(err =>{
										message.reply('I was unable to mute this member');
										console.error(err);
										return 0;
									});
								}
							}
						}
						break;
					}
					case "deafen":{
						if(taggedUser){
							const member = message.guild.member(taggedUser);
							if(member.voice.serverDeaf == true){
								member.voice.setDeaf(false);
								member.voice.setMute(false);
								message.reply(`The user '${taggedUser.username}' has been undeafened`);
								return 0;
							} else {
								if(member){
									member.voice.setDeaf(true).then(()=>member.voice.setMute(true),
									message.reply(`The user '${taggedUser.username}' has been deafened`)
									).catch(err =>{
										message.reply('I was unable to deafen this member');
										console.error(err);
										return 0;
									});
								}
							}
						}
						break;
					}
					case "disconnect":{

					}
				}//switch
			}
});



client.login('NzYwMzM5MjUxMzgzNzYyOTg0.X3KnGw.jBhQyoyNBqZEnHIrSWLkHvEQpw8');