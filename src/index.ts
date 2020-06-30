import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import express from "express";

import mongoose from "mongoose";

import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path, { dirname } from "path";

import chalk from "chalk";

dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.URI || "mongodb://localhost/evently";

(async () => {
  try {
    const app = express();

    // app.use(express.json());
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error:"));

    db.once("open", function () {
      console.log("Connection Successful!");
    });

    const types = loadFilesSync(path.join(__dirname, "./schemas"));
    const resol = loadFilesSync(path.join(__dirname, "./resolvers"));
    const typeDefs = mergeTypeDefs(types);
    const resolvers = mergeResolvers(resol);

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

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
