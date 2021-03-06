const { CommandoClient } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const path = require('path');
const config = require('./config.json');

const activities = require('./assets/json/activity');

const utils = require("./fonctions/utils.js");
var preferencies =  utils.createJsonFile("preferencies.json");
var emojiUsed =  utils.createJsonFile("emoji.json");
var connected = utils.createJsonFile("connected.json");

const client = new CommandoClient({
    commandPrefix: '$',
    owner: '268494575780233216',
    disableEveryone: true
});
client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['emoji', 'Emoji managment and list'],
        ['utilities', 'utilities']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

const initialiseEmoji = (msg) => {
    if (!emojiUsed[msg.guild.id]) emojiUsed[msg.guild.id] = {};
    if (!emojiUsed[msg.guild.id][msg.author.id]) emojiUsed[msg.guild.id][msg.author.id] = {};
    if (!emojiUsed[msg.guild.id]["0"]) emojiUsed[msg.guild.id]["0"] = {};
};

const run = (msg) => {
    if (msg.channel.type !== 'text' || msg.author.bot) return;
    if (!msg.channel.permissionsFor(msg.client.user).has(['SEND_MESSAGES', 'MANAGE_MESSAGES'])) return;

    if(!preferencies[msg.author.id]){
        if(client.guilds.find("id", "434283741775396864").emojis.exists("name", msg.content.toLowerCase())){
            return utils.postCustomEmoji(msg, msg.author, msg.content, client);
        }
    }
//Special kane des bisous
if(msg.author.id == "189116981822226433" && msg.content.toLowerCase().indexOf("bez") > -1){
    msg.reply("nous aussi on t'aime")
}

    initialiseEmoji(msg);
    var emojilist = msg.guild.emojis.array()
    for(var i = 0; i<emojilist.length; i++){
      if (msg.content.indexOf("<:" + emojilist[i].name + ":" + emojilist[i].id + ">") != -1){
        if(!emojiUsed[msg.guild.id][msg.author.id][emojilist[i].id]) emojiUsed[msg.guild.id][msg.author.id][emojilist[i].id] = 0;
        if(!emojiUsed[msg.guild.id]["0"][emojilist[i].id]) emojiUsed[msg.guild.id]["0"][emojilist[i].id] = 0;
        emojiUsed[msg.guild.id][msg.author.id][emojilist[i].id]++;
        emojiUsed[msg.guild.id]["0"][emojilist[i].id]++;
        utils.saveFile("emoji", emojiUsed);
      }
    }
    
};

const messagedeleted = (msg) => {
    if(Date.now() - msg.createdTimestamp  < 60000){
        if(msg.author.bot) return;
        if(!preferencies[msg.author.id]){
            if(client.guilds.find("id", "434283741775396864").emojis.exists("name", msg.content.toLowerCase())){
                return;
            }
        }
        if(msg.content == "$$") return;
        var mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        var temp = mois.join(".").toLowerCase().split(".");
        if(temp.indexOf(msg.content.toLowerCase()) != -1)  return;
        var embed = new RichEmbed();
        embed.setAuthor(utils.getNickname(msg, msg.author.id, msg.guild), msg.author.avatarURL);
        embed.setTitle(msg.guild.name + " dans le salon " +   msg.channel.name)
        embed.setColor(msg.guild.members.find("id", msg.author.id).displayHexColor);
        embed.addField((Date.now() - msg.createdTimestamp)/1000  + ' secondes' , msg.content)
        
        client.guilds.find("id", "434283741775396864").channels.find("id", "449660541582180374").send(embed)
        var mentionné = "";
        var fetch = ["<@", "<@!", "<@&"]
        //Cette boucle détècte si il y a des utilisateurs mentionnées et l'ajoute au RichEmbed
        for(var j = 0; j<fetch.length; j++){
            if(msg.content.split(fetch[j])[1]){
                if(msg.content.split(fetch[j])[1].split(">")[0]){
                    if (msg.guild.members.find("id", msg.content.split(fetch[j])[1].split(">")[0])){
                      var i = 1 
                      while(msg.content.split(fetch[j])[i]){
                        
                        if (msg.guild.members.find("id", msg.content.split(fetch[j])[i].split(">")[0])){
                            if(i ==2) mentionné += msg.guild.roles.find("id", msg.content.split(fetch[j])[1].split(">")[0]).name + " ,";
                            else mentionné += utils.getNickname(msg, msg.content.split(fetch[j])[i].split(">")[0], msg.guild) + " ,";
                        }
                        i++;
                      }
                      
                    } 
                  }
            }
        }
         if (msg.content.indexOf("@everyone") > -1){
          mentionné += "everyone";
        }
        if(mentionné.length != 0){
            var embed = new RichEmbed();
            embed.setAuthor(utils.getNickname(msg, msg.author.id, msg.guild), msg.author.avatarURL);
            embed.setColor(msg.guild.members.find("id", msg.author.id).displayHexColor);
            embed.addField((Date.now() - msg.createdTimestamp)/1000  + ' secondes. Trop Rapide!' , "A supprimé un message mentionnant " + mentionné)
            msg.channel.send(embed)
        }

    }
};

const messageupdate = (old, msg) => {
    if(msg.author.id == "189116981822226433" && msg.content.toLowerCase().indexOf("bez") > -1){
        msg.reply("nous aussi on t'aime")
    }
}
const join = (GuildMember) => {
    
   /* if(!GuildMember.guild.available) return;
    console.log(GuildMember)
    if(GuildMember.guild.id != "230405441845329930") return;
    GuildMember.guild.channels.get("464387069670850560").send(utils.getNickname(null, GuildMember.id, GuildMember.guild) + " A rejoint le serveur!") */
}
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.guilds.find("id", "434283741775396864").channels.find("id", "446235430879494144").send(`Logged in as ${client.user.tag}!`)
    const activity = activities[Math.floor(Math.random() * activities.length)];
	client.user.setActivity(activity.text, { type: activity.type });
    client.setInterval(() => {
		const activity = activities[Math.floor(Math.random() * activities.length)];
		client.user.setActivity(activity.text, { type: activity.type });
	}, 120000);
    
    //stalk part 1 : nombre d'utilisateurs connectés par heure
    client.setInterval(() => {
        var date = new Date();  
        var online = client.users.filter(user => user.presence.status != "offline");
        connected[date.getUTCFullYear() +  "/" + date.getUTCMonth() + "/" + date.getUTCDay() + "/" + date.getUTCHours() + "/" + date.getUTCMinutes()] = online.array().length;
        utils.saveFile("connected", connected);
    }, 3600000)
});
client.on('guildMemberAdd', join)
client.on('message', run);
client.on('error',console.error);
client.on('messageUpdate', messageupdate)
client.on("messageDelete", messagedeleted);
client.login(config.token);