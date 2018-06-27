const fs = require('fs');
const Post = require('./Post');
const config = require('../config');

const filterPostsMeta = posts => posts.filter(post => post.match(/\.json$/));

const extractPostName = postFile => postFile.split('.')[0];

module.exports = class Posts {
  constructor() {
    this.posts = [];
  }

  async all() {
    try {
      const postsNames = await this.readAllPosts();
      const posts = postsNames
        .reduce((postsArr, postName) => {
          const post = new Post(postName);
          return postsArr.concat(post);
        }, [])
        .sort((post1, post2) => post2.stats.birthtimeMs - post1.stats.birthtimeMs);
      return posts;
    } catch (error) {
      throw new Error(error);
    }
  }

  readAllPosts() {
    return new Promise((resolve, reject) => {
      fs.readdir(config.posts, null, (err, files) => {
        if (err) {
          reject(err);
        }
        const postFiles = filterPostsMeta(files);
        const postNames = postFiles.map(postFile => extractPostName(postFile));

        resolve(postNames);
      });
    });
  }
};
