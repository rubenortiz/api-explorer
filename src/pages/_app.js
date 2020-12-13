import 'components/globals.scss';
import { ApolloProvider } from '@apollo/client';
import client from '../utils/ApolloClient';

function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
