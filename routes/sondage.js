var express = require('express');
var router = express.Router();
var Sondage = require('../models/sondage');
var User = require('../models/users');

router.post('/addSondage/:id', (req, res, next) => {

  const sondage = new Sondage({
    titre: req.body.titre,
    description: req.body.description,
    choix: false,
    nombreDeVote: 0,
    idUser: req.params.id,
  })
  sondage.save().then((u) => {
    console.log("user created");
    res.status(201).json({
      message: "user created",
      sondage: u
    })
  }).catch(err => {
    console.log(err);
  })
})

router.get('/allSondage', (req, res, next) => {
  Sondage.find().then((u) => {
    res.status(200).json({
      message: "all users",
      sondage: u
    })
  }).catch(err => {
    console.log(err);
  });

});
router.put('/updateSondage/:idSondage/:idUser', (req, res, next) => {
  User.findById(req.params.idUser).then((u) => {
    const nbr = u.nbrVote;
    if (nbr < 5) {
      User.findByIdAndUpdate(req.params.idUser, { nbrVote: nbr + 1 }).then(() => {
       
      }).catch((err) => {
        res.status(400).json({
          error: err
        });
      }).then(() => {
        Sondage.findById(req.params.idSondage).then((u) => {
          const nombre = u.nombreDeVote;
          Sondage.findByIdAndUpdate(req.params.idSondage,
            {
              choix: true,
              nombreDeVote: nombre + 1,
            }).then(() => {
              res.status(201).json({
                message: "updated successfully sondage!",
              })
            }).catch((err) => {
              res.status(400).json({
                error: err
              });
            });
        });
      })

    }else{
      res.status(400).json({
        message: "voter que sur 5 sujets toutes les 24Heures !",
      })
    }
  })


});

router.get('/getSondageById/:id' , (req, res) => {
  
  Sondage.findById(req.params.id).then((u) => {
    console.log(u);
     res.status(200).json({
       message: "Sondage",
       sondage:u
     })
   }).catch(err => {
     console.log(err);
   });
 

 
 })
 

module.exports = router;