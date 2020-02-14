const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema.js');

const server = new ApolloServer({ typeDefs });