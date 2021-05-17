import React from 'react';
import './App.css';
import Container from './Components/container'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL_EVERBASE + "" + process.env.REACT_APP_API_KEY_EVERBASE,
  cache: new InMemoryCache(),
})

function App() {
  console.log(process.env.REACT_APP_API_URL_EVERBASE + "" + process.env.REACT_APP_API_KEY_EVERBASE )
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Container></Container>
      </div>
    </ApolloProvider>
  );
}

export default App;
