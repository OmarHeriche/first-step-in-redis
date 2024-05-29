const express = require("express");
const axios = require("axios");
const redis = require("redis");
require("dotenv").config();

const client = redis.createClient();
client.connect();

const app = express();
app.use(express.json());

app.get("/posts", async (req, res) => {
  let posts = null;
  posts = await client.get("posts");
  if (posts) {
    return res.status(200).json({
      data: JSON.parse(posts),
      msj: "hit cach",
    });
  }
  posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
  client.set("posts", JSON.stringify(posts.data));
  res.status(200).json({
    data: posts.data,
    msj: "miss cach",
  });
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  post = null;
  post = await client.get(`post-${id}`); //! hit the cach
  if (post) {
    post = JSON.parse(post);
    return res.status(200).json({
      msj: "hit cach",
      data: post,
    });
  }
  post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  client.set(`post-${id}`, JSON.stringify(post.data)); //! load in the cach
  res.status(200).json({
    msj: "miss cach",
    data: post.data,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
