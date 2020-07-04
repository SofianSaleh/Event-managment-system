import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import express from "express";

import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";

import chalk from "chalk";
import connectToDB from "./db/index.config";
import cookieParser from "cookie-parser";

import { refreshToken, isAuth } from "./middlewares/isAuth.middleware";
import { invalidateRefreshToken } from "./helpers/invalidateRefreshTokens.helper";

dotenv.config();

const PORT = process.env.PORT || 5000;

const types = loadFilesSync(path.join(__dirname, "./schemas"));
const resol = loadFilesSync(path.join(__dirname, "./resolvers"));
const typeDefs = mergeTypeDefs(types);
const resolvers = mergeResolvers(resol);

(async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());

    await connectToDB();

    app.post("/refresh_token", refreshToken);
    app.post("/invalidate", invalidateRefreshToken);

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req, res }: any) => ({ req, res }),
    });

    app.use(isAuth);

    // app.use((req: any, _res: any, next) => {
    //   const accessToken = req.cookies["access-token"];
    //   try {
    //     const data = verifyAccessToken(accessToken) as any;

    //     req.userId = data.user_Id;
    //   } catch (e) {}
    //   return next();
    //   // room for improvement
    // });

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
