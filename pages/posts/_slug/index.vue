<template>
  <div>
    <post :post="post"/>
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import Post from '@/components/Post';

export default {
  components: {
    Post,
  },
  computed: {
    post() {
      return this.$store.state.posts.current || null;
    }
  },
  async fetch({ store, params }){
    const { data } = await axios.get(`/posts/${params.slug}`);
    store.commit('posts/SET_POST', data);
  }
}
</script>
