const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Display info about this server!'),
    async execute(interaction) {
        if (!interaction.guild) {
            return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
        }
        else {
            const embed = new EmbedBuilder()
                .setColor(0xFFFFFF)
                .setThumbnail(`${interaction.guild.iconURL()}`)
                .addFields(
                    { name: 'Server Name:', value: `${interaction.guild.name}`, inline: true },
                    { name: 'ID:', value: `${interaction.guild.id}`, inline: true },
                    { name: 'Total members:', value: `${interaction.guild.memberCount}`, inline: true },
                    { name: 'Created at:', value: `${interaction.guild.createdAt}`, inline: false },
                );
            return interaction.reply({ embeds: [embed] });
        }
    },
};

/*
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Display info about this server.'),
    async execute(interaction) {
        // interaction.guild is the object representing the Guild in which the command was run
        return interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    },
};
*/
