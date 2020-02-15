module.exports = {
    Query: {
        quakes: (_, __, { datasources }) =>
            datasources.quakeAPI.getAllQuakes(),
        quake: (_, { id }, { datasources }) =>
            datasources.quakeAPI.getQuakeById({ quakeId: id }),
        me: (_, __, { datasources }) =>
            datasources.quakeAPI.findOrCreateUser()
    }
}