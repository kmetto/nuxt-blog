const freePort = require('find-free-port');
const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');
const Post = require('./models/Post');

const POSTS_FOLDER = path.resolve(__dirname, 'posts');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const filterPosts = posts => posts.filter(post => post.match(/\.md$/));

const filterPostsMeta = posts => posts.filter(post => post.match(/\.json$/));

const extractPostName = postFile => postFile.split('.')[0];

const getPostsList = () => {
  return new Promise((resolve, reject) => {
    const postsList = fs.readdir(POSTS_FOLDER, null, (err, files) => {
      if(err) {
        reject(err)
      }
      const postFiles = filterPostsMeta(files);
      const postNames = postFiles.map(postFile => extractPostName(postFile));

      resolve(postNames);
    })
  });
}

app.get('/posts', (req, res) => {
  getPostsList().then(postsList => {
    const postsDataPromises = postsList.map(postName => new Post(postName)).map(post => post.getData())
    Promise.all(postsDataPromises).then(posts => res.send(JSON.stringify(posts)));
  });
});

app.get('/posts/:slug', (req, res) => {
    const postSlug = req.params.slug;
    const post = new Post(postSlug);
    post.getData().then(postData => res.send(JSON.stringify(post))).catch((err) => {
      res.status(404);
      res.send(JSON.stringify({message: err}))
    });
});

freePort(4000, (err, freePort) => {
  app.listen(freePort, function () {
    console.log(`Example app listening on port ${freePort}!`);
  });
});
