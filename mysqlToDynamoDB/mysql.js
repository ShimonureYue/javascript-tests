const mysql = require('mysql');
const util = require('util');

const config = {
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  port     : process.env.PORT,
};

const conn = mysql.createConnection(config);
const query = util.promisify(conn.query).bind(conn);

module.exports = {
  conn,
  query
};
