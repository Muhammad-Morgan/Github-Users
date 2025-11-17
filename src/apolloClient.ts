// Importing: main GraphQL client, and HttpLink that tells apollo where to send requests. Then we get ApolloLink to allow combining different links, and InMemoryCache to cach the data.
import type { ServerParseError } from "@apollo/client";
import type { ServerError } from "@apollo/client";
import { InMemoryCache, ApolloClient, HttpLink, ApolloLink } from "@apollo/client";

import { ErrorLink } from "@apollo/client/link/error";
import type { GraphQLError } from "graphql";
// Error response type:
type ErrorResponse = {
  graphQLErrors?: readonly GraphQLError[];
  networkError?: Error | ServerError | ServerParseError;
  operation: ApolloLink.Operation;
};

// Initiating a new instance from the ErrorLink class -which is instead of onError Hook- setting the config
const errorLink = new ErrorLink(({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.error(`[Network Error]: ${networkError}`);
  }
});

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";
// Identifying the url to make apollo send the request to
const httpLink = new HttpLink({
  uri: GITHUB_GRAPHQL_API,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});
// pass the url with the token to apollo, and add the errorLink
const link = ApolloLink.from([errorLink, httpLink]);
// creating new instance of apollo client with the config
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
