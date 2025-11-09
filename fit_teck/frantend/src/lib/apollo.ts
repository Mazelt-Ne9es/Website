import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Keycloak from 'keycloak-js';

// Initialize Keycloak
export const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080/auth',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'football-analytics',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'analytics-app',
});

// Create the http link
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:5000/graphql',
});

// Auth link middleware
const authLink = setContext(async (_, { headers }) => {
  // Get the authentication token from Keycloak if it exists
  const token = keycloak.token;

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Initialize Keycloak
export const initKeycloak = () => {
  return keycloak.init({
    onLoad: 'login-required',
    checkLoginIframe: false,
  });
};