const express = require("express");
const axios = require("axios");
const redis = require("redis");
require("dotenv").config();

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || 6379;

const client = redis.createClient({
  socket: {
    host: redisHost,
    port: redisPort,
  },
});

const app = express();
app.use(express.json());

app.get("/posts", async (req, res) => {
  let posts = await client.get("posts");
  if (posts) {
    return res.status(200).json({
      data: JSON.parse(posts),
      msj: "hit cache",
    });
  }
  posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
  await client.set("posts", JSON.stringify(posts.data));
  res.status(200).json({
    data: posts.data,
    msj: "miss cache",
  });
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  let post = await client.get(`post-${id}`);
  if (post) {
    return res.status(200).json({
      msj: "hit cache",
      data: JSON.parse(post),
    });
  }
  post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  await client.set(`post-${id}`, JSON.stringify(post.data));
  res.status(200).json({
    msj: "miss cache",
    data: post.data,
  });
});

const startServer = async () => {
  try {
    await client.connect();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Redis connection error:', err);
  }
};

startServer();
