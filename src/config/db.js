import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_db'
});

db.connect(err => {
    if (err) {
        console.log('DB error:', err);
    } else {
        console.log('Connected to DB');
    }
});

export default db.promise();