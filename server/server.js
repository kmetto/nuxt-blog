const freePort = require('find-free-port');
const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');
const Posts = require('./models/Posts');
const Post = require('./models/Post');

const POSTS_FOLDER = path.resolve(__dirname, 'posts');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/posts', (req, res) => {
  const postsModel = new Posts();
  const posts = postsModel.all().then(posts => res.send(JSON.stringify(posts)));
});

app.get('/posts/:slug', (req, res) => {
    const postSlug = req.params.slug;
    const post = new Post(postSlug);
    res.send(JSON.stringify(post));
});

freePort(4000, (err, freePort) => {
  app.listen(freePort, function () {
    console.log(`Example app listening on port ${freePort}!`);
  });
});
