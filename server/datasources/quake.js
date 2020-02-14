const { RESTDataSource } = require('apollo-datasource-rest');

class QuakeAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://earthquake.usgs.gov/fdsnws/event/1/'
    }

    async getAllQuakes() {
        const query = 'query?format=geojson&starttime=2014-01-01&endtime=2014-01-02'
        const res = await this.get(query);
        return Array.isArray(res)
            ? res.map(quake => this.quakeReducer(quake))
            : [];
    }
}

module.exports = QuakeAPI;