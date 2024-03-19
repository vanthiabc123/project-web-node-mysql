// user.js
const connection = require('../configs/db');
const bcrypt = require('bcrypt');

function createUsersTable() {
    const query = `
    CREATE TABLE  IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            gender VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL
        )
    `;
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        console.log('Bảng users được tạo hoặc đã tồn tại');
    });
}

function addUser(username, email, password, date, gender, phone, address) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            throw err;
        }

        const query = 'INSERT INTO users (username, email, password, date, gender, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [username, email, hashedPassword, date, gender, phone, address], (error, results, fields) => {
            if (error) {
                throw error;
            }
            console.log('ID được thêm vào:', results.insertId);
        });
    });
}
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query, [email], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}
module.exports = {
    createUsersTable,
    addUser,
    getUserByEmail
};
