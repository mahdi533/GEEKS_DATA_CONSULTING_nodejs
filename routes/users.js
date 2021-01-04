var express = require('express');
var router = express.Router();
var User = require('../models/users');


router.post('/addUser',(req, res, next) => {
  const user = new User({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    telp : req.body.telp,
    adresse :req.body.adresse,
    email  : req.body.email,
    password  : req.body.password,
    nbrVote:0,
  })

  user.save().then((u) => {
    console.log("user created");
    res.status(201).json({
      message: "user created",
      user: u
    })
  }).catch(err => {
    console.log(err);
  })
    
 
})

router.get('/allUsers', (req, res, next) => {
  
  User.find().then((u) => {
    res.status(200).json({
      message: "all users",
      user: u
    })
  }).catch(err => {
    console.log(err);
  });

})


router.get('/getUserById/:id', (req, res) => {
 
  User.findById(req.params.id).then((u) => {
    res.status(200).json({
      message: "all users",
      user: u
    })
  }).catch(err => {
    console.log(err);
  });


})





module.exports = router;
