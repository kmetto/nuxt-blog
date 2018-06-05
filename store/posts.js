import axios from 'axios';

export const state = () => ({
  collection: [],
  current: null,
})

export const mutations = {
  async SET_POSTS (state, posts) {
    state.collection = posts || [];
  },
  async SET_POST (state, post) {
    state.current = post || null;
  }
}
