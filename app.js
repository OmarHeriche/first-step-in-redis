const express = require("express");
const axios = require("axios");
const redis = require("redis");

const client = redis.createClient();

const app = express();
app.use(express.json());

client.connect();
app.post("/", async (req, res) => {
  const { key, value } = req.body;
  const result = await client.set(key, value);
  res.json({ result });
});
app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  //! check the ram: 
  let posts = null;
  posts = await client.get(`post-${id}`);
  if (posts !== null) {
    return res.status(200).json({ data: JSON.parse(posts), msg: "cach hit" });
  }
  //! go to outside ressources:
  posts = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  //!store new posts in the ram:
  await client.setEx(`post-${id}`, 30,JSON.stringify(posts.data));
  res.status(200).json({ data: posts.data, msg: "cach miss" }); 
});
 
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
});
