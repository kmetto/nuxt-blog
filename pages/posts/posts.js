import Vue from 'vue';
import { Component } from 'nuxt-class-component';
import axios from '@/plugins/axios';
import PostPreview from '@/components/PostPreview';

export default  {
  components: {
    PostPreview,
  },
  computed: {
    posts() {
      return this.$store.state.posts.collection;
    }
  },

  async fetch({ store, params }){
    const { data } = await await axios.get('/posts');
    store.commit('posts/SET_POSTS', data);
  }
}
