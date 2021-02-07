const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./data.json');
const client = new Discord.Client();
const figlet = require('figlet');
const { Random } = require("something-random-on-discord")
const random = new Random();
const DanBotHosting = require("danbot-hosting");
const Color = `RANDOM`;
const Fetch = require("node-fetch");
const jimp = require('jimp');
const canvacord = require('canvacord');
const os = require('os');
const emoji = require('discord-emoji-convert');

const bot_avatar = "https://cdn.discordapp.com/avatars/801013268914503700/cb637313f626b263555999360b9f0a30.png?size=4096"

client.on('ready', async () => {
    const servers = await client.guilds.cache.size
    const users = await client.users.cache.size    
    console.log(`Bot is now online and serving in ${servers} servers`)
    client.user.setActivity(` ${servers} servers and ${users} users`, {
        type: 'WATCHING',
    })
});

infoCmd = [' help ',' ping ', ' user-info ', ' server-info ', ' sys-info ']
funCmd = [' advice ', ' meme ', ' rps ', ' vw ', ' clapify ', ' wb ', ' jail ', ' facepalm ', ' rip ', ' slap ', ' trigger ']
reactsTo = [' lol ', ' poop ', ' thank you ', ' welcome ', ' hi ']

client.on("message", async message => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const msg = message.content.toLowerCase();
    if (message.author.bot) return;
    try {
        if (msg === `~ping`){
            message.channel.send(`🏓Latency is: ${Date.now() - message.createdTimestamp}ms`);
        }
        else if (msg.includes(`~emojify`)){
            message.channel.send(emoji.convert(msg.slice(8)))
        }
        else if (msg === `~restart`){
            if (message.author.id === "731762138929954817") {
                await message.channel.send("Restarting the bot");
                await client.destroy();
                setTimeout(() => {
                    client.login(token);
                }, 5000);} 
            else  {
                await message.channel.send('you are not allowed to use this command')
                }
        }
        else if (msg === `~restart`){
            if(message.author.id == "731762138929954817"){
                exec(args.join, (err, stdout, stderr) => {
                    let errmbed = new Discord.MessageEmbed()
                        .setDescription("\`\`\`bash\n"+err+"\`\`\`").setColor("RED")
                    let stdoutmbed = new Discord.MessageEmbed()
                        .setDescription("\`\`\`bash\n"+stdout+"\`\`\`").setColor("GREEN")
                    if (stdout) {
                        message.channel.send(stdoutmbed)
                    }
                    else if(err){
                        message.channel.send(errmbed);
                    }
                })
            }
            else {
                message.channel.send("you don't have permission to use this command....")
            }
        }
        else if (msg === `~sys-info`){
            let servercount = client.guilds.cache.size;
            let usercount = client.users.cache.size;
            let channelscount = client.channels.cache.size;
            let arch = os.arch();
            let platform = os.platform();
            let shard = client.ws.shards.size;
            let NodeVersion = process.version;
            let cores = os.cpus().length;

            let stats = new Discord.MessageEmbed()
                .setTitle(`System Information of ${client.user.username}`)
                .setColor('BLUE')
                .addField("Server Count", `${servercount}`, true)
                .addField("Users Count", `${usercount}`, true)
                .addField("Channel's Count", `${channelscount}`, true)
                .addField('Architecture', `${arch}`, true)
                .addField('Platform', `${platform}`, true)
                .addField('Node-Version', `${NodeVersion}`, true)
                .addField('Shards', `${shard}`, true)
                .addField('Cores', `${cores}`, true)
                .setTimestamp()
                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send(stats);
        }
        else if (msg === `~trigger`){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let image = await canvacord.Canvas.trigger(avatar);
            let attachment = new Discord.MessageAttachment(image, "triggered.gif");
            return message.channel.send(attachment);
        }
        else if (msg === `~jail`){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let image = await canvacord.Canvas.jail(avatar)
            let attachment = new Discord.MessageAttachment(image, "jailed.png");
            return message.channel.send(attachment);
        }
        else if (msg === `~rip`){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let image = await canvacord.Canvas.rip(avatar)
            let attachment = new Discord.MessageAttachment(image, "grave.png");
            return message.channel.send(attachment);
        }
        else if (msg === `~facepalm`){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let image = await canvacord.Canvas.facepalm(avatar)
            let attachment = new Discord.MessageAttachment(image, "facepalm.png");
            return message.channel.send(attachment);
        }
        else if (msg === `~slap`){
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let image = await canvacord.Canvas.slap(bot_avatar, avatar)
            let attachment = new Discord.MessageAttachment(image, "slap.png");
            return message.channel.send(attachment);
        }
        else if (msg.includes(`~vw`)){
            let text = msg.slice(3);
            if (!text) return message.channel.send("Provide some text")
            const vaporwavefied = text.split('').map(char => {const code = char.charCodeAt(0)
            return code >= 33 && code <= 126 ? String.fromCharCode((code - 33) + 65281) : char}).join('')
            message.channel.send(vaporwavefied)
        }
        else if (msg.includes(`~clapify`)){
            let text = msg.slice(9);
            if (!text) return message.channel.send("Provide some text")
            const output = text.replaceAll(" "," :clap: ")
            message.channel.send(output)
        }
        else if (msg === `~user-info`){
            var user = message.mentions.users.first();
            var member = message.mentions.users.first(user);
            const userEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('User Info:-')
                .addField('Name:-', `${message.author.username}`)
                .addField('Tag:-', `${message.author.discriminator}`)
                .addField('ID:-', `${message.author.id}`)
                //.addField('Roles:-', `${member.roles.cache.map(r => `${r}`).join(' , ')}`)
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`);

            message.channel.send(userEmbed);
        }
        else if (msg === `~meme`){
            const Reds = [
                "memes",
                "me_irl",
                "dankmemes",
                "comedyheaven",
                "Animemes"
                ];
                
            const Rads = Reds[Math.floor(Math.random() * Reds.length)];
                
            const res = await Fetch(`https://www.reddit.com/r/${Rads}/random/.json`);
                
            const json = await res.json();
                
            if (!json[0]) return message.channel.send(`whoops something went wrong`);
                
            const data = json[0].data.children[0].data;
                
            const memeEmbed = new Discord.MessageEmbed()
                .setColor(Color)
                .setURL(`https://reddit.com${data.permalink}`)
                .setTitle(data.title)
                .setDescription(`Author : ${data.author}`)
                .setImage(data.url)
                .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
                .setTimestamp();
            message.channel.send(memeEmbed);
        }
        else if (msg === `~advice`){
            let randAdvice = await random.getAdvice()
            message.channel.send(randAdvice)
        }
        else if (msg === `~server-info`){
            const serverEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Server Info:-')
                .addField('Name:-', `${message.guild.name}`)
                .addField('Total Members:-', `${message.guild.memberCount}`)
                .addField('Humans:-', `${message.guild.members.cache.filter(member => !member.user.bot).size}`)
                .addField('Roles:-', `${message.guild.roles.cache.size}`)
                .addField('Emojis:-', `${message.guild.emojis.cache.size}`)
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`);

            message.channel.send(serverEmbed);
        }
        else if (msg === `~about`){
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('About Me:-')
                .addField('Name:-', "```Helper Bot```")
                .addField('Owner:-', '```d_dhruv#8075```')
                .addField('Acknowledgements:-', '```Reyansh_Khobragade ♔#8031```')
                .addField('Prefix:-', '```tilde i.e. "~"```')
                .addField('Built In:-', '```Javascript```')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`);

            message.channel.send(helpEmbed);
        }
        else if (msg === `~help`){
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Commands:-')
                .addField('Prefix:-', "`~`")
                .addField('Info Commands:-', `${infoCmd}`)
                .addField('Fun Commands:-', `${funCmd}`)
                .addField('Reacts to:-', `${reactsTo}`)
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`);

            message.channel.send(helpEmbed);
        }
        else if (msg.includes(`~wb`)){
            let text = msg.slice(3)
            let font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
            let wb = await jimp.read('https://cdn.glitch.com/0879733f-a595-47e0-8432-78be65e99f1e%2Fwhiteboard.png?v=1604824216538')
            wb.print(font, 104, 130, `${text}`)
            wb.write('hmm.png')
            message.channel.send(``, { files: ["./hmm.png"] })
        }
        else if (msg.includes(`~rps`)){
            if (!args[1]){
                message.channel.send("Pls use the command like `~rps <your move here(rock, paper, scissor)>`")
            }
            let comp = [`rock`, `paper`, `scissor`]
            var randomIndex = Math.floor(Math.random() * comp.length);
            var compMove = comp[randomIndex];
            let userMove = args[1].toLowerCase();
            if (userMove === compMove){
                let result = `TIE`
                const rpsEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Rock 🪨, Paper 📄, Scissor ✂ Game Results:-')
                .addField('Your Move:-', `${userMove}`)
                .addField(`Computer's Move:-`, `${compMove}`)
                .addField('Result:-', `${result}`)
                .setTimestamp()

                message.channel.send(rpsEmbed);
            }
            else if (userMove === 'rock' && compMove === 'scissor'){
                let result = `You Win !!`
                const rpsEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Rock 🪨, Paper 📄, Scissor ✂ Game Results:-')
                .addField('Your Move:-', `${userMove}`)
                .addField(`Computer's Move:-`, `${compMove}`)
                .addField('Result:-', `${result}`)
                .setTimestamp()

                message.channel.send(rpsEmbed);
            }
            else if (userMove === 'scissor' && compMove === 'paper'){
                let result = `You Win !!`
                const rpsEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Rock 🪨, Paper 📄, Scissor ✂ Game Results:-')
                .addField('Your Move:-', `${userMove}`)
                .addField(`Computer's Move:-`, `${compMove}`)
                .addField('Result:-', `${result}`)
                .setTimestamp()

                message.channel.send(rpsEmbed);
            }
            else if (userMove === 'paper' && compMove === 'rock'){
                let result = `You Win !!`
                const rpsEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Rock 🪨, Paper 📄, Scissor ✂ Game Results:-')
                .addField('Your Move:-', `${userMove}`)
                .addField(`Computer's Move:-`, `${compMove}`)
                .addField('Result:-', `${result}`)
                .setTimestamp()

                message.channel.send(rpsEmbed);
            }

            else if (compMove === 'rock' && userMove === 'scissor'){
                let result = `You Lose !!`
                const rpsEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Rock 🪨, Paper 📄, Scissor ✂ Game Results:-')
                .addField('Your Move:-', `${userMove}`)
                .addField(`Computer's Move:-`, `${compMove}`)
                .addField('Result:-', `${result}`)
                .setTimestamp()

                message.channel.send(rpsEmbed);
            }
            else if (compMove === 'scissor' && userMove === 'paper'){
                let result = `You Lose !!`
                const rpsEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Rock 🪨, Paper 📄, Scissor ✂ Game Results:-')
                .addField('Your Move:-', `${userMove}`)
                .addField(`Computer's Move:-`, `${compMove}`)
                .addField('Result:-', `${result}`)
                .setTimestamp()

                message.channel.send(rpsEmbed);
            }
            else if (compMove === 'paper' && userMove === 'rock'){
                let result = `You Lose !!`
                const rpsEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Rock 🪨, Paper 📄, Scissor ✂ Game Results:-')
                .addField('Your Move:-', `${userMove}`)
                .addField(`Computer's Move:-`, `${compMove}`)
                .addField('Result:-', `${result}`)
                .setTimestamp()

                message.channel.send(rpsEmbed);
            }
        }
        else if (msg.includes(`~figlet`)){
            let text = msg.slice(7)
            if (!args[1]) return message.channel.send("Please provide text!");
            figlet(text, (err, data) => {
            message.channel.send(data, { code: "ascii"});
            });
        }
        else if (msg.includes(`lol`)){
            message.react('🤣');
        }
        else if (msg.includes(`lmao`) || msg.includes(`lmfao`)){
            message.react('😂');
        }
        else if (msg.includes(`welcome`)){
            message.react('🥳');
        }
        else if (msg.includes(`poop`)){
            message.react('💩');
        }
        else if (msg.includes(`thank you`)){
            message.react('🙏🏼');
        }
        else if (msg.includes(`cool`)){
            message.react('😎');
        }
        else if (msg.includes(`nice`) || msg.includes(`noice`)){
            message.react('👌🏼');
        }
        else if (msg.includes(`welcome`)){
            message.react('😁');
        }
        else if (msg.includes(`hi`)){
            message.channel.send('```Hello! 🖐🏼```');
        }
    }
    catch (error) {
        console.error(error);
    }

});
client.login(token);
