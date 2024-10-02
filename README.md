# :gear: Code Rating Engine

Backend Engine that is used in [codemash](https://github.com/GauravWalia19/codemash) project for rating the open-source code

![GitHub Release Date](https://img.shields.io/github/release-date/TECHOUS/coderatingengine)
![Vercel Deployment](https://img.shields.io/github/actions/workflow/status/TECHOUS/coderatingengine/Vercel%20Deployment.yml)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/version/TECHOUS/coderatingengine)
![GitHub repo size](https://img.shields.io/github/repo-size/TECHOUS/coderatingengine)

## Features

- Developed the rating mechanism using ELO Rating Algorithm
- Implemented in memory caching (30 seconds)
- Secured the update and the searching routes with token mechanism (Token expiry maintained as 5 minutes)
- Implemented rate limiting (10 requests per minute)

## System Architecture

As system architecture contains sensitive information so please email us [here](mailto:gauravwalia019@gmail.com)

## Getting Started

### Prerequisites

- node js v20
- yarn v1
- vercel CLI (only required for deployments)
- MongoDB in local desktop or in MongoDB Atlas

### Installation

- Clone the repository using the below command

```bash
git clone git@github.com:TECHOUS/coderatingengine.git
```

- Run the below command in the project folder and install all the dependencies

```bash
yarn run build
```

- Create `.env` file in the project folder and add the properties mentioned in the [Environment Variables](#environment-variables) section
- After all this setup we are good to run the APIs from local
- Follow the [Scripts](#scripts) section for the scripts you can run in your local

### Environment Variables

#### `MONGODB_URI`

Add the mongo db URI from the local desktop or from Mongo DB Atlas account, for example

```bash
mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
```

#### `RATE_LIMIT_MINUTES`

- how long to remember requests for, in minutes
- configure a number as 1 or greater than 1

#### `RATE_LIMIT_MAX_REQUEST`

- how many requests to allow
- configure a number greater than 1 per your choice

#### `CACHE_STORAGE_SECONDS`

- For how long you can have to return the data from in memory cache
- This property is applicable for randomCodes and searchUser API

### Scripts

#### `yarn run build`

Build and install the required nodejs dependencies and devDependencies from `package.json` for running this project

#### `yarn run test`

You can run the tests with this script and verify if the APIs are working fine or not

#### `yarn run start`

- Start the nodejs server in production mode
- Server will be stopped if any issues came up

#### `yarn run dev`

- Start the nodejs server in development mode
- Server will be restarted if any issues came up

## API Documentation

For API Endpoints and Documentation follow [this link](https://coderatingengine.vercel.app/)

![Documentation Screenshot](https://github.com/TECHOUS/coderatingengine/blob/master/.github/coderatingengine_docs.png?raw=true)

## Related Projects

[codemash](https://github.com/GauravWalia19/codemash)