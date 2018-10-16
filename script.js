const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, './public'); //
const app = express();
const api = require('./controllers/api');

 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());
 app.use(express.static(publicPath));


api(app);


app.listen(1337);