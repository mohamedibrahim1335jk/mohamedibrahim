const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 8080,
  user: mohamed,
  password: 123456,
  database: usersdata
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', (req, res) => {
  const { email, password, weight, desired_weight, height, diseases } = req.body;

  const diseasesStr = diseases ? diseases.join(',') : null;


  pool.query('INSERT INTO user_data (email, password, weight, desired_weight, height, disease_name) VALUES (?, ?, ?, ?, ?, ?)', [email, password, weight, desired_weight, height, diseasesStr], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error inserting user data into database');
    } else {
      console.log('User data inserted into database');
      res.status(200).send('User data inserted into database');
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});