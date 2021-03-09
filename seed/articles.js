const faker = require('faker');
const { ObjectID } = require('mongodb');
const Crud = require('./crud');

const count = 20;
const authors = new Crud('blog-app-2', 'authors');
const categories = new Crud('blog-app-2', 'categories');
const articles = new Crud('blog-app-2', 'articles');

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
async function main() {
    const authosrsList = await authors.read();
    const categoryList = await categories.read();

    const articlesList = [];
    for (let i = 0; i < count; i++) {
        articlesList.push({
            title: faker.lorem.sentence(),
            text: faker.lorem.paragraphs(10),
            visits: faker.random.number(),
            createdAt: faker.date.past(),
            rating: faker.random.number(5),
            authorId: ObjectID(authosrsList[getRandomIntInclusive(0, authosrsList.length - 1)]._id),
            categoryId: ObjectID(categoryList[getRandomIntInclusive(0, categoryList.length - 1)]._id),
        });
    }

    articles.create(articlesList);
}
module.exports = main;
