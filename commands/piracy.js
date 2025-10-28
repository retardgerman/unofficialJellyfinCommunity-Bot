import { SlashCommandBuilder } from 'discord.js';


export default {
	data: new SlashCommandBuilder()
		.setName('piracy')
		.setDescription('Policy on piracy discussions.'),
	async execute(interaction) {
		await interaction.reply("🏴‍☠️ Discussions or content related to piracy or content acquisition are prohibited in this community. This rule exists to maintain a safe and respectful environment for all members, prevent legal issues or witch hunts, and protect the community’s integrity, credibility, and long-term stability");
	},
};
