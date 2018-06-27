import axios from '@/plugins/axios';
import PostPreview from '@/components/PostPreview';

export default {
  components: {
    PostPreview,
  },
  computed: {
    posts() {
      return this.$store.state.posts.collection;
    },
  },

  async fetch({ store }) {
    const { data } = await axios.get('/posts');
    store.commit('posts/SET_POSTS', data);
    store.commit('posts/SET_COUNT', data.length);
  },
};
