const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const utils = require("../../fonctions/utils.js");
var emojiUsed =  utils.createJsonFile("emoji.json")

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'emoji',
            group: 'emoji',
            memberName: 'emoji',
            description: 'Liste les emojis utilisés dans le serveur',
            examples: ['*emoji*', '*emoji @Legonzaur#2100*'],
            args: [
                {
                    key: 'user',
                    prompt: 'De quel utilisateur voulez vous voir le score?',
                    type: 'user',
                    default:{
                        id : 0
                    }
                }
            ]
        });
    }

    run(msg, user) {
        var embed = new RichEmbed();
        var request = emojiUsed[msg.guild.id][user.user.id];
        if(user.user.id == 0){
            var nickname = msg.guild.name;
            var avatarURL = msg.guild.iconURL;
            embed.setColor([199, 184, 2]);
        }
        else if(user.user.id != 0){
            var nickname = utils.getNickname(msg, user.user.id);
            var avatarURL = msg.author.displayAvatarURL;
            embed.setColor(msg.guild.members.find("id", user.user.id).displayHexColor);
        }
        if(request){
            if(!Object.keys(request).length == 0 && request.constructor === Object){
                var emojiSorted = Object.keys(request).sort(function(a,b){return request[b]-request[a]});
                
                
                embed.setTitle(Object.values(request).reduce((a, b) => a + b) + " Emoji used")
                
                embed.setAuthor(nickname, avatarURL);
                for(var i = 0; i<8; i++){
                  if(emojiSorted[i]){
                    if(msg.guild.emojis.find("id", emojiSorted[i]))embed.addField("\u200b", `<:${msg.guild.emojis.find("id", emojiSorted[i]).name}:${emojiSorted[i]}>  :  ${request[emojiSorted[i]]}`);
                  } 
                }
                msg.channel.send(embed);
                return null;
              }
        }else{
            msg.channel.send("Aucune donnée pour cette entrée").then(function(){
              
              return null;
            }
              
            );
        }
        
    }
};