## Attribution

This project was build by following the [discord.js guide](https://discordjs.guide/).

All credits to the [discord.js](https://discord.js.org/) team!

## Run it!

This project needs a `config.json` with some data related to your Discord server and your BOT token:

```json
{
    "clientId": "",
    "guildId": "",
    "token": ""
}
```

As well, this project must be initialized and the necessary dependencies installed with the following command:

```shell
npm install
```

If you have the `config.json` file correctly configurated and node v16.11.0 or higher installed on your machine, then you're good to go! Otherwise, continue reading.

To check if you already have Node installed on your machine (e.g., if you're using a VPS), run `node -v` in your terminal.

Finally, run the following command to activate your Discord BOT (make sure you're in the `Source` directory):

```shell
npm start
# Press 'Ctrl + C' to exit
```

If you don't have node v16.11.0 or higher installed on your machine, you can build a Docker image by running the [Dockerfile](./Dockerfile) (make sure to create and configurate the `config.json` correctly before building the docker image).

```shell
cd /path/to/Source
```

```shell
docker build -t discord-bot .
```

```shell
docker run -dp 127.0.0.1:3000:3000 discord-bot
```

> <mark>Important!</mark> This app will use port 3000, change it if you are currently using port 3000; otherwise it will not run.