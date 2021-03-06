const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers');

const { createStore } = require('./utils.js')

const QuakeAPI = require('./datasources/quake.js');
const UserAPI = require('./datasources/user.js');

const store = createStore();

const server = new ApolloServer({
    context: async ({ req }) => {
        // simple auth check on every request
        const auth = req.headers && req.headers.authorization || '';
        const email = Buffer.from(auth, 'base64').toString('ascii');
        // if (!isEmail.validate(email)) return { user: null };
        // find a user by their email
        const usercheck = await store.users.map(user => {
            if (email === user.email) {
                // console.log('user: ',user)
                return user
            }
        });

        let users = []

        await usercheck.forEach(e => {
            if (e) {
                // console.log('pushing:', e)
                users.push(e)
            }
        })

        const user = users && users[0] || null;

        return { user };
      },
    typeDefs,
    resolvers,
    dataSources: () => ({
        quakeAPI: new QuakeAPI(),
        userAPI: new UserAPI({ store })
    })
});

server.listen().then(({ url }) => {
    console.log(`Server online at ${url}`);
});