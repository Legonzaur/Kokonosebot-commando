const { RichEmbed } = require('discord.js');
const fs = require("fs");

function getNickname(msg, userId, guild) {
  if(!guild){
    var guild = msg.guild;
  }
  if(guild.members.get(userId).nickname){
    var nickname = guild.members.get(userId).nickname
    }else{
    var nickname = guild.members.get(userId).user.username
    }
  return nickname
    
}
module.exports = {
  createJsonFile: function (fileName) {
      try{
        return file = require("../assets/db/"+fileName);

      }catch (err){
        
        console.log(err)
        fs.appendFile("../assets/db/" + fileName, '{}', function (err) {
          if (err) throw err;
          console.log('Saved!');  
        });
      }
      
    },
  getNickname: getNickname
        
    ,
  postCustomEmoji : function (msg, author, emoji, client, modify){
    console.log(modify)
      msg.delete().then(function(){
        client.guilds.find("id", "434283741775396864").emojis.find("name", emoji);
        var embed = new RichEmbed();
        embed.setTitle(msg.content)
        embed.setAuthor(getNickname(msg, author.id), author.displayAvatarURL);
        embed.setColor(msg.guild.members.find("id", author.id).displayHexColor)
        embed.setImage(client.guilds.find("id", "434283741775396864").emojis.find("name", emoji.toLowerCase()).url)
        msg.channel.send(embed).then(function(){
          })
      })
    },
    saveFile : function(fileName, file){
      if(!file) file = {}
      fs.writeFile( __dirname + "/../assets/db/" + fileName +".json", JSON.stringify(file), function(err) {
        if (err) return console.log(err);
      });
      }
      ,
      daysInMonth : function(year, month){
          return new Date(year, month, 0).getDate();
      }
  };
  