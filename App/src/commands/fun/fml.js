const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const puppeteer = require('puppeteer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fml')
        .setDescription('📒 Your everyday life stories!'),
    async execute(interaction) {
        await interaction.deferReply();

        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        try {
            await page.goto('https://www.fmylife.com/random', { waitUntil: 'networkidle2' });

            const articleData = await page.$eval('article', el => {
                const anchors = el.querySelectorAll('a');
                const lastAnchor = anchors[anchors.length - 1];

                return {
                    author: el.querySelector('p').innerText,
                    text: lastAnchor.innerText,
                    url: 'https://www.fmylife.com' + lastAnchor.getAttribute('href'),
                };
            });

            const embed = new EmbedBuilder()
                .setColor(0xFC8CB4)
                .setTitle(articleData.author)
                .setDescription(articleData.text)
                .setThumbnail('https://www.fmylife.com/images/header/logo-fml.png')
                .setImage('https://www.fmylife.com/images/header/baseline-fml.png');
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('LINK')
                        .setStyle(ButtonStyle.Link)
                        .setURL(articleData.url),
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
        catch (error) {
            console.error('Unexpected error:', error);
            await interaction.reply({ content: 'Unexpected error.', ephemeral: true });
        }
        finally {
            await browser.close();
        }
    },
};
