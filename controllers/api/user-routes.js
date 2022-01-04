const router = require('express').Router();
const { User } = require('../../models');
const chalk = require ('chalk');

// URL: /api/user   Signup goes here. Auto log in
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      // TODO:DONE SET USERNAME TO USERNAME SENT IN REQUEST
        username: req.body.username,
        password: req.body.password,

      // TODO:DONE SET PASSWORD TO PASSWORD SENT IN REQUEST
    });

    req.session.save(() => {
      // TODO: SET USERID userId IN REQUEST SESSION TO ID RETURNED FROM DATABASE
        req.session.userId= newUser.id;

      // TODO: SET USERNAME username IN REQUEST SESSION TO USERNAME RETURNED FROM DATABASE
        req.session.username = newUser.username;
      // TODO: SET LOGGEDIN loggedIn TO TRUE IN REQUEST SESSION
        req.session.loggedIn = true;
      res.json(newUser);
      // console.log("session created ", req.session);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// URL: /api/user/login
router.post('/login', async (req, res) => {
  // console.log (chalk.blue("in /api/user/login"));
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }
    console.log (chalk.blue("/api/user/login user ", {user}));
    const validPassword = user.checkPassword(req.body.password);
    console.log (chalk.blue("/api/user/login req.body ", req.body.password));
    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      // TODO: SET USERID userId IN REQUEST SESSION TO ID RETURNED FROM DATABASE
        req.session.userId = user.id;
        req.session.test = "Test";

      // TODO: SET USERNAME username IN REQUEST SESSION TO USERNAME RETURNED FROM DATABASE
        req.session.username = user.username;
      // TODO: SET LOGGEDIN loggedIn TO TRUE IN REQUEST SESSION
        req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
