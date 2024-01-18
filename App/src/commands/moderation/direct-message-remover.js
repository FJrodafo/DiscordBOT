const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('direct-message-remover')
        .setDescription('🧹 Delete a specific direct message sent by the bot by its ID.')
        .setDefaultMemberPermissions(0)
        .addStringOption(option =>
            option
                .setName('message_id')
                .setDescription('Message ID to delete')
                .setRequired(true),
        ),
    async execute(interaction) {
        try {
            const messageId = interaction.options.getString('message_id');
            const channel = await interaction.user.createDM();
            const message = await channel.messages.fetch(messageId);

            if (message && message.author.id === interaction.client.user.id) {
                await message.delete();
                interaction.reply({ content: 'The message was successfully deleted.', ephemeral: true });
            }
            else {
                interaction.reply({ content: 'Message not found or cannot be deleted.', ephemeral: true });
            }
        }
        catch (error) {
            console.error(error);
            interaction.reply({ content: 'An error occurred while trying to delete the message.', ephemeral: true });
        }
    },
};
