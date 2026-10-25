const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'assignDBuser',
  password: 'assignDBpass',
  database: 'assignDB'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to assignDB');
});

function getUsers(callback) {
  const sql = 'SELECT userID AS id, fname, lname, username FROM users';
  connection.execute(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return callback(null);        // no throw — server.js expects an array
    }
    callback(results);
  });
}

function addUser(user, callback) {
  const sql = 'INSERT INTO users (fname, lname, username, passwd) VALUES (?, ?, ?, ?)';
  const values = [user.fname, user.lname, user.username, user.passwd];

  connection.execute(sql, values, (err, results) => {
    if (err) {
      console.error('Error adding user:', err);
      return callback(null);
    }
    user.id = results.insertId;
    callback(user);
  });
}

module.exports = { getUsers, addUser };