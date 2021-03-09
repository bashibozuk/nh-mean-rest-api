const express = require('express');
const ArticlesRoute = require('./articles');
const router = express.Router();
const AuthorRoute = require('./authors');
const CategoryRoute = require('./categories');


const articleRoute = new ArticlesRoute(router);
articleRoute.registerRoutes(router);
const authorRoute = new AuthorRoute(router);
authorRoute.registerRoutes();
const categoryRoute = new CategoryRoute(router);
categoryRoute.registerRoutes();

module.exports = router;