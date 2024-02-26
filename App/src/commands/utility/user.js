const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.'),
    async execute(interaction) {
        if (!interaction.guild) {
            return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
        }
        else {
            const user = interaction.user;
            const member = interaction.member;
            const embed = new EmbedBuilder()
                .setColor(0xFFFFFF)
                .setThumbnail(`${interaction.user.displayAvatarURL()}`)
                .addFields(
                    { name: 'User Name:', value: `${user.username}`, inline: true },
                    { name: 'ID:', value: `${user.id}`, inline: true },
                    { name: 'Joined at:', value: `${member.joinedAt}`, inline: false },
                );
            return interaction.reply({ embeds: [embed] });
        }
    },
};

/*
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.'),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        return interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
    },
};
*/
