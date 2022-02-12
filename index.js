const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
const { QueryType } = require('discord-player');
var pathToFfmpeg = require('ffmpeg-static');

let botname = "Redstone Music Bot"

bot.on("ready", async() => {
    console.log(`${bot.user.username} sikeresn elindult!`)

    let státuszok = [
        `${bot.guilds.cache.size}  szerver`,
        "Prefix: ?.",
        "Youtube",
        "Fejlesztő: Ádám"
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
    }, 5000)
})


bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;

    
        

 if(cmd === `${prefix}help`){
    message.channel.send("Parancsok : Hamarosan..., Készítő: Ádám#9999 , A bot hostingja: https://dashboard.heroku.com/apps , ");
}
 

})

bot.on("message", async (message) => {
    let prefix = "!"
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "play"){
        if(!message.member.voice.channel) return message.reply("Te nem vagy bent egy voice csatornában sem!")
        if(message.guild.me.voice.channel && message.member.voice.channel.id !==  message.guild.me.voice.channel.id) return message.reply("Te nem vagy velem egy voice csatornában!")
        if(!args[0]) return message.reply("Kérlek adj meg egy URL-t vagy egy zene címét!")

        bot.player.play(message, args.join(" "), {firstResult: true});
    }
    if(command === "queue"){
        if(!message.member.voice.channel) return message.reply("Te nem vagy bent egy voice csatornában sem!")
        if(message.guild.me.voice.channel && message.member.voice.channel.id !==  message.guild.me.voice.channel.id) return message.reply("Te nem vagy velem egy voice csatornában!")

        const queue = bot.player.getQueue(message);

        if(!bot.player.getQueue(message)) return message.reply("A várólistán nem szerepel semmi!")

        message.channel.send(`**Várólista - ${message.guild.name}\nJelenleg ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
            return `**#${i + 1}** - ${track.title} | ${track.author} (A zenét kérte: ${track.requestedBy.username})`

        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `és még **${queue.tracks.length - 5}db zene...` : `A lejátszási listában: **${queue.tracks.length}db zene van.`}`
         ));
    }

})

bot.login(process.env.TOKEN)
