const router = require("express").Router();
const { Post } = require("../../models");
//const withAuth = require("../../utils/auth");

//needs withAuth added to post request
router.post("/new", async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newPost);
    res.status(200).json("Posted!");
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
