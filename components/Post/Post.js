import marked from 'marked';

export default {
  props: ['post'],
  computed: {
    content() {
      return marked(this.post.markdown);
    },
    meta() {
      return JSON.parse(this.post.meta);
    },
    createdDate() {
      return new Date(this.post.stats.birthtimeMs).toDateString();
    },
    timeToRead() {
      const wordsPerMinute = process.env.readingSpeed || 250;
      const wordsCount = this.content.split(' ').length;
      const minsToRead = parseInt(wordsCount / wordsPerMinute, 10);
      return `~${minsToRead} ${minsToRead > 1 ? 'minutes' : 'minute'} to read`;
    },
  },
};
