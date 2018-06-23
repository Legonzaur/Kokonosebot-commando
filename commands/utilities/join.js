const { Command } = require('discord.js-commando');
const utils = require("../../fonctions/utils.js");
var preferencies =  utils.createJsonFile("preferencies.json")

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'emoji',
            memberName: 'join',
            description: 'Fait rejoindre le bot le salon vocal dans lequel vous êtes. WIP',
            examples: ['*join*'],
            guildOnly: true,
            args: [
                {
                    key: 'Salon vocal',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string'
                }
            ],
            clientPermissions: ['CONNECT', 'SPEAK', 'USE_VAD'],
        });
    }

    async run(msg) {
       
    }
}
