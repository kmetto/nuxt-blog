const config = require('../config');
const fs = require('fs');
const path = require('path');

module.exports = class Post {
  constructor(name) {
    this.name = name;
    this.markdown = null;
    this.meta = null;
  }

  async getMarkdown() {
    if(this.markdown) {
      return this.markdown;
    }
    const markdown = await this._read(`${this.name}.md`);
    this.markdown = markdown;
    return markdown; 
  }

  async getMeta() {
    if(this.meta) {
      return this.meta;
    }
    const meta = await this._read(`${this.name}.json`);
    this.meta = JSON.parse(meta);
    return this.meta;  
  }

  async getData() {
    const meta = await this.getMeta();
    const markdown = await this.getMarkdown();

    return {
      meta,
      markdown,
    }
  }

  _read(file){
    return new Promise((resolve, reject) => {
      fs.readFile(path.resolve(config.posts, file), 'utf-8', (err, data) => {
        if(err) {
          reject(err)
        }
        resolve(data);
      });
    });
  }
}