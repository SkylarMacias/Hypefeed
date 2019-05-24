const express = require('express');
const app = express();
const PORT = 8000;
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'code ninja',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public/dist/public'));

require('./server/config/mongoose');
require('./server/config/routes')(app);



app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`);
})