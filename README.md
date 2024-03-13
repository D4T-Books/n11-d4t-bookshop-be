# Express x Node.js

This repository contains a basic Express application that utilizes Node.js for server-side functionality. It is configured with Nodemon for automatic server restarts during development.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/): Ensure that Node.js, preferably version 16 or higher, is installed on your system, as this project utilizes the latest versions of TypeScript and Nodemon.
- [yarn](https://yarnpkg.com/): Yarn is a package manager that doubles down as project manager. Whether you work on simple projects or industry monorepos, whether you're an open source developer or an enterprise user, Yarn has your back.

## Installation

Clone the repository to your local machine:

```
git clone https://github.com/Ddung203/express-example.git
```

Navigate to the project directory:

```
cd express-example/
```

Install the project dependencies:

```
yarn
```

## Usage

For development purposes, you can run the application using Nodemon to automatically restart the server when changes are detected. Execute the following command:

```
yarn dev
```

This will start the server at `http://localhost:3000` by default. You can change the port in the `src/index.ts` file or create an `.env` file to manage the environt-specific variables separately.

For production, you can build the TypeScript files and then start the server. Run the following commands:

```
yarn start
```

## Project Structure
