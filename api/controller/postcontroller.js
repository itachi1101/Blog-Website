const Post = require("../models/postSchema");
/// creating a new post
module.exports.blog_post = async (req, res) => {
  const { title, description, username } = req.body;
  try {
    const post = await Post.create({ title, description, username });
    res.status(201).json({ post: post._doc });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// get all posts
module.exports.blog_get = async (req, res) => {
  try {
    const allPosts = await Post.find({});
    if (!allPosts) res.status(404).json({ posts: "no post found" });
    else {
      res.status(200).json(allPosts);
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// get post by id
module.exports.blog_getByid = async (req, res) => {
  const _id = req.params.id;
  try {
    const allPosts = await Post.findById(_id);
    if (!allPosts) res.status(404).json({ posts: "no posts found" });
    else {
      res.status(200).json({ data: allPosts });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// getting users post
module.exports.blog_usersPost = async (req, res) => {
  const username = req.query.user;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    }
    if (posts.length > 0) res.status(200).json(posts);
    else res.status(404).json({ posts: "Posts not found" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// deleting a post
module.exports.blog_deletePost = async (req, res) => {
  const _id = req.params.id;
  try {
    const post = await Post.findByIdAndDelete(_id);
    if (!post) return res.status(400).send();
    res.send(post);
  } catch (err) {
    res.status(500).json({ err: error });
  }
};

// update a post
module.exports.blog_updatePost = async (req, res) => {
  console.log(req.params.id)
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};
