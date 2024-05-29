const express = require("express");
const axios = require("axios");
const redis = require("redis");
require("dotenv").config();

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || 6379;

const client = redis.createClient({
  host: redisHost,
  port: redisPort,
});

const app = express();
app.use(express.json());

app.get("/posts", async (req, res) => {
  try {
    let posts = await client.get("posts");
    if (posts) {
      return res.status(200).json({
        data: JSON.parse(posts),
        msj: "hit cache",
      });
    }
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    posts = response.data;
    await client.set("posts", JSON.stringify(posts));
    res.status(200).json({
      data: posts,
      msj: "miss cache",
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let post = await client.get(`post-${id}`);
    if (post) {
      return res.status(200).json({
        msj: "hit cache",
        data: JSON.parse(post),
      });
    }
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    post = response.data;
    await client.set(`post-${id}`, JSON.stringify(post));
    res.status(200).json({
      msj: "miss cache",
      data: post,
    });
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    res.status(500).json({ error: `Error fetching post ${id}` });
  }
});

const startServer = async () => {
  try {
    client.on("error", function(error) {
      console.error("Redis connection error:", error);
    });

    await client.connect();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Server startup error:', err);
  }
};

startServer();
