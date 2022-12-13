const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/new', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);

    req.session.save(() => {
      req.session.user_id = commentData.id;
      req.session.logged_in = true;

      res.status(200).json(commentData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('delete/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;