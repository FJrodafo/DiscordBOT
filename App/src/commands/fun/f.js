const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('f')
        .setDescription('Press F to pay respect.'),
    async execute(interaction) {
        const message = await interaction.reply({ content: 'Press F to pay respect.', fetchReply: true });
        message.react('🇫');
    },
};
