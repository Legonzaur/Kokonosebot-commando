const { Command } = require('discord.js-commando');
const utils = require("../../fonctions/utils.js");
var events =  utils.createJsonFile("events.json");

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'birthday',
            aliases: ['anniversaire', "bd", "ann"],
            group: 'utilities',
            memberName: 'birthday',
            description: "Ajoute une date d'anniversaire dans le calendrier WIP",
            examples: ['*birthday add*', '*birthday remove*'],
            clientPermissions: ['SEND_MESSAGES'],
            args: [
                
                {
                    key: 'user',
                    prompt: 'Quel utilisateur est concerné?',
                    type: 'user',
                },
                {
                    key: 'date',
                    prompt: 'Quelle date (format JJ/MM)?',
                    type: 'string',
                },
                
                {
                    key: 'choice',
                    prompt: 'Ajouter ou Supprimer?',
                    type: 'string',
                    validate: text => {
                        if (text == "add" || text == "ajoute"|| text == "ajouter" || text == "remove" || text == "delete" || text == "rm" || text == "del" || text == "supprimer" || text == "supprime") return true;
                        return '*Ajouter* ou *supprimer*?';
                    },
                    default : "add"
                }
            ]
        });
    }

    async run(msg, { user, date, choice}) {
        var JSdate = new Date();
        if(date.split("/")[1] > 0 && date.split("/")[1] < 13 ){
            if(utils.daysInMonth(JSdate.getFullYear(), date.split("/")[1]) >= date.split("/")[0] && date.split("/")[0] > 0){
                if(choice == "add" || choice == "ajoute"|| choice == "ajouter"){
                    if(!events[Number(date.split("/")[1])]) events[Number(date.split("/")[1])] = {};
                    if(!events[Number(date.split("/")[1])][Number(date.split("/")[0])]) events[Number(date.split("/")[1])][Number(date.split("/")[0])] = {};
                    if(Object.keys(events[Number(date.split("/")[1])][Number(date.split("/")[0])]).length >= 4 ) return msg.say("Désolé, pas plus  de 4 évènements par jour sont programmables pour le moment!");
                    events[Number(date.split("/")[1])][Number(date.split("/")[0])][user.id] = "Anniversaire!";
                    utils.saveFile("events", events);
                }else{
        
                }
            } else return msg.say("Date incorrecte");
        }else return msg.say("Date incorrecte");
        
    }
};