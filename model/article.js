const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    title: {type: String},
    text: {type: String},
    visits: {type: Number},
    createdAt: {type: Date, default: Date.now},
    rating: {type: Number},
    authorId: {type: mongoose.Schema.Types.ObjectId},
    categoryId: {type: mongoose.Schema.Types.ObjectId}
})

module.exports = mongoose.model('Article', schema);