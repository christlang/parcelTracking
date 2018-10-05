// is used on the console
/* eslint no-console: "off" */

const fs = require('fs');

function checkDatabaseAvailableOrExit(database) {
  if (!fs.existsSync(database)) {
    console.log(`database-file does not exists: ${database}`);
    process.exit(2);
  }
}

function getFilContenteAsJson(file) {
  return JSON.parse(fs.readFileSync(file, 'UTF-8'));
}

function readConfigOrFallback(config, fallback) {
  if (fs.existsSync(config)) {
    return getFilContenteAsJson(config);
  }

  if (fs.existsSync(fallback)) {
    console.log('');
    console.log(`You are using the fallback config: ${fallback}`);
    console.log(`The usual config should be: ${config}`);
    console.log('please provide a usual config (copy the example)');
    console.log('');

    return getFilContenteAsJson(fallback);
  }

  return null;
}

function getConfig() {
  const configFile = './config/server.json';
  const fallbackFile = './config/server-example.json';

  const config = readConfigOrFallback(configFile, fallbackFile);

  if (config === null) {
    console.log('');
    console.log('can not find a config, giving up start');
    console.log('');
    process.exit(1);
  }

  checkDatabaseAvailableOrExit(config.database);

  return config;
}


module.exports = {
  getConfig,
};
