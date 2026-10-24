import mysql from 'mysql2/promise';

let pool;
console.log(process.env.DB_HOST);
if (!global._mysqlPool) {
  global._mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '3306'),
  });
}

pool = global._mysqlPool;

export default pool;