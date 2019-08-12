import "reflect-metadata";
import * as functions from "firebase-functions";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";

const app = express();

@Resolver()
class TestResolver {
  @Query(() => String)
  async test() {
    return "test test test";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [TestResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  apolloServer.applyMiddleware({ app, path: "/", cors: true });
};

main();

exports.graphql = functions.https.onRequest(app);
