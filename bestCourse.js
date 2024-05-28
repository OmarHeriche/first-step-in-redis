const express = require("express");
const axios = require("axios");
const redis = require("redis");

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

// app.get("/posts/endPoint_0", async (req, res) => {
//   let posts = null;
//   await client.get("posts", async (error, posts) => {
//     if (error) {
//       console.log(error);
//       return;
//     } else if (posts !== null) {
//       return res.json({ data: JSON.parse(posts), msj: "cach hit" });
//     }
//     posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
//     client.set("posts", JSON.stringify(posts.data));
//     res.status(200).json({
//       data: posts.data,
//       msj: "miss cach",
//     });
//   }).then(data=>{
//     res.status(200).json({
//       data: data,
//       msj: "miss cach",
//     });
//   });
// });

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  post = null;
  post = await client.get(`post-${id}`); //! hit the cach
  if (post) {
    post = JSON.parse(post);
    return res.status(200).json({
      data: post,
      msj: "hit cach",
    });
  }
  post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  client.set(`post-${id}`, JSON.stringify(post.data)); //! load in the cach
  res.status(200).json({
    data: post.data,
    msj: "miss cach",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
