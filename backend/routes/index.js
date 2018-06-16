var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let jwt = require('express-jwt');
let auth = jwt({secret: process.env.ANIMAL_BACKEND_SECRET});

let Animal = mongoose.model('Animal');
let User = mongoose.model('User');
/*GET*/
router.get('/API/animals/', function (req, res, next) {
  Animal.find(function (err, animals) {
    if (err) {
      return next(err);
    }
    res.json(animals);
  });
});

/*GET BY ID*/
router.param('animal', function (req, res, next, id) {
  let query = Animal.findById(id);
  query.exec(function (err, animal) {
    if (err) {
      return next(err);
    }
    if (!animal) {
      return next(new Error('not found ' + id));
    }
    req.animal = animal;
    return next();
  });
});

router.get('/API/animals/:animal', function (req, res) {
  res.json(req.animal);
});

/*POST*/
router.post('/API/animals/',auth, function (req, res, next) {
  let animal = new Animal(req.body);
  animal.save(function (err, rec) {
    if (err) {
      return next(err);
    }
    res.json(rec);
  });
});

/*update*/
router.put('/API/animals/:animal', function (req, res, next) {
  req.animal.update(req.body, function (err, rec) {
    if (err) {
      return next(err);
    }
    res.json(rec);
  });
});

/*Delete*/
router.delete('/API/animals/:animal', function (req, res, next) {

  req.animal.remove(function (err) {

    if (err) {
      return next(err);
    }
    User.find({}, function (err, users) {
      if (err) { return handleError(next, err); }
      if (!users) { return handleError(next, "Couldn't find user"); }
      
      users.forEach(user => {
        user.animals.remove(req.animal._id);
        user.save(function (err) {
          if (err) { return handleError(next, err); }
        })
      })
    });
  
    res.json("removed animal");
  });
})


router.get('/API/animals/get/:username',auth, function (req, res, next) {
  User.findOne({
    username: req.params.username
  }).populate({
    path: 'animals',
    model: 'Animal',
    
  }).exec(function(err, user) {
    if(err) { return handleError(next, err); }
    if(!user) { return handleError(next, "Couldn't find user"); }

    return res.json(user.animals);
  });
});
 

router.post('/API/animals/add/:username', function(req, res, next) {
  User.findOne({
    username: req.params.username
  }, function(err, user) {
    if(err) { return handleError(next, err); }
    if(!user) { return handleError(next, "Could not find user"); }

    let animal = new Animal(req.body);

    animal.save(function(err) {
      if(err) { return handleError(next, err); }

      user.animals.push(animal);
      user.save(function(err) {
        if(err) { return handleError(next, err); }

        return res.json(animal);
      });
    });
  });
});
router.post('/API/reset_db', auth, (req, res, next) => {
  Animal.find({}, (err, animals) => {
      animals.forEach(animal => animal.remove());
  });
  User.find({}, (err, users) => {
      users.forEach(user=> user.remove());
  });
  res.status(204).end();
});

function handleError(next, err, custom) {
  var errormessage = "ERROR: " + err.message;
  if(custom) {
    errormessage = errormessage + " | CUSTOM: " + custom;
  }
  console.log(errormessage);
  return next(err);
}

  
  

module.exports = router;
