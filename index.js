const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
const { QueryType } = require('discord-player');
var pathToFfmpeg = require('ffmpeg-static');
let botname = "CrBot"

bot.on("ready", async() => {
    console.log(`${bot.user.username} sikeresn elindult!`)

    let státuszok = [
        `${bot.guilds.cache.size}  szerver`,
        "Prefix: cr.",
        "Clash Royal",
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
 
  

module.exports = {
    name: 'play',
    aliases: ['p'],
    utilisation: '{prefix}play [zene neve/linkje]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Mérlek adj meg egy érvényes keresést ${message.author}... Próbáld újra❌`);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`Nincs találat ${message.author}... Próbáld újra❌`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.channel.send(`Nem vagy hangcsatornában ${message.author}...  ❌`);
        }

        await message.channel.send(`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};  

module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`Nincs zend${message.author}...❌`);

        const success = queue.setPaused(true);

        return message.channel.send(success ? `Jelenlegi zene megállítva ${queue.current.title}  ✅` : `Hiba történt ${message.author}... Kérlek próbáld újra ❌`);
    },
};

module.exports = {
    name: 'skip',
    aliases: ['sk'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Nincs zene ❌`);

        const success = queue.skip();

        return message.channel.send(success ? `Zene: ${queue.current.title} átugorva ✅`);
    },
};
    
})
bot.login(process.env.TOKEN)
