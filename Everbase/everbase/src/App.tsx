import React from 'react';
import './App.css';
import Container from './Components/container'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL + "" + process.env.REACT_APP_API_KEY,
  cache: new InMemoryCache(),
})

function App() {
  console.log(process.env.REACT_APP_API_URL + "" + process.env.REACT_APP_API_KEY)
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Container></Container>
      </div>
    </ApolloProvider>
  );
}

export default App;
