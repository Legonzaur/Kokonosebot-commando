const { Command } = require('discord.js-commando');
const utils = require("../../fonctions/utils.js");
var preferencies =  utils.createJsonFile("preferencies.json")
const fs = require('fs');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'utilities',
            memberName: 'join',
            description: 'Fait rejoindre le bot le salon vocal dans lequel vous êtes. WIP',
            examples: ['*join*'],
            guildOnly: true,
            args: [
                {
                    key: 'voiceChannel',
                    prompt: 'Quel salon vocal voulez vous que le bot rejoigne?',
                    type: 'channel'
                    
                }
            ],
            clientPermissions: ['CONNECT', 'SPEAK', 'USE_VAD'],
        });
    }

    
    async run(msg, voiceChannel) {

        function generateOutputFile(channel, member) {
            // use IDs instead of username cause some people have stupid emojis in their name
            //const fileName = `../../recordings/${channel.id}-${member.id}-${Date.now()}.pcm`;
            const fileName = `${__dirname}/../../recordings/${channel.name}-${member.username}-${Date.now()}.pcm`;
            return fs.createWriteStream(fileName);
          }


        if(voiceChannel.voiceChannel.type == "voice"){
            const conn = await voiceChannel.voiceChannel.join();
            msg.reply("ready");
            const receiver = conn.createReceiver();

            conn.on('speaking', (user, speaking) => {
                if (speaking) {
                  msg.channel.send(`I'm listening to ${user}`);
                  // this creates a 16-bit signed PCM, stereo 48KHz PCM stream.
                  const audioStream = receiver.createPCMStream(user);
                  // create an output stream so we can dump our data in a file
                  const outputStream = generateOutputFile(voiceChannel.voiceChannel, user);
                  // pipe our audio data into the file stream
                  audioStream.pipe(outputStream);
                  outputStream.on("data", console.log);
                  // when the stream ends (the user stopped talking) tell the user
                  audioStream.on('end', () => {
                    msg.channel.send(`I'm no longer listening to ${user}`);
                  });
                }
              });
        }
        
    }
}
