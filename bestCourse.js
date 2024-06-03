const express = require("express");
const axios = require("axios");
const redis = require("./redis");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/posts", async (req, res) => {
    try {
        let posts = null;
        posts = await redis.get("posts");
        if (posts) {
            return res.status(200).json({
                msj: "hit cach",
                data: posts,
            });
        }
        posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
        await redis.set("posts", JSON.stringify(posts.data));
        res.status(200).json({
            msj: "miss cach",
            data: posts.data,
        });
    } catch (error) {
        res.status(500).json({
            msj: "error",
            data: error,
        });
    }
});

app.get("/", (req, res) => {
    res.status(200).send("hello there");
});
app.get("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let post = null;
        post = await redis.get(`post-${id}`); //! hit the cach
        if (post) {
            post = post;
            return res.status(200).json({
                msj: "hit cach",
                data: post,
            });
        }
        post = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        await redis.set(`post-${id}`, JSON.stringify(post.data)); //! load in the cach
        res.status(200).json({
            msj: "miss cach",
            data: post.data,
        });
    } catch (error) {
        res.status(500).json({
            msj: "error",
            data: error,
        });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
