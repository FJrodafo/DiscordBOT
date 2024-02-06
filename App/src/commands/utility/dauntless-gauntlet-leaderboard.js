const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dauntless-gauntlet-leaderboard')
        .setDescription('🦖 Provides information on the top 5 in Gauntlet.'),
    async execute(interaction) {
        try {
            https.get('https://storage.googleapis.com/dauntless-gauntlet-leaderboard/production-gauntlet-season10.json', (response) => {
                let data = '';

                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('end', () => {
                    const leaderboardData = JSON.parse(data);
                    const topGuilds = leaderboardData.leaderboard.slice(0, 5);

                    const topGuildsInfo = topGuilds.map((guild, index) => (`\n${getRankEmoji(index + 1)} **${guild.guild_name}** [${guild.guild_nameplate}]\nLevel: **${guild.level}** Time Left: **${formatTime(guild.remaining_sec)}**`)).join('\n');
                    const iconPath = '../../assets/dauntless/Gauntlet.png';
                    const iconFile = new AttachmentBuilder(iconPath);
                    const embed = new EmbedBuilder()
                        .setColor(0xC09146)
                        .setAuthor({ name: 'Gauntlet Leaderboard', iconURL: 'attachment://Gauntlet.png', url: 'https://playdauntless.com/gauntlet/leaderboard/' })
                        .setDescription(topGuildsInfo);
                    interaction.reply({ embeds: [embed], files: [iconFile] });
                });
            }).on('error', (error) => {
                console.error('Error obtaining information:', error);
                interaction.reply({ content: 'Error obtaining information.', ephemeral: true });
            });
        }
        catch (error) {
            console.error('Unexpected error:', error);
            interaction.reply({ content: 'Unexpected error.', ephemeral: true });
        }
    },
};

function getRankEmoji(rank) {
    switch (rank) {
    case 1:
        return '🥇';
    case 2:
        return '🥈';
    case 3:
        return '🥉';
    default:
        return `**${rank}.**`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

/*
const { SlashCommandBuilder } = require('discord.js');
const puppeteer = require('puppeteer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dauntless-gauntlet-leaderboard')
        .setDescription('Provides information on the top 5 in Gauntlet.'),
    async execute(interaction) {
        try {
            const browser = await puppeteer.launch({ headless: "new" });
            const page = await browser.newPage();
            await page.goto('https://playdauntless.com/gauntlet/leaderboard/');

            const topGuilds = await page.evaluate(() => {
                const entries = document.querySelectorAll('.leaderboard__entry');
                const guilds = [];

                entries.forEach((entry) => {
                    const rank = entry.querySelector('.rank').textContent.trim();
                    const guildName = entry.querySelector('.guild-name').textContent.trim();
                    const guildTag = entry.querySelector('.guild-tag').textContent.trim();
                    const level = entry.querySelector('.level span').textContent.trim();
                    const timeLeft = entry.querySelector('.time-left span').textContent.trim();

                    guilds.push({
                        rank,
                        guildName,
                        guildTag,
                        level,
                        timeLeft,
                    });
                });

                return guilds.slice(0, 5);
            });

            await browser.close();

            const response = topGuilds.map(guild => `${guild.rank}. ${guild.guildName} [${guild.guildTag}] - Level: ${guild.level} | Time Left: ${guild.timeLeft}`).join('\n');
            if (interaction.deferred) {
                interaction.editReply(response);
            } else {
                interaction.reply(response);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            interaction.reply({ content: 'Unexpected error.', ephemeral: true });
        }
    },
};
*/
