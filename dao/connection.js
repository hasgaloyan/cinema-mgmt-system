const mysql = require('mysql');
const bluebird = require('bluebird');

const connection = bluebird.promisifyAll(mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
}));

connection.connect();

module.exports = connection;
