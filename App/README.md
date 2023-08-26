## Attribution

This project was build by following the [discord.js guide](https://discordjs.guide/).

All credits to the [discord.js](https://discord.js.org/) team!

## Run it!

This project needs a `config.json` into the `src` directory with some data related to your Discord server and your BOT token:

```json
{
    "clientId": "",
    "guildId": "",
    "token": ""
}
```

As well, this project must be initialized and the necessary dependencies installed with the following command (make sure you are in the `App` directory):

```shell
npm install
```

If you have the `config.json` file into the `src` directory correctly configurated and node v16.11.0 or higher installed on your machine, then you are good to go!

To check if you already have Node installed on your machine, run `node -v` in your terminal. Otherwise, you will need to install node v16.11.0 or higher, or check out the [Docker](#docker) alternative.

Finally, run the following command to activate your Discord BOT (make sure you are in the `App` directory):

```shell
npm start
# Press 'Ctrl + C' to exit
```

## Docker

If you don't have node v16.11.0 or higher installed on your machine, you can build a Docker image by running the [Dockerfile](./Dockerfile) (make sure to create and configurate the `config.json` file correctly into the `src` directory before building the docker image).

```shell
cd /path/to/App
```

```shell
docker build -t discord-bot .
```

```shell
docker run -dp 127.0.0.1:3000:3000 discord-bot
```

> <mark>Important!</mark> This app will use port 3000, change it if you are currently using port 3000. Otherwise it will not run.