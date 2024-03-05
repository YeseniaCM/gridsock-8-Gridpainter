const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post("/login", (req,res) =>{
  let userEmail = req.body.email;
  let userPassword = req.body.password;

  connection.connect((err) =>{
    if (err) {
      console.log("err", err);
      return res.status(500).json({ error: "Error connection to server." });
    }
    
    let query = "SELECT * FROM users WHERE userEmail = ? AND userPassword = ?";
    let values = [userEmail, userPassword];

    connection.query(query, values, (err, result) =>{
      if (err) console.log("err", err);

      if (result.length > 0){
        res.json(result[0]);
      }else {
        res.status(401).json({ error: "Wrong email or password." });
      }
      
    })
  })

})


module.exports = router;
