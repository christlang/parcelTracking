const fs = require('fs');

function getConfig() {
    const defaultConfig = './config/server.json';
    const fallbackConfig = './config/server-example.json';

    if (fs.existsSync(defaultConfig)) {
        return require(defaultConfig);
    } else if (fs.existsSync(fallbackConfig)) {
        console.log('');
        console.log(`You are using the fallback config: ${fallbackConfig}`);
        console.log(`The usual config should be: ${defaultConfig}`);
        console.log(`please provide a usual config (copy the example)`);
        console.log('');

        return require(fallbackConfig);
    } else {
        console.log('');
        console.log('can not find a config, giving up start');
        console.log('');
        process.exit(1);
    }
}


module.exports = {
    getConfig
};