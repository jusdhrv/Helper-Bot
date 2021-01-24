const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('C:/Users/20ddh/Desktop/Passions/Youtube Channel/Discord Bot/Main/data.json');
const client = new Discord.Client();
const figlet = require('figlet');
client.on('ready', async () => {
    const servers = await client.guilds.cache.size
    const users = await client.users.cache.size    
    console.log(`Bot is now online and serving in ${servers} servers`)
    client.user.setActivity(` ${servers} servers and ${users} users`, {
        type: 'WATCHING',
    })
});

infoCmd = [' help ',' ping ', ' user-info ', ' server-info ']
ownerCmd = [' restart ']
reactsTo = [' lol ', ' poop ', ' thank you ', ' welcome ', ' hi ']

client.on('message', message => {
    const msg = message.content.toLowerCase();
    if (message.author.bot) return;
    try {
        console.log(`Entered try`)
        if (msg === `~ping`){
            message.channel.send(`🏓Latency is: ${Date.now() - message.createdTimestamp}ms`);
        }
        else if (msg === `~user-info`){
            message.channel.send(`Username: ${message.author.username}\nYour ID: ${message.author.id}`);
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
                .setAuthor('Helper Bot')
                .addField('Name:-', "```Helper Bot```")
                .addField('Owner:-', '```d_dhruv#8075```')
                .addField('Acknowledgements:-', '```Reyansh_Khobragade ♔#8031```')
                .addField('Prefix:-', '```tilde i.e. "~"```')
                .addField('Built In:-', '```Javascript```')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`);

            message.channel.send(helpEmbed);
        }
        else if (msg === `~restart` || msg === `~reset`){
            message.channel.send('Restarting...')
            .then(message => client.destroy())
            client.login(token);
        }
        else if (msg === `~help`){
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Commands:-')
                .setAuthor('Helper Bot')
                .addField('Prefix:-', "```~```")
                .addField('Info Commands:-', `${infoCmd}`)
                .addField('Owner-Only Commands:-', `${ownerCmd}`)
                .addField('Reacts to:-', `${reactsTo}`)
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`);

            message.channel.send(helpEmbed);
        }
        else if (msg === `lol`){
            message.react('🤣');
        }
        else if (msg === `poop`){
            message.react('💩');
        }
        else if (msg === `thank you`){
            message.react('🙏🏼');
        }
        else if (msg === `welcome`){
            message.react('😁');
        }
        else if (msg === `hi`){
            message.channel.send('```Hello! 🖐🏼```');
        }
    }
    catch (error) {
        console.error(error);
    }

});
client.login(token);
