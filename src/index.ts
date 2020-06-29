import express from "express";
import * as dotenv from "dotenv";
import chalk from "chalk";
import { ApolloServer } from "apollo-server-express";
import connectToDB from "./db/index.config";


dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  const app = express();

  // app.use(express.json());

  await connectToDB();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req, res}) {
      SECRET: process.env.SECRET,
      SECRET2: process.env.SECRET2
    }
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () =>
    console.log(
      `${chalk.blue("Listening on PORT")} ${chalk.underline.yellow(PORT)}`
    )
  );
})();
