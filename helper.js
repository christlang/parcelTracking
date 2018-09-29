const bcrypt = require('bcrypt');
const nobot = require('commander');
const prompt = require('prompt');
const sqlite = require('sqlite3');
const {stdin, stdout} = require('process');

const {version} = require('./package');
const config = require('./config').getConfig();

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

function sqlAddUser(username, firstname, lastname, password) {
    return new Promise((resolve, reject)  => {
        const db = new sqlite.Database(config.database);
        const queryString = 'INSERT INTO Users ' +
            '(`firstname`, `lastname`, `username`, `password`) ' +
            'VALUES ' +
            '(?, ?, ?, ?)';

        db.all(queryString,
            [firstname, lastname, username, password],
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

        bcrypt.hash(password, 10)
            .then(hash => {
                console.log('hash: ', hash);
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
            .then(() => sqlAddUser(username, firstname, lastname, password))
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

nobot.parse(process.argv);

if (!process.argv.slice(2).length) {
    nobot.help();
}