import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-client-preset'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from './constant'
import App from './components/App'
import { ApolloProvider } from 'react-apollo'

import 'tachyons'
import './index.css'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

// 8888888888888888888888888888888888888888888888888888888888888888888

// const middlewareLink = new ApolloLink((operation, forward) => {
//   // get the authentication token from local storage if it exists
//   const tokenValue = localStorage.getItem(AUTH_TOKEN)
//   // return the headers to the context so httpLink can read them
//   operation.setContext({
//     headers: {
//       Authorization: tokenValue ? `Bearer ${tokenValue}` : '',
//     },
//   })
//   return forward(operation)
// })

// authenticated httplink
// const httpLinkAuth = middlewareLink.concat(httpLink)

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
//     },
//   },
// })

// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query)
//     return kind === 'OperationDefinition' && operation === 'subscription'
//   },
//   wsLink,
//   httpLinkAuth,
// )

// // apollo client setup
// const client = new ApolloClient({
//   link: ApolloLink.from([link]),
//   cache: new InMemoryCache(),
//   connectToDevTools: true,
// })

const token = localStorage.getItem(AUTH_TOKEN)

ReactDOM.render(
  <ApolloProvider client={client}>
    <App token={token} />
  </ApolloProvider>,
  document.getElementById('root'),
)
