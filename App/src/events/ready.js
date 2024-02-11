const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        const status = [
            {
                activities: [{
                    name: 'One Piece',
                    type: ActivityType.Watching,
                }],
                status: 'dnd',
            },
            {
                activities: [{
                    name: 'Dauntless',
                    type: ActivityType.Competing,
                }],
                status: 'dnd',
            },
            {
                activities: [{
                    name: 'Dauntless',
                    type: ActivityType.Streaming,
                    url: 'https://www.twitch.tv/directory/category/dauntless',
                }],
            },
            {
                activities: [{
                    name: 'Dauntless',
                    type: ActivityType.Playing,
                }],
                status: 'idle',
            },
            {
                activities: [{
                    name: 'me',
                    type: ActivityType.Listening,
                }],
                status: 'idle',
            },
            {
                activities: [{
                    name: 'ⓘ This bot is suspected to be part of an online pirate organization. Please report any suspicious activity to Discord staff.',
                    type: ActivityType.Custom,
                }],
                status: 'idle',
            },
            {
                activities: [{
                    name: 'I respond to DMs',
                    type: ActivityType.Custom,
                }],
                status: 'online',
            },
        ];
        function updateStatus() {
            const random = Math.floor(Math.random() * status.length);
            client.user.setPresence(status[random]);
        }
        updateStatus();
        setInterval(updateStatus, 3_600_000);
    },
};
