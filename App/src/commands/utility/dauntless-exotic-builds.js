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
                    { name: 'The Hunger', value: 'The Hunger' },
                    { name: 'The Adrenaline Hunger', value: 'The Adrenaline Hunger' },
                    { name: 'Molten Edict', value: 'Molten Edict' },
                    { name: 'The Godhand', value: 'The Godhand' },
                    { name: 'The Twin Suns', value: 'The Twin Suns' },
                    { name: 'The Twin Suns on Fire', value: 'The Twin Suns on Fire' },
                ),
        ),
    async execute(interaction) {
        const weapon = interaction.options.getString('weapon');

        try {
            const data = require(jsonPath);
            const buildInfo = data[weapon];

            const thumbnailPath = `../../assets/dauntless/builds/${buildInfo.Omnicell}`;
            const imagePath = './dauntless-exotic-builds.png';
            const combinedImage = await combineImages(buildInfo.Weapon, buildInfo.Armour);
            fs.writeFileSync(imagePath, combinedImage.toBuffer());

            const thumbnailFile = new AttachmentBuilder(thumbnailPath);
            const imageFile = new AttachmentBuilder(imagePath);
            const embed = new EmbedBuilder()
                .setColor(0xFFFFFF)
                .setDescription(buildInfo.Perks.join('\n'))
                .setThumbnail(`attachment://${buildInfo.Omnicell}`)
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

async function combineImages(weapon, armour) {
    const canvas = createCanvas(320, 138);
    const ctx = canvas.getContext('2d');

    const weaponRowStartX = (canvas.width - weapon.length * 64) / 2;

    await drawIcons(ctx, weapon, 0, weaponRowStartX, 1);
    await drawIcons(ctx, armour, 74, 0, 1);

    return canvas;
}

async function drawIcons(ctx, icons, yOffset, startX, scale) {
    let x = startX;

    for (let i = 0; i < icons.length; i++) {
        const iconName = icons[i];
        const iconPath = `../../assets/dauntless/builds/${iconName}`;
        const icon = await loadImage(iconPath);

        const scaledWidth = 64 * scale;
        const scaledHeight = 64 * scale;

        ctx.drawImage(icon, x, yOffset, scaledWidth, scaledHeight);
        x += scaledWidth;
    }
}
