const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const jsonPath = '../../data/dauntless-meta-builds.json';
process.chdir(__dirname);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dauntless-meta-builds')
        .setDescription('🦖 Find your meta build!')
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
            option.setName('omnicell')
                .setDescription('Select an omnicell')
                .setRequired(true)
                .addChoices(
                    { name: 'Artificer', value: 'Artificer' },
                    { name: 'Bastion', value: 'Bastion' },
                    { name: 'Discipline', value: 'Discipline' },
                    { name: 'Iceborne', value: 'Iceborne' },
                    { name: 'Revenant', value: 'Revenant' },
                    { name: 'Tempest', value: 'Tempest' },
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
    /*
    async execute(interaction) {
        const weapon = interaction.options.getString('weapon');
        const omnicell = interaction.options.getString('omnicell');
        const element = interaction.options.getString('element');
        try {
            const data = require(jsonPath);
            const buildInfo = data[weapon][omnicell][element];
            const embed = new EmbedBuilder()
                .setColor(0xFFFFFF)
                .addFields(
                    { name: 'Icons', value: buildInfo.Icons.join('\n') },
                    { name: 'Perks', value: buildInfo.Perks.join('\n') },
                )
                .setTitle(`${element} ${weapon} ${omnicell} Build:`);
            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'An error occurred while getting the build. Please try again later.', ephemeral: true });
        }
    },
    */
    async execute(interaction) {
        const weapon = interaction.options.getString('weapon');
        const omnicell = interaction.options.getString('omnicell');
        const element = interaction.options.getString('element');

        try {
            const data = require(jsonPath);
            const buildInfo = data[weapon][omnicell][element];

            let embedColor = 0xFFFFFF;
            switch (omnicell) {
            case 'Artificer': embedColor = 0xACD1AF; break;
            case 'Bastion': embedColor = 0xEEEE9B; break;
            case 'Discipline': embedColor = 0xF47174; break;
            case 'Iceborne': embedColor = 0xACD1AF; break;
            case 'Revenant': embedColor = 0xF47174; break;
            case 'Tempest': embedColor = 0xF5CA7B; break;
            default: embedColor = 0xFFFFFF; break;
            }

            const thumbnailPath = `../../assets/dauntless/builds/${buildInfo.Icons[0]}`;
            const imagePath = './dauntless-meta-builds.png';
            const combinedImage = await combineImages(buildInfo.Icons);
            fs.writeFileSync(imagePath, combinedImage.toBuffer());

            const thumbnailFile = new AttachmentBuilder(thumbnailPath);
            const imageFile = new AttachmentBuilder(imagePath);
            const embed = new EmbedBuilder()
                .setColor(embedColor)
                .setTitle(`${element} ${weapon} ${omnicell} Build:`)
                .setDescription(buildInfo.Perks.join('\n'))
                .setThumbnail(`attachment://${buildInfo.Icons[0]}`)
                .setImage('attachment://dauntless-meta-builds.png');
            interaction.reply({ embeds: [embed], files: [thumbnailFile, imageFile] });
        }
        catch (error) {
            console.error(error);
            interaction.reply({ content: 'Error fetching build information. Please try again later.', ephemeral: true });
        }
    },
};
/*
async function combineImages(iconNames) {
    const canvas = createCanvas(128 * iconNames.length, 128);
    const ctx = canvas.getContext('2d');
    let x = 0;
    for (const iconName of iconNames) {
        const iconPath = `../../assets/dauntless/builds/${iconName}`;
        const icon = await loadImage(iconPath);
        ctx.drawImage(icon, x, 0, 128, 128);
        x += 128;
    }
    return canvas;
}
*/
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
