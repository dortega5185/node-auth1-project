const router = require("express").Router();

const Users = require("./users-model.js");

// its better to put this in a seperate file for future
function restricted(req, res, next) {
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({ you: "You shall not pass!" });
  }
}

// this is makes it global middleware
router.use(restricted);

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
