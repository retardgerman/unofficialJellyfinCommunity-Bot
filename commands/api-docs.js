import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('api-docs')
		.setDescription('Official Jellyfin documentation'),
	async execute(interaction) {
		await interaction.reply("📖🔌 Official Jellyfin API Documentation: https://api.jellyfin.org/\n\n📖👤 Your Installation's API Documentation: [YOUR_JELLYFIN_URL]/api-docs/swagger/index.html");
	},
};
