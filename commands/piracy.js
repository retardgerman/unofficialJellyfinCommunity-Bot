import { SlashCommandBuilder } from 'discord.js';


export default {
	data: new SlashCommandBuilder()
		.setName('piracy')
		.setDescription('Policy on piracy and content acquisition.'),
	async execute(interaction) {
		await interaction.reply("**:warning: Community Warning**\n\nDiscussions of piracy, content acquisition, or related activities, including tools and outlets that enable them, are prohibited. [Rule 2](https://discord.com/channels/1381737066366242896/1381738925625970758) exists in order to ensure a safe, orderly, and legally compliant community.\n\n*Note: Occasional false triggers may occur. Disregard accordingly.*");
	},
};
