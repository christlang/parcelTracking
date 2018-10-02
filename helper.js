const bcrypt = require('bcrypt');
const nobot = require('commander');
const prompt = require('prompt');
const sqlite = require('sqlite3');
const sh = require('shelljs');
const fs = require('fs');

const {version} = require('./package');
const config = require('./src/config').getConfig();

function dbUserList() {
    const db = new sqlite.Database(config.database);
    const queryString = `SELECT * FROM Users`;

    db.all(queryString, (error, results) => {
        if (error) {
            console.error(error);
        } else {
            console.log('username, firstname, lastname');
            results.forEach(user => {
                console.log(`${user.username}, ${user.firstname}, ${user.lastname}`);
            });
        }
    });
}

function sqlRemoveUser(username) {
    return new Promise((resolve, reject) => {
        const db = new sqlite.Database(config.database);
        const queryString = 'DELETE FROM Users WHERE username = ?';
        db.get(queryString, [username], (error, result) => {
            if (error) {
                reject(error);
            } else if (result) {
                resolve(result);
            } else {
                resolve('');
            }
        });
    });
}

function sqlAddUser(username, firstname, lastname, hash) {
    return new Promise((resolve, reject)  => {
        const db = new sqlite.Database(config.database);
        const queryString = 'INSERT INTO Users ' +
            '(`firstname`, `lastname`, `username`, `password`) ' +
            'VALUES ' +
            '(?, ?, ?, ?)';

        db.all(queryString,
            [firstname, lastname, username, hash],
            (error, results) => {
                if (error) {
                   reject(error);
                } else {
                    resolve('saved new user');
                }
            });
    });
}

function dbUserAdd() {
    const db = new sqlite.Database(config.database);

    prompt.start();
    console.log('');
    console.log(`you are working on ${config.database}`);
    console.log('');
    prompt.get([{
            name: 'username',
        }, {
            name: 'firstname'
        }, {
            name: 'lastname'
        }, {
            name: 'password',
            hidden: true
        }, {
            name: 'confirm',
            hidden: true
        }
        ], (err, result) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        const {username, firstname, lastname, password, confirm} = result;
        let passwordHash;

        bcrypt.hash(password, 10)
            .then(hash => {
                console.log('hash: ', hash);
                passwordHash = hash;
                return bcrypt.compare(confirm, hash)
            })
            .then(res => {
                if (res) {
                    console.log('password  confirmed');
                } else {
                    return Promise.reject('password is not equal');
                }

            })
            .then(() => sqlRemoveUser(username))
            .then(console.log)
            .then(() => sqlAddUser(username, firstname, lastname, passwordHash))
            .then(console.log)
            .then(() => console.log('input received - user created'))
            .catch(err => {
                console.error('');
                console.error(err);
            });
    });

}

function dbUserDel(username) {
    sqlRemoveUser(username)
        .then(result => {
            console.log('');
            console.log(`${username} deleted`);
            console.log(result);
        })
        .catch(error => {
            console.error('got problem:');
            console.error(error);
        })
}

function run(cmd) {
    return new Promise((resolve, reject) => {
        sh.exec(cmd, function(code, stdout, stderr) {
            console.log(`Command: ${cmd}`);
            console.log('Exit code:', code);
            console.log('output:', stdout);
            console.log('stderr:', stderr);
            if (code === 0) {
                resolve();
            } else {
                reject(code);
            }
        });
    });
}

function backupDB() {
    const backupRoot = 'dbBackup';
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDay();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const folderName = `${year}_${month}_${day}__${hour}_${min}_${sec}`;
    const backupPath = `${backupRoot}/${folderName}`;
    sh.mkdir('-p', backupPath);
    sh.cp(config.database, backupPath);
}

function update() {
    const tagName = config.docker.tagName;
    const containerName = config.docker.containerName;
    const dockerPortIntern = config.port;
    const dockerPortExtern = config.docker.exposedPort;
    const dbFile = config.database;
    run('git pull')
        .catch(() => process.exit(1))
        .then(() => run(`sudo docker stop ${containerName}`)) // stop before db-migration
        .then(() => run(`sudo docker wait ${containerName}`)) // wait for stopdoc
        .catch(() => console.log('ignore if container was not running'))
        .then(() => backupDB())
        .then(() => run('npx db-migrate up --env prod'))
        .then(() => run(`sudo docker build -t ${tagName} .`))
        .then(() => run(`sudo docker rm ${containerName}`)) // delete old container
        .catch(() => console.log('ignore if container can not be delete (was not running)'))
        .then(() => run(`sudo docker run -p ${dockerPortExtern}:${dockerPortIntern} -v $(pwd)/${dbFile}:/usr/src/app/parcel.db --name ${containerName} -d ${tagName}`))
        .catch(error => console.log(error));
}


function requestServer() {
    return new Promise((resolve, reject) => {
        const http = require('http');

        http.get({
            hostname: 'localhost',
            port: config.port,
            timeout: 1000
        }, (resp) => {

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log('success');
                resolve();
            });

        }).on("error", (err) => {
            console.log(err.message);
            reject("Error: " + err.message);
        });
    });
}

function waitForServer() {

    let counter = 60;

    function requestServerLoop() {
        requestServer()
            .catch(() => {
                counter--;
                if (counter > 0) {
                    setTimeout(requestServerLoop, 1000);
                } else {
                    console.log('giving up');
                    process.exit(1);
                }
            });
    }

    requestServerLoop();
}

nobot
    .version(version);

nobot
    .command('user')
    .description('lists all users')
    .action(dbUserList);

nobot
    .command('user-add')
    .description('adds a user, details will be requested - overwrites user with same username')
    .action(dbUserAdd);

nobot
    .command('user-del <username>')
    .description('delets user identified by username')
    .action(dbUserDel);


nobot
    .command('update')
    .description('updates to last version in git, runs db-migration and creates new docker-instance')
    .action(update);

nobot
    .command('wait-for-server')
    .description('helps for ci-builds to wait until server is ready for ui-tests')
    .action(waitForServer);

nobot.parse(process.argv);

if (!process.argv.slice(2).length) {
    nobot.help();
}