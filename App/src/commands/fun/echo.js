const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your text!')
        .addStringOption(option => option
            .setName('text')
            .setDescription('Type your message')
            .setRequired(true),
        ),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        await interaction.reply({ content: `${text}` });
    },
};
