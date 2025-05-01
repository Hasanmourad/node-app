const express = require('express');
const mysql = require('mysql');
const redis = require('redis');

const app = express();
const port = 3000;

// MySQL connection config (connection made per request)
function connectToMySQL() {
  return mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT
  });
}

app.get("/db", (req, res) => {
  const connection = connectToMySQL();

  connection.connect((err) => {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      res.status(500).send("db connection failed");
    } else {
      console.log('Connected to database.');
      res.send("db connection successful");
    }
    connection.end();
  });
});

// Redis client (only one needed)
const client = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
});

client.on('error', (err) => {
  console.log('Redis Error: ' + err);
});

app.get('/redis', (req, res) => {
  client.set('foo', 'bar', (error, reply) => {
    if (error) {
      console.error(error);
      res.status(500).send("redis connection failed");
    } else {
      console.log(reply);
      res.send("redis is successfully connected");
    }
  });
});

// Export for testing
module.exports = app;


}
