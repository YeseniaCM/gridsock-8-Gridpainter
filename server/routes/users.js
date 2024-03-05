var express = require('express');
var router = express.Router();
const connection = require('../lib/conn.js')
const { randomUUID } = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create a new user
router.post('/add', function(req, res) {
  let userName = req.body.userName;
  let userEmail = req.body.userEmail;
  let userPassword = req.body.userPassword;
  let userId = randomUUID();

  let sql = "INSERT into users (userId, userName, userEmail, userPassword) VALUES (?, ?, ?, ?)";
  let values = [userId, userName, userEmail, userPassword];

  connection.query(sql, values, (err, data) => {
    if (err) console.log("err", err);
    res.json({ message: "Your account has been created"});
  })
})

module.exports = router;
