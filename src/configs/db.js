const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
const password = process.env.PASS;
const db = process.env.db;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: db
});

// Kết nối tới cơ sở dữ liệu
connection.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối tới cơ sở dữ liệu: ' + err.stack);
        return;
    }
    console.log('Kết nối tới cơ sở dữ liệu thành công');
});

module.exports = connection;
