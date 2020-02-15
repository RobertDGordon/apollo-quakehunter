const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers')
const QuakeAPI = require('./datasources/quake.js');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        quakeAPI: new QuakeAPI()
    })
});

server.listen().then(({ url }) => {
    console.log(`Server online at ${url}`);
});