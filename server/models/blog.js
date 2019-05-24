const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    url: {type: String}
})


mongoose.model('Blog', BlogSchema);