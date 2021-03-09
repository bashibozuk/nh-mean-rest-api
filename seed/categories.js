const faker = require('faker');
const Crud = require('./crud');


const crud = new Crud('blog-app-2', 'categories');
const data = [{
    name: 'Wellness and Wellbeing'
}, {
    name: 'Lifestyle'
}, {
    name: 'Science'
}, {
    name: 'Politics'
}]

module.exports = () => crud.create(data)
