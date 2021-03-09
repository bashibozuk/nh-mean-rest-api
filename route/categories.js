const RestRoute = require('./base-route');
const Category = require('../model/category');

class CategoriesRoute extends RestRoute {
    constructor(router) {
        super(router, Category, 'categories')
    }
}

module.exports = CategoriesRoute;