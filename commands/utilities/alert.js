const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'alert',
            group: 'utilities',
            memberName: 'alert',
            description: 'Alerts you when you need it',
            examples: ['?'],
            clientPermissions: ['ADD_REACTIONS'],
        });
    }

    
    async run(msg) {
        var step0 = () => {
            var embed = new Discord.RichEmbed();

            embed.setAuthor("30")
            embed.setColor(msg.guild.members.find("id", msg.author.id).displayHexColor);
        
            embed.setTitle("Sur quoi voulez vous être alerté?");

            embed.addField(":one:","La connection d'un utilisateur");
            embed.addField(":two:","Lors qu'un utilisateur écrit une phrase ou un mot particulier");
            var reaction_numbers = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]
            msg.say(embed).then((message) => {
                message.react(reaction_numbers[1]);
                message.react(reaction_numbers[2]);
                var filter = (reaction, user) => user.id === msg.author.id;
                var collectorReaction = message.createReactionCollector(filter, { time: 30000 });
                var interval = this.client.setInterval(() => {
                    var embed = new Discord.RichEmbed();var nickname = msg.guild.members.find("id", msg.author.id).nickname;if(!nickname) nickname = msg.author.username;embed.setAuthor(Number(30-Math.floor(interval._idleStart/1000)));embed.setColor(msg.guild.members.find("id", msg.author.id).displayHexColor);embed.setTitle("Sur quoi voulez vous être alerté?");embed.addField(":one:","La connection d'un utilisateur");embed.addField(":two:","Lors qu'un utilisateur écrit une phrase ou un mot particulier");
                    message.edit(embed)
                }, 2000);
                collectorReaction.on('collect', r => {
                    step1(r.emoji.name, message);
                    collectorReaction.stop()
                });
                collectorReaction.on('end', (r,c) => {
                    if(c == "time") message.delete()
                    clearInterval(interval)
                });
            })
            
        }
        var step1 = (choice, message) => {
            console.log("oui")
            var embed = new Discord.RichEmbed();
            embed.setColor(msg.guild.members.find("id", msg.author.id).displayHexColor);
            if (choice == "1"){
                embed.setTitle("Votre commande est ?");

                embed.addField("","$");
                var reaction_numbers = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]
                msg.say(embed).then((message) => {
                    message.react(reaction_numbers[1]);
                    message.react(reaction_numbers[2]);
                    var filter = (reaction, user) => user.id === msg.author.id;
                    var collectorReaction1 = message.createReactionCollector(filter, { time: 30000 });
                    var interval1 = this.client.setInterval(() => {
                        var embed = new Discord.RichEmbed();embed.setTitle("Votre commande est ?");embed.addField("","$");
                        console.log("ha")
                        message.edit(embed)
                    }, 2000);
                    collectorReaction1.on('collect', r => {
                        step1(r.emoji.name, message);
                        collectorReaction.stop()
                    });
                    collectorReaction1.on('end', (r,c) => {
                        if(c == "time") message.delete()
                        clearInterval(interval1)
                        console.log(c)
                    });
                });
            } else if (choice ==" 2"){

            }
            
        }
        step0()
        //const message = await msg.say(embed);
        //return message.edit(embed);
    }
};