import express from "express";
import * as dotenv from "dotenv";
import chalk from "chalk";
import { ApolloServer } from "apollo-server";
import connectToDB from "./db/index.config";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

async function startServer() {
  try {
    await connectToDB();
    console.log(`hi`);
    app.listen(PORT, () =>
      console.log(
        chalk.blue(`Listening of Port ${chalk.yellow.underline(`${PORT}`)}!!`)
      )
    );
  } catch (e) {
    console.log(e.message);
  }
}
startServer();
