import { SlashCommandBuilder } from 'discord.js';


export default {
	data: new SlashCommandBuilder()
		.setName('piracy')
		.setDescription('Policy on piracy discussions.'),
	async execute(interaction) {
		await interaction.reply("🏴‍☠️ Discussions related to piracy or content acquisition are strictly prohibited on this server. This rule exists to ensure we avoid legal trouble and protect the future of this project, as well as its reputation.");
	},
};