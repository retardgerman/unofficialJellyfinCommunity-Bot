import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('awesome-jellyfin')
		.setDescription('Awesome Jellyfin resources'),
	async execute(interaction) {
		await interaction.reply("✨ Awesome Jellyfin - Curated themes, plugins and more for Jellyfin: https://github.com/awesome-jellyfin/awesome-jellyfin");
	},
};