const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');
const chalk = require('chalk');

router.get('/', withAuth, async (req, res) => {

  try {
    const postData = await Post.findAll({
      where: {
        // TODO: Done SET USERID userId TO THE REQUEST SESSION LOGGED-IN USER ID
        userId: req.session.userId,
      },
    });
// console.log(chalk.blue("^^^^^^^^^^^^^^^postData ", postData));
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts-admin', {
  
      layout: 'dashboard',
      posts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
