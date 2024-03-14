const express = require("express");
const redis = require("redis");
const util = require("util");



const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);

client.set = util.promisify(client.set);

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const { key, value } = req.body;
  const result = await client.set(key, value);
  res.json(result);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
