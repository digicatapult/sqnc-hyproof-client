# SQNC HyProof Client

This repository contains the code for the HyProof front-end ( HyProof Client ).

## SQNC HyProof Client: Description

This repository contains the front-end for the **HyProof** proof of concept project.

**HyProof**, aka **Hydrogen Proof** is the effort to deliver the DLT-based _MVP_ as part of the wider **HII Seed** initiative which aims to push the boundaries when it comes to building the socio-technical acceptability and business implications of a fully digitised UK certification infrastructure for verifiable hydrogen provenance ( e.g: green hydrogen, etc ).

---

## SQNC HyProof Client: Configuration

At the moment, this project is configured to use environment variables in a _dot env_ ( `.env` ) file at root level ( although no env variables are need at the moment ).

---

## SQNC HyProof Client: Installation

```sh
npm i
```

Installs dependencies from **`package.json`**.

---

## SQNC HyProof Client: Usage

```sh
npm run build
npm run start
```

Runs the application using the default port.

Open **[http://localhost:3000](http://localhost:3000)** to view it in the Browser.

---

## SQNC HyProof Client: Dev Usage

```sh
npm run dev
```

Runs the application using the default port in dev mode.

Open **[http://localhost:3000](http://localhost:3000)** to view it in the Browser.

---

## SQNC HyProof Client: Build

```sh
npm run build
```

Builds the app for production to the build folder.

---

## SQNC HyProof Client: Assets

In terms of assets, this project contains the following:

* fonts are stored in **[src/assets/fonts](./src/assets/fonts/)** and imported globally in **[src/index.js](./src/index.js)**

* images are stored in **[src/assets/images](./src/assets/images/)** and loaders configured in **[webpack.config](./webpack.config)**

---

## SQNC HyProof Client: License

This project is licensed under the **Apache 2.0** license.

---

---
