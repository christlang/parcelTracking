const express = require('express');
const parcelRouter = require('./parcel');

const app = express();

app.get('/', (request, response) => response.redirect('/parcel'));

app.use('/parcel', parcelRouter);

app.listen(8080, () => {
    console.log('Server is listening to http://localhost:8080');
});