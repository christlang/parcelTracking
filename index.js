const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const parcelRouter = require('./parcel');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, response) => response.redirect('/parcel'));

app.use(morgan('common', { immediate: true }));

app.use('/parcel', parcelRouter);

app.listen(8080, () => {
    console.log('Server is listening to http://localhost:8080');
});