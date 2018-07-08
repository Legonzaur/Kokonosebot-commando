const { Command } = require('discord.js-commando');
const utils = require("../../fonctions/utils.js");
var preferencies =  utils.createJsonFile("preferencies.json")

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'off',
            group: 'emoji',
            memberName: 'off',
            description: 'Désactive les emoji custom',
            examples: ['*off*'],
            clientPermissions: ['MANAGE_MESSAGES'],
        });
    }

    async run(msg) {
        preferencies[msg.author.id] = true;
        await utils.saveFile("preferencies", preferencies);
        msg.delete()
    }
};