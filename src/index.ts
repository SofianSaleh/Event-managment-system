import express from "express";
import * as dotenv from "dotenv";
import chalk from "chalk";
import { ApolloServer } from "apollo-server-express";
import connectToDB from "./db/index.config";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path, { dirname } from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  const app = express();

  // app.use(express.json());

  await connectToDB();
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
})();
