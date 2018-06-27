export default {
  props: ['post'],
  computed: {
    meta() {
      return JSON.parse(this.post.meta);
    },
    url() {
      return `posts/${this.meta.slug}`;
    },
  },
};
