const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get Post
router.get("/", async (req, res) => {
  const posts = await loadPostCollection();
  res.send(await posts.find({}).toArray());
});
// Add Post
router.post("/", async (req, res) => {
  const posts = await loadPostCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});
// Delete Post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostCollection() {
  const newLocal =
    "mongodb+srv://alfinforwork:alpin123@cluster0.nffia.mongodb.net/vue_express?retryWrites=true&w=majority";
  const client = await mongodb.MongoClient.connect(newLocal);
  return client.db("vue_express").collection("posts");
}

module.exports = router;
