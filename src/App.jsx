import { ApolloProvider, InMemoryCache, ApolloClient, HttpLink } from '@apollo/client';
import AppRoute from './routes/AppRoute';
import { Provider } from 'react-redux';
import { store } from './redux/store';


function App() {
  const httpLink = new HttpLink({
    uri: `${import.meta.env.VITE_SOCKET_SERVER_URL}${import.meta.env.VITE_GRAPHQL_ENDPOINT}`, // Combine base URL and GraphQL endpoint
    credentials: 'include', // Include cookies for cross-origin requests if necessary
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AppRoute />
      </ApolloProvider>
    </Provider>
  );
}

export default App;
