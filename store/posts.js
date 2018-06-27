import axios from 'axios';

export const state = () => ({
  collection: [],
  current: null,
  count: null,
})

export const mutations = {
  async SET_POSTS (state, posts) {
    state.collection = posts || [];
  },
  async SET_POST (state, post) {
    state.current = post || null;
  },
  async SET_COUNT (state, count) {
    state.count = count || 0;
  }
}
