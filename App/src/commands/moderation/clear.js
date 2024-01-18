const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('🧹 Clear up to 99 messages!')
        .setDefaultMemberPermissions(0)
        .addIntegerOption(option => option
            .setName('amount')
            .setDescription('Number of messages to clear')
            .setRequired(false),
        ),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if (amount < 1 || amount > 99) {
            return interaction.reply({ content: 'You need to input a number between 1 and 99.', ephemeral: true });
        }
        await interaction.channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            interaction.reply({ content: 'There was an error trying to clear messages in this channel!', ephemeral: true });
        });

        const embed = new EmbedBuilder()
            .setColor(0xFF005C)
            .setDescription(`🧹 Successfully cleared \`${amount}\` messages.`);
        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
