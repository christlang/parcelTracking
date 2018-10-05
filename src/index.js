// is used on the console
/* eslint no-console: "off" */
const https = require('https');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { ensureLoggedIn } = require('connect-ensure-login');
const responseTime = require('response-time');
const parcelRouter = require('./parcel');
const auth = require('./auth');

const config = require('./config').getConfig();

const app = express();

app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(responseTime((request, response, time) => {
  if (request.user) {
    console.log(`response-time: ${request.user.username}, ${request.url}, ${time}`);
  } else {
    console.log(`response-time: undefined, ${request.url}, ${time}`);
  }
}));

auth(app);

app.get('/', (request, response) => response.redirect('/parcel'));

app.use(morgan('common', { immediate: true }));

app.use('/parcel', ensureLoggedIn('/login.html', parcelRouter));

app.use('/parcel', parcelRouter);

if (fs.existsSync(config.https.keyFile) && fs.existsSync(config.https.certFile)) {
  const options = {
    key: fs.readFileSync(config.https.keyFile),
    cert: fs.readFileSync(config.https.certFile),
  };

  https.createServer(options, app).listen(config.port, () => {
    console.log(`Server is listening to https://localhost:${config.port}`);
  });
} else {
  console.log('');
  console.error('does not found key / cert files - fallback to http');
  console.error(`expected keyFile: ${config.https.keyFile}`);
  console.error(`expected certFile: ${config.https.certFile}`);
  console.log('');

  app.listen(config.port, () => {
    console.log(`Server is listening to http://localhost:${config.port}`);
  });
}
