const { Command } = require('discord.js-commando');
const utils = require("../../fonctions/utils.js");

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            group: 'utilities',
            memberName: 'clear',
            description: 'clear des messages dans un salon',
            examples: ['*clear 8*', '*clear @Legonzaur#2100*'],
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
            args: [
                {
                    key: 'team',
                    prompt: 'Quelle team voulez vous rejoindre?',
                    type: 'role'
                }
            ],
            throttling: {
                usages: 1,
                duration: 60
            },
        });
    }

    async run(msg, {team}) {
        if(team.name.toLowerCase().indexOf('team') > -1){
            var rolesUser = this.client.guilds.get(msg.guild.id).members.get(msg.author.id).roles.filterArray(role => role.name.toLowerCase().indexOf('team') > -1);
            try {
                await this.client.guilds.get(msg.guild.id).members.get(msg.author.id).removeRoles(rolesUser);
                this.client.guilds.get(msg.guild.id).members.get(msg.author.id).addRole(team);
            } catch (error) {
                if(error.message == "Missing Permissions") msg.reply("Le bot n'a pas les permissions nécessaires pour vous changer de rôle");
            }
        }else{
            msg.reply("Ce rôle n'est pas une team!")
        }
    }
};