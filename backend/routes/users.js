var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let passport = require('passport');

function handleError(next, err, custom) {
  var errormessage = "ERROR: " + err.message;
  if (custom) {
    errormessage = errormessage + " | CUSTOM: " + custom;
  }
  console.log(errormessage);
  return next(err);
}

router.post('/register', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Please fill out all fields'
    });
  }
  let user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.money = 30;
  user.lastReward = new Date()
  user.food = 10;
  user.drink = 10;
  user.save(function (err) {
    if (err) {
      return next(err);
    }
    return res.json({
      token: user.generateJWT()
    });
  });
});

router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Please fill out all fields'
    });
  }
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.json({
        token: user.generateJWT()
      });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/checkusername', function (req, res, next) {
  User.find({
      username: req.body.username
    },
    function (err, result) {
      if (result.length) {
        res.json({
          'username': 'alreadyexists'
        })
      } else {
        res.json({
          'username': 'ok'
        })
      }
    });
});


router.get("/get/:username", function (req, res, next) {
  User.findOne({
    username: req.params.username
  }).exec(function (err, user) {
    if (err) {
      return handleError(next, err);
    }
    if (!user) {
      return handleError(next, "Couldn't find user");
    }

    return res.send(user.returnJSONProfile())
  });
})

router.put("/update/:username", function (req, res, next) {
  User.findOne({
    username: req.params.username
  }).exec(function (err, user) {
    if (err) {
      return handleError(next, err);
    }
    if (!user) {
      return handleError(next, "Couldn't find user");
    }
    console.log(req.body)
    user.update(req.body, function (err, rec) {
      if (err) {
        return next(err);
      }
      res.json(rec);
    });
  });
});



module.exports = router;
