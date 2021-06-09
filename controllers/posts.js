import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; //getting the starting index of every page
    const total = await PostMessage.countDocuments({});
    console.log("total records are", total);

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    console.log("in try, below are getPosts node js");
    //console.log(posts);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });

    console.log("last line of try");
  } catch (error) {
    console.log("in catch getPosts node js");
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("in try of getPost node js");
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    console.log("in catch getPost node js");
    res.status(404).json({ message: error });
  }
};

//QUERY = /posts?page=1 --> page = 1  //QUERY is used when we want to query some data.
//PARAMS = /posts/:id -- > /posts/123   --> id=123   // PARAMS is used when we want some specific resource

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    console.log("searched posts are below");
    // console.log(posts);
    res.json({ data: posts });
  } catch (error) {
    console.log("in getPostsBySearch node js ::", error);
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body; // frontend ka sab data req.body mai aata hai , in post request
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    console.log("in try createPost node js");
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log("in catch createPost node js");
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  console.log("id is" + _id);
  const post = req.body;
  console.log("changed post is below");
  console.log(post);

  try {
    console.log("in try updatePost node js");
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      console.log("id wrong hai in update node");
      return res.status(404).send("No post with that id for updating");
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    console.log("updatedPost is below");
    console.log(updatedPost);
    res.json(updatedPost);
  } catch (error) {
    console.log("in catch updatePost node js");
    res.json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("in try deletePost node js");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("id wrong hai in delete node");
      return res.status(404).send("No post with that id for deleting");
    }
    await PostMessage.findByIdAndRemove(id);
    res.json({ message: "Post deleted Successfully" });
  } catch (error) {
    console.log("in catch deletePost node js");
    res.json({ message: error });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("in try likePost node js");
    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log("in catch likePost node js ::", error);
    res.json({ message: error });
  }
};

/* export const dislikePost = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("in try dislikePost node js");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("id wrong hai in dislikePost node");
      return res.status(404).send("No post with that id for dislikePost");
    }
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { dislikeCount: post.dislikeCount - 1 },
      { new: true }
    );
    // console.log("Like updatedPost is below");
    // console.log(updatedPost);

    res.json(updatedPost);
  } catch (error) {
    console.log("in catch dislikePost node js");
    res.json({ message: error });
  }
};
 */

export const dislikePost = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("in try dislikes node js");
    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.dislikes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.dislikes.push(req.userId);
    } else {
      post.dislikes = post.dislikes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log("in catch dislikes node js ::", error);
    res.json({ message: error });
  }
};
