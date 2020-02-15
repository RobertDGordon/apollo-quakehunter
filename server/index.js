const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema.js');

const QuakeAPI = require('./datasources/quake.js');

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
    console.log(`Server online at ${url}`);
});