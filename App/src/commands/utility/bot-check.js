const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-check')
        .setDescription('Are you a bot?')
        .addUserOption(option => option
            .setName('user')
            .setDescription('Type a user!')
            .setRequired(false),
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const embed = new EmbedBuilder()
            .setAuthor({ name: `${user.tag} botcheck ${user.bot}!`, iconURL: `${user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setColor(0xFFFFFF);
        const message = await interaction.reply({ embeds: [embed], fetchReply: true });
        message.react('🤖');
    },
};
