const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        const status = [
            {
                activities: [{
                    name: 'Dauntless',
                    type: ActivityType.Competing,
                }],
                status: 'dnd',
            },
            {
                activities: [{
                    name: 'I respond to DMs',
                    type: ActivityType.Custom,
                }],
                status: 'online',
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
                    name: 'Dauntless',
                    type: ActivityType.Playing,
                }],
                status: 'idle',
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
                    name: 'One Piece',
                    type: ActivityType.Watching,
                }],
                status: 'dnd',
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
