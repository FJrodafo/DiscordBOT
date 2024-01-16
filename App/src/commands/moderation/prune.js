const { SlashCommandBuilder } = require('discord.js');

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

/*
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prune')
        .setDescription('Prune specific messages by their IDs.')
        .setDefaultMemberPermissions(0)
        .addStringOption(option => option.setName('message_ids').setDescription('IDs of messages to prune').setRequired(true)),
    async execute(interaction) {
        const messageIds = interaction.options.getString('message_ids').split(/[\s,]+/);

        // Obtener el canal de DM del usuario
        const channel = await interaction.user.createDM();

        try {
            for (const messageId of messageIds) {
                const message = await channel.messages.fetch(messageId).catch(console.error);
                if (message) {
                    await message.delete();
                } else {
                    console.log(`Message with ID ${messageId} not found.`);
                }
            }

            interaction.reply({ content: `Successfully pruned ${messageIds.length} messages.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error trying to prune messages.', ephemeral: true });
        }
    },
};
*/
