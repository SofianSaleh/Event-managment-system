import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import express from "express";

import mongoose from "mongoose";

import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path, { dirname } from "path";

import chalk from "chalk";
import connectToDB from "./db/index.config";

dotenv.config();

const PORT = process.env.PORT || 5000;

const types = loadFilesSync(path.join(__dirname, "./schemas"));
const resol = loadFilesSync(path.join(__dirname, "./resolvers"));
const typeDefs = mergeTypeDefs(types);
const resolvers = mergeResolvers(resol);

(async () => {
  try {
    // app.use(express.json());
    await connectToDB();

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req, res }: any) => ({ req, res }),
    });

    const app = express();

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(PORT, () =>
      console.log(
        `${chalk.blue("Listening on PORT")} ${chalk.underline.yellow(PORT)}`
      )
    );
  } catch (e) {
    console.log(e);
  }
})();
