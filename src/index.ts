import express from "express";
import * as dotenv from "dotenv";
import chalk from "chalk";
import { ApolloServer } from "apollo-server";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.listen(PORT, () =>
  console.log(
    chalk.blue(`Listening of Port ${chalk.yellow.underline(`${PORT}`)}!!`)
  )
);
