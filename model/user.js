const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

function exists(model, uniqueField) {
    return async (v) => {
        const filter = {};
        filter[uniqueField] = v;

        return !await model.findOne(filter);
    }
}

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

schema.pre('save', async function(next) {
    const pass = await bcrypt.hash(this.password, 10);
    this.password = pass;
    next();
});

schema.methods.comparePasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const model = mongoose.model('User', schema);

schema.path('name').validate(exists(model, 'name'), 'Name is not unique');
schema.path('email').validate(exists(model, 'email'), 'Email is not unique');

module.exports = model;