const { Command } = require('discord.js-commando');
const utils = require("../../fonctions/utils.js");

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            group: 'utilities',
            memberName: 'clear',
            description: 'clear des messages dans un salon',
            examples: ['*clear 8*', '*clear 11 @Legonzaur#2100*'],
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
            args: [
                {
                    key: 'nombre',
                    prompt: 'Combien de messages?',
                    type: 'integer'
                },
                {
                    key: 'user',
                    prompt: 'De quel utilsateur voulez vous supprimer les messages?',
                    type: 'user',
                    default : "0"
                }
            ],

        });
    }
    hasPermission(msg){
        return msg.member.hasPermission('MANAGE_MESSAGES', false, true, true);
    }

    async run(msg, {user, nombre}) {
        msg.channel.fetchMessages({ limit : nombre+1})
        .then(messages => {
            for(var i = 0; i<nombre; i++){
                messages.array()[i].delete()
            }
        })
    }
};