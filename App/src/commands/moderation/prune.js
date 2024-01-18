const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prune')
        .setDescription('Prune a specific direct message sent by the bot by its ID.')
        .setDefaultMemberPermissions(0)
        .addStringOption(option => option.setName('message_id').setDescription('Message ID to prune').setRequired(true)),
    async execute(interaction) {
        try {
            const messageId = interaction.options.getString('message_id');
            const channel = await interaction.user.createDM();
            const message = await channel.messages.fetch(messageId);

            if (message && message.author.id === interaction.client.user.id) {
                await message.delete();
                interaction.reply({ content: 'Successfully pruned the message.', ephemeral: true });
            }
            else {
                interaction.reply({ content: 'Message not found or can\'t be deleted.', ephemeral: true });
            }
        }
        catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error trying to prune the message.', ephemeral: true });
        }
    },
};

/*
module.exports = {
    data: new SlashCommandBuilder()
        .setName('prune')
        .setDescription('Prune up to 99 messages.')
        .setDefaultMemberPermissions(0)
        .addIntegerOption(option => option.setName('amount').setDescription('Number of messages to prune')),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if (amount < 1 || amount > 99) {
            return interaction.reply({ content: 'You need to input a number between 1 and 99.', ephemeral: true });
        }
        await interaction.channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            interaction.reply({ content: 'There was an error trying to prune messages in this channel!', ephemeral: true });
        });

        return interaction.reply({ content: `Successfully pruned \`${amount}\` messages.`, ephemeral: true });
    },
};
*/
