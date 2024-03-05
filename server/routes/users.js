
var express = require('express');
var router = express.Router();
const connection = require('../lib/conn.js')
const { randomUUID } = require('crypto');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Log in user
router.post("/login", (req,res) =>{
  let userEmail = req.body.userEmail;
  let userPassword = req.body.userPassword;

  connection.connect((err) =>{
    if (err) {
      console.log("err", err);
      return res.status(500).json({ error: "Error connection to server." });
    }
    
    let query = "SELECT * FROM users WHERE userEmail = ? AND userPassword = ?";
    let values = [userEmail, userPassword];

    connection.query(query, values, (err, result) =>{
      console.log(result)
      if (err) console.log("err", err);

      if (result.length > 0){
        res.json(result);
      }else {
        res.status(401).json({ message: "Wrong email or password." });
      }
      
    })
  })

})



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

    let sql = `SELECT * FROM users WHERE userID = ?`
    let values = [userId]

    connection.query(sql, values , (err, data) =>{
      if (err) throw err;

      data.map(user => {
        delete user.userPassword
      })

      res.json(data)
    })
  })
})


module.exports = router;
