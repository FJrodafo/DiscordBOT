const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const jsonPath = '../../data/dauntless-escalation-builds.json';
process.chdir(__dirname);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dauntless-escalation-builds')
        .setDescription('🦖 Find your escalation build!')
        .addStringOption(option =>
            option.setName('weapon')
                .setDescription('Select a weapon')
                .setRequired(true)
                .addChoices(
                    { name: 'Aether Strikers', value: 'Aether Strikers' },
                    { name: 'Axe', value: 'Axe' },
                    { name: 'Chain Blades', value: 'Chain Blades' },
                    { name: 'Hammer', value: 'Hammer' },
                    { name: 'Repeater', value: 'Repeater' },
                    { name: 'Sword', value: 'Sword' },
                    { name: 'War Pike', value: 'War Pike' },
                ),
        )
        .addStringOption(option =>
            option.setName('escalation')
                .setDescription('Select an escalation')
                .setRequired(true)
                .addChoices(
                    { name: 'Pre-Escalation', value: 'Pre-Escalation' },
                    { name: 'Legendary Escalation', value: 'Legendary Escalation' },
                    { name: 'Heroic Escalation Survival', value: 'Heroic Escalation Survival' },
                    { name: 'Heroic Escalation Speedrun', value: 'Heroic Escalation Speedrun' },
                ),
        )
        .addStringOption(option =>
            option.setName('element')
                .setDescription('Select an element')
                .setRequired(true)
                .addChoices(
                    { name: 'Shock', value: 'Shock' },
                    { name: 'Blaze', value: 'Blaze' },
                    { name: 'Umbral', value: 'Umbral' },
                    { name: 'Terra', value: 'Terra' },
                    { name: 'Frost', value: 'Frost' },
                    { name: 'Radiant', value: 'Radiant' },
                ),
        ),
    async execute(interaction) {
        const weapon = interaction.options.getString('weapon');
        const escalation = interaction.options.getString('escalation');
        const element = interaction.options.getString('element');

        try {
            const data = require(jsonPath);
            const buildInfo = data[weapon][escalation][element];

            let embedColor = 0xFFFFFF;
            switch (escalation) {
            case 'Pre-Escalation': embedColor = 0xACD1AF; break;
            case 'Legendary Escalation': embedColor = 0xEEEE9B; break;
            case 'Heroic Escalation Survival': embedColor = 0xF5CA7B; break;
            case 'Heroic Escalation Speedrun': embedColor = 0xF47174; break;
            default: embedColor = 0xFFFFFF; break;
            }

            const thumbnailPath = `../../assets/dauntless/builds/${buildInfo.Omnicell}`;
            const imagePath = './dauntless-escalation-builds.png';
            let combinedImage;
            if (buildInfo.Supplies) {
                combinedImage = await combineImagesWithSupplies(buildInfo.Weapon, buildInfo.Armour, buildInfo.Supplies);
            }
            else {
                combinedImage = await combineImages(buildInfo.Weapon, buildInfo.Armour);
            }
            fs.writeFileSync(imagePath, combinedImage.toBuffer());

            const thumbnailFile = new AttachmentBuilder(thumbnailPath);
            const imageFile = new AttachmentBuilder(imagePath);
            const embed = new EmbedBuilder()
                .setColor(embedColor)
                .setDescription(buildInfo.Perks.join(' '))
                .setThumbnail(`attachment://${buildInfo.Omnicell}`)
                .setImage('attachment://dauntless-escalation-builds.png')
                .setTitle(`${element} ${weapon} ${escalation} Build:`);
            interaction.reply({ embeds: [embed], files: [thumbnailFile, imageFile] });
        }
        catch (error) {
            console.error(error);
            interaction.reply({ content: 'Error fetching build information. Please try again later.', ephemeral: true });
        }
    },
};

async function combineImagesWithSupplies(weapon, armour, supplies) {
    const canvas = createCanvas(320, 180);
    const ctx = canvas.getContext('2d');

    const weaponRowStartX = (canvas.width - weapon.length * 64) / 2;
    const suppliesRowStartX = (canvas.width - supplies.length * 32) / 2;

    if (weapon.length !== 5) {
        await drawIcons(ctx, weapon, 0, weaponRowStartX, 1);
    }
    else {
        await drawIcons(ctx, weapon, 0, 0, 1);
    }
    await drawIcons(ctx, armour, 74, 0, 1);
    await drawIcons(ctx, supplies, 148, suppliesRowStartX, 0.5);

    return canvas;
}

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
