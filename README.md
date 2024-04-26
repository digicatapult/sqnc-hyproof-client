# SQNC HyProof Client

# This repository is not production software. It should be used for investigation and demonstration purposes only

This repository contains the code for the HyProof front-end (HyProof Client). 

Instructions for running the **Demonstrator** can be found in `/demo/hyproof-demo.md`

## Description

This repository contains the front-end for the **HyProof** proof of concept project.

**HyProof** is a DLT-based _MVP_ delivered as part of the wider **HII Seed** initiative which aims to push the boundaries when it comes to building the socio-technical acceptability and business implications of a fully digitised UK certification infrastructure for verifiable hydrogen provenance ( e.g: green hydrogen, etc ).


## Configuration

At the moment, this project is configured to use environment variables in a _dot env_ ( `.env` ) file at root level ( although no env variables are need at the moment ).

## Installation

```sh
npm i
```

Installs dependencies from **`package.json`**.


## Usage

```sh
npm run build
npm run start
```

Runs the application using the default port.

Open **[http://localhost:3000](http://localhost:3000)** to view it in the Browser.

## Dev Usage

```sh
npm run dev
```

Runs the application using the default port in dev mode.

Open **[http://localhost:3000](http://localhost:3000)** to view it in the Browser.

## Build

```sh
npm run build
```

Builds the app for production to the build folder.

## Assets

This project contains the following assets:

* fonts are stored in **[src/assets/fonts](./src/assets/fonts/)** and imported globally in **[src/index.js](./src/index.js)**

* images are stored in **[src/assets/images](./src/assets/images/)** and loaders configured in **[webpack.config](./webpack.config)**

## License

This project is licensed under the **Apache 2.0** license.
