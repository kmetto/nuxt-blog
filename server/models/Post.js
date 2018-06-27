const config = require('../config');
const fs = require('fs');
const path = require('path');

module.exports = class Post {
  constructor(name) {
    this.postsFolder = config.posts;
    this.name = name;
    this.markdownFile = `${this.name}.md`;
    this.metaFile = `${this.name}.json`;
    this.markdown = this._readMarkdown();
    this.meta = this._readMeta();
    this.stats = this._readStats();
  }

  _readStats() {
    return fs.statSync(path.resolve(this.postsFolder, this.markdownFile));
  }

  _readMeta(){
    return this._read(this.metaFile);
  }

  _readMarkdown() {
    return this._read(this.markdownFile);
  }

  _read(file){
    return fs.readFileSync(path.resolve(this.postsFolder, file), 'utf-8');
  }
}