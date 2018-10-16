const mysql = require('mysql');

const connection = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'sampleDB'
});

module.exports = connection;