const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('🏓 Replies with Pong!'),
    async execute(interaction) {
        // const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const sent = await interaction.reply({ content: 'pinging...', fetchReply: true });
        // interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
        interaction.editReply(`:ping_pong: pong **${sent.createdTimestamp - interaction.createdTimestamp}**ms`);
        // return interaction.reply('Pong!');
    },
};
