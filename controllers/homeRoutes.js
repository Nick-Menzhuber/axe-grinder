const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.post("/", withAuth, async (req, res) => {
  console.log('string', req)
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
       include: [
         {
          model: User,
          attributes: ['name'],
       },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));


    const newPosts = posts.map((post) => {
      console.log("post", post.user.name);
      return {
        ...post,
        userName: post.user?.name
      }
    })
    console.log("newPosts", newPosts);
    // Pass serialized data and session flag into template
    res.render("homepage", {
    newPosts,
    //posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).send(err);
  }
})

// GET ONE POST AND LOAD COMMENTS
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        }, 
        {
          model: Comment,
          attributes: ["text"],
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    res.render('comment', { post, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("post", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/aboutus", (req, res) => {
  res.render("aboutus", {
    logged_in: req.session.logged_in,
  });
});

router.get("/contactus", (req, res) => {
  res.render("contactus", {
    logged_in: req.session.logged_in,
  });
});

router.get("/account", (req, res) => {
  res.render("account", {
    logged_in: req.session.logged_in,
  });
});
module.exports = router;
