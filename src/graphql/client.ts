import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
  uri: 'https://itunes-podcast-api.herokuapp.com/query',
})
