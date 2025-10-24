import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('docs')
		.setDescription('Official Jellyfin documentation'),
	async execute(interaction) {
		await interaction.reply("📖🔌 Official Jellyfin API Documentation: https://api.jellyfin.org/");
	},
};