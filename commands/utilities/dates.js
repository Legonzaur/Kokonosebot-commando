const { Command } = require('discord.js-commando');
const utils = require("../../fonctions/utils.js");
const { MessageCollector, RichEmbed } = require('discord.js');
var events =  utils.createJsonFile("events.json");
var Jimp = require("jimp");

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dates',
            aliases: ['date', 'calendrier', 'calendar', 'anniversaires'],
            group: 'utilities',
            memberName: 'dates',
            description: 'Affiche les dates importantes du serveur WIP',
            examples: ['*dates*'],
            clientPermissions: ['SEND_MESSAGES'],
            args: [
                {
                    key: 'month',
                    prompt: 'quel mois?',
                    type: 'string',
                    default : new Date().getMonth()
                }
            ]
        });
    }

    async run(msg, {month}, author) {
        var mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        var temp = mois.join(".").toLowerCase().split(".");
        
        if(typeof(month) == "string"){
            month = temp.indexOf(month.toLowerCase());
            if(month == -1){
                month = new Date().getMonth();
                msg.reply("Mois non recconu")
            }
        } 
        if(!author){
            var text = "Vous pouvez envoyer le nom du mois pour y accéder directement \n";
            var author = msg.author;
        } 
        
        var emojisred = ["<:0red:467334338116059136>","<:1red:467334338049081354>","<:2red:467334338527100949>","<:3red:467334338938142721>","<:4red:467334339298983957>","<:5red:467334339949101098>","<:6red:467334342524534794>","<:7red:467334342759153664>","<:8red:467334342637649931>","<:9red:467334343736688650>","<:10red:467334343908393006>","<:11red:467323496477753354>","<:12red:467323498059137024>","<:13red:467323497425928193>","<:14red:467323498516185099>","<:15red:467323498512252929>","<:16red:467323499460165642>","<:17red:467323499887853578>","<:18red:467323502387527680>","<:19red:467323502408630292>","<:20red:467316997429002240>","<:21red:467316998271926282>","<:22red:467316999245004811>","<:23red:467316999496663041>","<:24red:467317000280997891>","<:25red:467317001258401793>","<:26red:467315218607767553>","<:27red:467315218876203018>","<:28red:467315219841155073>","<:29red:467315222953328640>","<:30red:467315223775281172>","<:31red:467315223972544522>"]
        var emojisgreen = [0,1, "<:2green:467382094100692993>", "<:3green:467382094440562708>", "<:4green:467382094918582292>"]
        var emojis = [":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:", "🔟","<:11:467301424322183168>","<:12:467301453715865630>","<:13:467301454944665601>","<:14:467301463601709056>","<:15:467301475744219137>","<:16:467301469033332736>","<:17:467301473223573504>","<:18:467301473550729228>","<:19:467301472053493760>","<:20:467301476470095902>","<:21:467301478399475712>","<:22:467301476809572353>","<:23:467301476616765441>","<:24:467301474230337536>","<:25:467301476901978123>","<:26:467301475731898369>","<:27:467301476461576202>","<:28:467301479670349826>","<:29:467301479800373269>","<:30:467301480270135306>","<:31:467301480098037770>"]
        var options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        var date = new Date();
        var currentmonth = month;
        if(currentmonth%12 < 0) currentmonth = (currentmonth%12)+12;
        var firstDay = new Date(date.getFullYear(), currentmonth, 1);
        var row = ""
        if(!text) var text = ""
        //ETAPE 1
        //Affiche les jours du mois passé avec des nombres rouges
        for(var i = 0; i<firstDay.getDate(); i++){
            row += emojisred[(utils.daysInMonth(date.getFullYear(), currentmonth)-firstDay.getDate())+i+1] + " ";
        }
        //affiche les jours du mois présent sur la même ligne
        for(var i = 0; i<7-firstDay.getDate(); i++){
            if(events[currentmonth+1]){
                if(events[currentmonth+1][i+1]){
                    
                    if(Object.keys(events[currentmonth+1][i+1]).length == 1){
                            
                        if(events[currentmonth+1][i+1][Object.keys(events[currentmonth+1][i+1])[0]] == "Anniversaire!"){
                            var userCible = this.client.users.get(Object.keys(events[currentmonth+1][i+1])[0]); 
                            var id = userCible.id;
                            
                            if(!this.client.guilds.get("467377627007811594").emojis.find("name",id)){
                                
                                var guild = this.client.guilds.get("467377627007811594");
                                var image = await Jimp.read(userCible.displayAvatarURL);
                                if(!compteur) var compteur = 0;
                                compteur++;
                                if(!bd) var bd = {};
                                bd[compteur] = id;
                                    
                                var data = await image.resize(64, 64).quality(60);
                                    data.getBuffer(Jimp.MIME_PNG, (err, png) => {
                                        var face = guild.createEmoji(png, bd[compteur]).then(() => {
                                            row += `<:${face.name}:${face.id}> `;
                                        })
                                        return png;
                                    });
                                
                            } else {
                                var face = this.client.guilds.get("467377627007811594").emojis.find("name",id)
                                row += `<:${face.name}:${face.id}> `;
                            }
        
                        }
                    }else if(Object.keys(events[currentmonth+1][i+1]).length > 1){
                        row += emojisgreen[Object.keys(events[currentmonth+1][i+1]).length] + " ";
                    } 
                }else {
                    row += emojis[i] + " ";
                }
            }else {
                row += emojis[i] + " ";
            }
            
           
        }
        //ETAPE 2
        var progress = i;
        var overflow = 1;
        
        text += mois[currentmonth] + " " + firstDay.getFullYear() + " " + "\n\n";
        text += "🇱 🇲 🇲 🇯 🇻 🇸 🇩 \n \n";
        text += row + "\n";
        while(progress<utils.daysInMonth(date.getFullYear(), currentmonth+1)){
            row = "";
            var row2 = "";
            for(var i = 1; i<8; i++){
                if(progress+1 == date.getDate() && currentmonth == date.getMonth()){
                    row += emojisred[progress+1] + " ";
                    progress++;
                    
                }else if(events[currentmonth+1] && events[currentmonth+1][progress+1]){
                    //if(events[currentmonth+1][progress]){
                        if(Object.keys(events[currentmonth+1][progress+1]).length == 1){
                            
                            if(events[currentmonth+1][progress+1][Object.keys(events[currentmonth+1][progress+1])[0]] == "Anniversaire!"){
                                var userCible = this.client.users.get(Object.keys(events[currentmonth+1][progress+1])[0]); 
                                var id = userCible.id;
                                
                                if(!this.client.guilds.get("467377627007811594").emojis.find("name",id)){
                                    
                                    var guild = this.client.guilds.get("467377627007811594");
                                    var image = await Jimp.read(userCible.displayAvatarURL);
                                    if(!compteur) var compteur = 0;
                                    compteur++;
                                    if(!bd) var bd = {};
                                    bd[compteur] = id;
                                        
                                    var data = await image.resize(64, 64).quality(60);
                                        data.getBuffer(Jimp.MIME_PNG, (err, png) => {
                                            var face = guild.createEmoji(png, bd[compteur]).then(() => {
                                                row += `<:${face.name}:${face.id}> `;
                                            })
                                            return png;
                                        });
                                    
                                } else {
                                    var face = this.client.guilds.get("467377627007811594").emojis.find("name",id)
                                    row += `<:${face.name}:${face.id}> `;
                                }

                            }
                        }else if(Object.keys(events[currentmonth+1][progress+1]).length > 1){
                            row += emojisgreen[Object.keys(events[currentmonth+1][progress+1]).length] + " ";
                        }
                    // }
                    progress++
                } else if(emojis[progress] && progress<utils.daysInMonth(date.getFullYear(), currentmonth+1)){
                    row += emojis[progress] + " ";
                    progress++;
                } else {
                    row += emojisred[overflow] + " ";
                    overflow++;
                }
                
            }
            text += row + "\n";
        }
        //FINI
        if(msg.author.bot) var message = await msg.edit(text)
        else var message = await msg.channel.send(text);
        message.react("◀");
        // message.react("⏪");
        // message.react("⏮");
        // message.react("⏭");
        // message.react("⏩");
        message.react("▶");

        var filter = (reaction, user) => user.id == author.id;
        var collectorReaction = message.createReactionCollector(filter, { time: 25000 });
            collectorReaction.on('collect', r => {
                if(r.emoji.name == "◀"){
                    this.run(message, {month : currentmonth-1}, author);
                    collectorReaction.stop();
                }else if(r.emoji.name == "▶"){
                    this.run(message, {month : currentmonth+1}, author);
                    collectorReaction.stop();
                }else if(r.emoji.name == "⏪"){
                    this.run(message, {month : currentmonth-3}, author);
                    collectorReaction.stop();
                }else if(r.emoji.name == "⏩"){
                    this.run(message, {month : currentmonth+3}, author);
                    collectorReaction.stop();
                }else if(r.emoji.name == "⏭"){
                    this.run(message, {month : currentmonth+12}, author);
                    collectorReaction.stop();
                }else if(r.emoji.name == "⏮"){
                    this.run(message, {month : currentmonth-12}, author);
                    collectorReaction.stop();
                }
            });
        collectorReaction.on('end', reason => {
            message.clearReactions();
            collectorMessage.stop();
        });
        var collectorMessage = new MessageCollector(msg.channel, m => m.author.id == author.id, { time: 25000 })
            collectorMessage.on('collect', mesg => {
                var temp = mois.join(".").toLowerCase().split(".")
                if(temp.indexOf(mesg.content) >-1 ){
                    this.run(message, {month : temp.indexOf(mesg.content)}, author);
                    mesg.delete()
                    collectorMessage.stop();
                    collectorReaction.stop();
                }
                
                });
    }
};