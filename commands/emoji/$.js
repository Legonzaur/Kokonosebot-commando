const { Command } = require('discord.js-commando');
const utils = require("../../fonctions/utils.js");
const { MessageCollector, RichEmbed } = require('discord.js');


module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: '$',
            group: 'emoji',
            memberName: '$',
            description: 'Fournit la liste des emoji custom',
            examples: ['*$*'],
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
        });
    }

    run(msg) {
        msg.delete()
        
        var embed = new RichEmbed({
            title : "Liste des emoji",
            });
        embed.setColor(msg.guild.members.find("id", msg.author.id).displayHexColor);
        var customEmoji =  this.client.guilds.find("id", "434283741775396864").emojis.array()
        for(var i = 0; i< customEmoji.length; i+=2){
          var table = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:", ":keycap_ten:", ":regional_indicator_a:", ":regional_indicator_b:", ":regional_indicator_c:", ":regional_indicator_d:", ":regional_indicator_e:", ":regional_indicator_f:", ":regional_indicator_g:", ":regional_indicator_h:", ":regional_indicator_i:", ":regional_indicator_j:", ":regional_indicator_k:", ":regional_indicator_l:", ":regional_indicator_m:", ":regional_indicator_n:",":regional_indicator_o:",":regional_indicator_p:",":regional_indicator_q:",":regional_indicator_r:",":regional_indicator_s:",":regional_indicator_t:",":regional_indicator_u:",":regional_indicator_v:",":regional_indicator_w:",":regional_indicator_x:",":regional_indicator_y:",":regional_indicator_z:"]
          if(!customEmoji[i+1]){
            var second = ""
            var secondname = ""
            table[i+1] = ""
            }else{
            secondname = customEmoji[i+1].name
           second = customEmoji[i+1]
            }
            embed.addField(table[i] + " : " + customEmoji[i] +customEmoji[i].name, table[i+1] + " : " + second + secondname)
             }
        msg.channel.send(embed).then(message =>{
            
             for(var i  = 0; i<20; i++){
                message.react(customEmoji[i]).catch(e => {e})
            }
            
                
            var filter = (reaction, user) => user.id === msg.author.id;
            var collectorReaction = message.createReactionCollector(filter, { time: 25000 });
            collectorReaction.on('collect', r => {
                utils.postCustomEmoji(message, msg.author, r.emoji.name, this.client, true);
                collectorMessage.stop();
                collectorReaction.stop();
            
            });
            var collectorMessage = new MessageCollector(msg.channel, m => m.author.id == msg.author.id, { time: 25000 })
            collectorMessage.on('collect', mesg => {
                var letters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", 'v', 'w', 'x', 'y', 'z'];
                    if(letters.indexOf(mesg.content.toLowerCase()) != -1){
                        message.delete()
                        if(customEmoji[letters.indexOf(mesg.content.toLowerCase())]){
                          utils.postCustomEmoji(mesg, msg.author, customEmoji[letters.indexOf(mesg.content.toLowerCase())].name, this.client, true);
                          collectorMessage.stop();
                          collectorReaction.stop();
                          
                        } 
                     }
                })
            message.delete(25000).catch(e => {e})
        
            })
      
        }
};