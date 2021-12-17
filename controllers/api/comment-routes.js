const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// URL: /api/comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      // TODO: COMMENT BODY IN REQUEST USING SPREAD
      // doing the spread makes a copy of all the object properties
      // and adding a new property, user_id
      ...req.body,
      user_id: req.session.user_id,
      // TODO:- DONE SET USERID userId TO SESSION LOGGEDIN USERID
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
