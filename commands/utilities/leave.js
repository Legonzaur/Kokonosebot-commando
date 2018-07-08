const { Command } = require('discord.js-commando');
const utils = require("../../fonctions/utils.js");
var preferencies =  utils.createJsonFile("preferencies.json")

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'utilities',
            memberName: 'leave',
            description: 'Déconnecte le bot du salon vocal',
            examples: ['*leave*'],
            clientPermissions: ['CONNECT', 'SPEAK', 'USE_VAD'],
        });
    }

    async run(msg) {
        console.log(msg.guild.members.find("id", this.client.user.id).voiceChannel.name)
        msg.guild.members.find("id", this.client.user.id).voiceChannel.leave()
        msg.reply("Je suis parti!")
    }
};