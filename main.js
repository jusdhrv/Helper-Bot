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
    if (message.author.bot) return;
    try {
        console.log(`Entered try`)
        if (message.content === `~ping`){
            message.channel.send(`🏓Latency is: ${Date.now() - message.createdTimestamp}ms`);
        }
        else if (message.content === `~user-info`){
            message.channel.send(`Username: ${message.author.username}\nYour ID: ${message.author.id}`);
        }
        else if (message.content === `~server-info`){
            message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
        }
        else if (message.content === `~about`){
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
        else if (message.content === `~restart` || message.content === `~reset`){
            message.channel.send('Restarting...')
            .then(message => client.destroy())
            client.login(token);
        }
        else if (message.content === `~help`){
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
        else if (message.content === `lol`){
            message.react('🤣');
        }
        else if (message.content === `poop`){
            message.react('💩');
        }
        else if (message.content === `thank you`){
            message.react('🙏🏼');
        }
        else if (message.content === `welcome`){
            message.react('😁');
        }
        else if (message.content === `hi`){
            message.channel.send('```Hello! 🖐🏼```');
        }
    }
    catch (error) {
        console.error(error);
    }

});
client.login(token);