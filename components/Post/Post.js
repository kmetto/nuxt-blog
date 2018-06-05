import marked from 'marked';

export default {
  props: ['post'],
  computed: {
    content() {
      return marked(this.post.markdown);
    }
  }
};
