const fs = require('fs');

function getConfig() {
    const defaultConfig = './config/server.json';
    const fallbackConfig = './config/server-example.json';

    let config;

    if (fs.existsSync(defaultConfig)) {
        config = require(defaultConfig);
    } else if (fs.existsSync(fallbackConfig)) {
        console.log('');
        console.log(`You are using the fallback config: ${fallbackConfig}`);
        console.log(`The usual config should be: ${defaultConfig}`);
        console.log(`please provide a usual config (copy the example)`);
        console.log('');

        config = require(fallbackConfig);
    } else {
        console.log('');
        console.log('can not find a config, giving up start');
        console.log('');
        process.exit(1);
    }

    if (!fs.existsSync(config.database)) {
        console.log(`database-file does not exists: ${config.database}`);
        process.exit(2);
    }

    return config;
}


module.exports = {
    getConfig
};