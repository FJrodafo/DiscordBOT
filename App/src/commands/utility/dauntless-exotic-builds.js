const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const jsonPath = '../../data/dauntless-exotic-builds.json';
process.chdir(__dirname);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dauntless-exotic-builds')
        .setDescription('🦖 Find your exotic build!')
        .addStringOption(option =>
            option.setName('weapon')
                .setDescription('Select a weapon')
                .setRequired(true)
                .addChoices(
                    { name: 'Adrenaline Hunger', value: 'Adrenaline Hunger' },
                    { name: 'Molten Edict', value: 'Molten Edict' },
                    { name: 'The Godhand', value: 'The Godhand' },
                    { name: 'The Hunger', value: 'The Hunger' },
                    { name: 'Twin Suns on Fire', value: 'Twin Suns on Fire' },
                    { name: 'The Twin Suns', value: 'The Twin Suns' },
                ),
        ),
    async execute(interaction) {
        const weapon = interaction.options.getString('weapon');

        try {
            const data = require(jsonPath);
            const buildInfo = data[weapon];

            const thumbnailPath = `../../assets/dauntless/builds/${buildInfo.Icons[0]}`;
            const imagePath = './dauntless-exotic-builds.png';
            const combinedImage = await combineImages(buildInfo.Icons);
            fs.writeFileSync(imagePath, combinedImage.toBuffer());

            const thumbnailFile = new AttachmentBuilder(thumbnailPath);
            const imageFile = new AttachmentBuilder(imagePath);
            const embed = new EmbedBuilder()
                .setColor(0xFFFFFF)
                .setDescription(buildInfo.Perks.join(' '))
                .setThumbnail(`attachment://${buildInfo.Icons[0]}`)
                .setImage('attachment://dauntless-exotic-builds.png')
                .setTitle(`${weapon} Exotic Build:`);
            interaction.reply({ embeds: [embed], files: [thumbnailFile, imageFile] });
        }
        catch (error) {
            console.error(error);
            interaction.reply({ content: 'Error fetching build information. Please try again later.', ephemeral: true });
        }
    },
};

async function combineImages(iconNames) {
    const canvas = createCanvas(128 * (iconNames.length - 1), 128);
    const ctx = canvas.getContext('2d');

    let x = 0;

    for (let i = 1; i < iconNames.length; i++) {
        const iconName = iconNames[i];
        const iconPath = `../../assets/dauntless/builds/${iconName}`;
        const icon = await loadImage(iconPath);

        ctx.drawImage(icon, x, 0, 128, 128);
        x += 128;
    }

    return canvas;
}
