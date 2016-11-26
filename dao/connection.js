const mysql = require('mysql');
const bluebird = require('bluebird');

const connection = bluebird.promisifyAll(mysql.createConnection({
    host: '95.140.195.69',
    user: 'A09155216',
    password: 'A09155216',
    database: 'A09155216'
}));

// const connection = bluebird.promisifyAll(mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
// }));

connection.connect();

module.exports = connection;
