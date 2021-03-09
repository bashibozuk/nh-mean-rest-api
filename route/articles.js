const RestRoute = require('./base-route');
const Aticle = require('../model/article');

class ArticlesRoute extends RestRoute {
    constructor(router) {
        super(router, Aticle, 'articles')
    }
}

module.exports = ArticlesRoute;