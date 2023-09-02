## Index

1. [Attribution](#attribution)
2. [Project Structure](#project-structure)
3. [Run it!](#run-it)
4. [Docker](#docker)

## Attribution

This project was build by following the [discord.js guide](https://discordjs.guide/). I have modified small details of the code. This is just an example of what the final project would look like.

## Project Structure

```
App/
   ├── node_modules/
   │   └── ...
   ├── src/
   │   ├── commands/
   │   │   ├── fun/
   │   │   │   └── ping.js
   │   │   ├── moderation/
   │   │   │   ├── kick.js
   │   │   │   └── prune.js
   │   │   └── utility/
   │   │       ├── avatar.js
   │   │       ├── server.js
   │   │       └── user.js
   │   ├── events/
   │   │   ├── interactionCreate.js
   │   │   └── ready.js
   │   ├── config.json
   │   ├── deploy-commands.js
   │   └── index.js
   ├── Dockerfile
   ├── package-lock.json
   └── package.json
```

## Run it!

This project needs a `config.json` into the `src` directory with some data related to your Discord server and your BOT token (make sure you have a BOT created in the [Discord Developer Portal](https://discord.com/developers/applications)):

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

If you have the `config.json` file into the `src` directory correctly configurated and Node v16.11.0 or higher installed on your machine, then you are good to go!

To check if you already have Node installed on your machine, run `node -v` in your terminal. Otherwise, you will need to install Node v16.11.0 or higher or, as a last option, check out the [Docker](#docker) alternative.

Finally, if you have Node installed, run the following command to activate your Discord BOT (make sure you are in the `App` directory):

```shell
npm start
# Press 'Ctrl + C' to exit
```

## Docker

If you don't have Node v16.11.0 or higher installed on your machine, you can build a Docker image by running the [Dockerfile](./Dockerfile) (make sure to create and configurate the `config.json` file correctly into the `src` directory before building the docker image, also make sure you are in the `App` directory).

```shell
docker build -t discord-bot .
```

```shell
docker run -dp 127.0.0.1:3000:3000 discord-bot
```

> <mark>Important!</mark> This app will use port 3000, change it if you are currently using port 3000. Otherwise it will not run.

<link rel="stylesheet" href="./README.css">
<a class="back-to-top" href="#top" title="Back to top">↑</a>