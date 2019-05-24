const Blogs = require('../controllers/blogs');

module.exports = (app) => {
    console.log("routes")
    app.get('/get-kith', Blogs.kith);
    app.get('/get-nike', Blogs.nike);
    app.get('/get-the-hundreds', Blogs.theHundreds);
    app.get('/get-bape', Blogs.bape);
    app.get('/get-end', Blogs.end);
    app.get('/get-adidas', Blogs.adidas);
}