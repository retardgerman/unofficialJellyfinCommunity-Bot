import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Client, Collection, GatewayIntentBits, REST, Routes } from 'discord.js';


// __dirname für ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;


const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();


const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const commandModule = await import(`./commands/${file}`);
	const command = commandModule.default;
	client.commands.set(command.data.name, command);
	commands.push(command.data.toJSON());
}

// Register slash commands on startup
const rest = new REST({ version: '10' }).setToken(TOKEN);

client.once('ready', async() => {
	console.log(`Bot is online as ${client.user.tag}`);

	try {
		console.log('Registering slash commands...');
		await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands }
		);
		console.log('Slash commands registered!');
	} catch (error) {
		console.error('Error registering commands:', error);
	}
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const hasPiracy = hasPiracyKeywords(message.content);
  if (hasPiracy) {
    const command = client.commands.get("piracy");
    if (command) {
      command.run(message);
    }
  }
});

function hasPiracyKeywords(text) {
  const lowerText = text.trim().toLowerCase();
  const piracyKeywords = [
    "1fichier", "123movies", "1337x", "all-debrid", "alldebrid", "anonfiles",
    "aria2", "bayfiles", "bdrip", "bluray rip", "camrip", "codex", "crack", "cracked",
    "crackingpatching", "crackle", "cyberlocker", "ddl", "deluge", "direct download",
    "dood.so", "dood.watch", "doodstream", "dvdrip", "easybytez", "eztvx", "fake release",
    "filecrypt", "fitgirl", "flixtor", "flixhq", "fmovies", "free movies online", "gofile",
    "gogoanime", "gomovies", "hd cam", "igg-games", "indexer", "irc release",
    "jdownloader", "katcr", "keygen", "kickass.to", "kickasstorrents", "leech",
    "lookmovie", "mediafire", "mega link", "monova", "moviesjoy", "myflixer",
    "no ads streaming", "no sign up streaming", "nzb", "nzb indexer", "openload",
    "p2p", "peerflix", "popcorn time", "primewire", "projectfreetv", "prostylex",
    "putlocker", "qbittorrent", "r/CrackWatch", "r/GenP", "r/jellyfinshare", "r/jellyfinshared",
    "r/megalinks", "r/megathread", "r/piracy", "rarbg", "rapidgator", "real-debrid",
    "repack", "scene group", "scene release", "seed", "seedbox", "skidrow", "soap2day",
    "solarmovie", "soundseek", "streamango", "streamcloud", "streaming site",
    "streamsb", "streamtape", "streamwish", "superbits", "telecine", "telesync",
    "the pirate bay", "torlock", "torrent", "torrentdownloads", "torrentfunk", "torrentgalaxy",
    "torrenthound", "torrentleech", "torrentproject", "torrentz", "torrentz2", "tpb",
    "transmission", "uploadgig", "uptobox", "utorrent", "vidcloud", "vidcloud9", "videobin",
    "vidlox", "warez", "watchseries", "yesmovies", "yify", "yts.mx", "zippyshare"
  ];

  return piracyKeywords.some(keyword => lowerText.includes(keyword));
}

client.login(TOKEN);