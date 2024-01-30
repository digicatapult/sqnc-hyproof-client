# DSCP HyProof Client

This repository contains the code for the HyProof front-end ( HyProof Client ).

## DSCP HyProof Client: Description

This repository contains the front-end for the **HyProof** proof of concept project.

**HyProof**, aka **Hydrogen Proof** is the effort to deliver the DLT-based _MVP_ as part of the wider **HII Seed** initiative which aims to push the boundaries when it comes to building the socio-technical acceptability and business implications of a fully digitised UK certification infrastructure for verifiable hydrogen provenance ( e.g: green hydrogen, etc ).

---

## DSCP HyProof Client: Configuration

At the moment, this project is configured to use environment variables in a _dot env_ ( `.env` ) file at root level ( although no env variables are need at the moment ).

---

## DSCP HyProof Client: Installation

```sh
npm i
```

Installs dependencies from **`package.json`**.

---

## DSCP HyProof Client: Usage

```sh
npm run start
```

Runs the application using the default port.

Open **[http://localhost:3000](http://localhost:3000)** to view it in the Browser.

---

## DSCP HyProof Client: Dev Usage

```sh
npm run dev
```

Runs the application using the default port in dev mode.

Open **[http://localhost:3000](http://localhost:3000)** to view it in the Browser.

---

## DSCP HyProof Client: Build

```sh
npm run build
```

Builds the app for production to the build folder.

---

## DSCP HyProof Client: Assets

In terms of assets, this project contains the following:

* fonts are stored in **[src/assets/fonts](./src/assets/fonts/)** and imported globally in **[src/index.js](./src/index.js)**

* images are stored in **[src/assets/images](./src/assets/images/)** and loaders configured in **[webpack.config](./webpack.config)**

---

## DSCP HyProof Client: Serve Assets Locally

Apart from images ( **`assets/images/`** ) and fonts ( **`assets/fonts/`** ) that stored locally this project makes use of two assets that are stored in CDNs, meaning **`*.min.js`**. Therefore, to work completely off-line add **`react.production.min.js`** and **`react-dom.production.min.js`** to **`./public/`** and change **`index.html`** from:

```html
<!DOCTYPE html>
<html lang='en'>
  <head>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
		<!-- ... -->
  </head>
  <body><!-- ... --></body>
</html>
```

To:

```html
<!DOCTYPE html>
<html lang='en'>
  <head>
    <script crossorigin src="react.production.min.js"></script>
    <script crossorigin src="react-dom.production.min.js"></script>
		<!-- ... -->
  </head>
  <body><!-- ... --></body>
</html>
```

---

## DSCP HyProof Client: License

This project is licensed under the **Apache 2.0** license.

---

---
