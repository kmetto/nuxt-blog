const freePort = require('find-free-port');
const express = require('express');

const app = express();
const Posts = require('./models/Posts');
const Post = require('./models/Post');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/posts', (req, res) => {
  const postsModel = new Posts();
  postsModel.all().then(posts => res.send(JSON.stringify(posts)));
});

app.get('/posts/:slug', (req, res) => {
  const postSlug = req.params.slug;
  const post = new Post(postSlug);
  res.send(JSON.stringify(post));
});

freePort(4000, (err, port) => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`); // eslint--disable-line
  });
});
