const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/richbitch', { useNewUrlParser: true });
const app = express();

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//Routes
app.use('/expense', require('./routes/expense'));

//Start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Server is listening on port ' + port);