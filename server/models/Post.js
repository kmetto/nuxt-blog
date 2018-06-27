const fs = require('fs');
const path = require('path');
const config = require('../config');

module.exports = class Post {
  constructor(name) {
    this.postsFolder = config.posts;
    this.name = name;
    this.markdownFile = `${this.name}.md`;
    this.metaFile = `${this.name}.json`;
    this.markdown = this.readMarkdown();
    this.meta = this.readMeta();
    this.stats = this.readStats();
  }

  readStats() {
    return fs.statSync(path.resolve(this.postsFolder, this.markdownFile));
  }

  readMeta() {
    return this.read(this.metaFile);
  }

  readMarkdown() {
    return this.read(this.markdownFile);
  }

  read(file) {
    return fs.readFileSync(path.resolve(this.postsFolder, file), 'utf-8');
  }
};
