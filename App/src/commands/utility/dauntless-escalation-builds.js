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

            const thumbnailPath = `../../assets/dauntless/builds/${buildInfo.Icons[0]}`;
            const imagePath = './dauntless-escalation-builds.png';
            const combinedImage = await combineImages(buildInfo.Icons);
            fs.writeFileSync(imagePath, combinedImage.toBuffer());

            const thumbnailFile = new AttachmentBuilder(thumbnailPath);
            const imageFile = new AttachmentBuilder(imagePath);
            const embed = new EmbedBuilder()
                .setColor(embedColor)
                .setDescription(buildInfo.Perks.join(' '))
                .setThumbnail(`attachment://${buildInfo.Icons[0]}`)
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
