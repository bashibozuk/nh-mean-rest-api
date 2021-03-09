const RestRoute = require('./base-route');
const Author = require('../model/author');

class AuthorsRoute extends RestRoute {
    constructor(router) {
        super(router, Author, 'authors')
    }
}

module.exports = AuthorsRoute;