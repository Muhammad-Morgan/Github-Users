import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "./components/ui/sonner.tsx";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client/react";
import client from "./apolloClient.ts";
// Exported client, from apolloClient.ts, and passed through ApolloProvider
createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
    <Toaster />
  </ApolloProvider>
);
