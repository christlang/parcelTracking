const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {ensureLoggedIn } = require('connect-ensure-login');
const parcelRouter = require('./parcel');
const auth = require('./auth');

const app = express();

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

auth(app);

app.get('/', (request, response) => response.redirect('/parcel'));

app.use(morgan('common', { immediate: true }));

app.use('/parcel', ensureLoggedIn('/login.html', parcelRouter));

app.use('/parcel', parcelRouter);

app.listen(8080, () => {
    console.log('Server is listening to http://localhost:8080');
});