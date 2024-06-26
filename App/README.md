## Index

1. [Attribution](#attribution)
2. [Project Structure](#project-structure)
3. [Run it!](#run-it)
4. [Run with Docker](#run-with-docker)
5. [Build Docker image on your own](#build-docker-image-on-your-own)
6. [Available Scripts](#available-scripts)

## Attribution

This project was build by following the [discord.js guide](https://github.com/discordjs/guide). I have modified small details of the code. This is just an example of what the final project would look like.

## Project Structure

<details>
<summary>Click me</summary>

```
App/
├── node_modules/
│   └── ...
├── src/
│   ├── assets/
│   │   └── ...
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
│   ├── data/
│   │   └── ...
│   ├── events/
│   │   ├── interactionCreate.js
│   │   └── ready.js
│   ├── scripts/
│   │   └── ...
│   ├── config.json
│   ├── deploy-commands.js
│   └── index.js
├── Dockerfile
├── package-lock.json
└── package.json
```
</details>

## Run it!

This project needs a `config.json` into the `src` directory with some data related to your Discord server and your BOT token (Make sure you have a BOT created in the [Discord Developer Portal](https://discord.com/developers/applications)):

```json
{
    "clientId": "",
    "guildId": "",
    "token": ""
}
```

As well, this project must be initialized and the necessary dependencies installed with the following command (Make sure you are in the `App` directory):

```shell
npm install
```

If you have the `config.json` file into the `src` directory correctly configurated and Node v16.11.0 or higher installed on your machine, then you are good to go!

To check if you already have Node installed on your machine, run `node -v` in your terminal. Otherwise, you will need to install Node v16.11.0 or higher or, as a last option, check out the [Docker](#docker) alternative.

Finally, if you have Node installed, run the following command to activate your Discord BOT (Make sure you are in the `App` directory):

```shell
npm start
# Press 'Ctrl + C' to exit
```

## Run with Docker

Make sure to create and configurate the `config.json` file correctly into the `src` directory before running Docker commands...

Build the container:

```shell
docker compose build
```

Run the container:

```shell
docker compose up -d
```

Stop the Container:

```shell
docker compose down
```

## Build Docker image on your own

If you don't have Node v16.11.0 or higher installed on your machine, you can build a Docker image by running the [Dockerfile](./Dockerfile) (Make sure to create and configurate the `config.json` file correctly into the `src` directory before building the docker image).

Open a terminal and run the following command (Make sure you are in the `App` directory):

```shell
docker build -t discord-bot .
```

After the build completes, you can run your container with the following command:

```shell
docker run -dp 127.0.0.1:3000:3000 discord-bot
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Once configured, run the bot. It first deploy the commands, updating both on the guild server and globally (You can edit the commented lines of code in the [deploy-commands.js](./src/deploy-commands.js) file to customize the deploy of the bot commands).

### `npm run eslint`

Runs the eslint to find possible formatting errors in the code.

### `npm run eslintfix`

Automatically fixes all errors caught by eslint.

### `npm test`

There are currently no tests configured.

<link rel="stylesheet" href="./README.css">
<a class="scrollup" href="#top">&#x1F53A</a>