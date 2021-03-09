const faker = require('faker');
const Crud = require('./crud');
function getData() {
    const size =Math.max(5, Math.ceil(Math.random() * 10));
    const data = [];
    console.log(size);
    for (let i = 0; i < size;i++) {
        data.push({
            name: `${faker.name.firstName()} ${faker.name.lastName()}`
        });
    }

    return data;
}

const crud = new Crud('blog-app-2', 'authors');
const data = getData();
console.log(data)
module.exports = () => data.length && crud.create(data)
