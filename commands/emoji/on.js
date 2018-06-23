const { Command } = require('discord.js-commando');
const utils = require("../../fonctions/utils.js");
var preferencies =  utils.createJsonFile("preferencies.json")

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'on',
            group: 'emoji',
            memberName: 'on',
            description: 'Réactive les emoji custom',
            examples: ['*on*'],
            clientPermissions: ['MANAGE_MESSAGES'],
        });
    }

    async run(msg) {
        preferencies[msg.author.id] = false;
        await utils.saveFile("preferencies", preferencies);
        msg.delete()
    }
};