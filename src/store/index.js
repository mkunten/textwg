import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    m3: null,
    bid: null,
    manifest: {},
  },
  getters: {
    getCanvasById(state) {
      console.log('store: g: getCanvasById');
      return (id) => state.manifest.sequences[0].canvases[id]['@id'];
    },
    getManifestUri(state) {
      console.log('store: g: getManifestUri:', state.bid);
      return `https://kotenseki.nijl.ac.jp/biblio/${state.bid}/manifest`;
    },
    getManifest(state) {
      console.log('store: g: getManifest');
      return state.manifest;
    },
  },
  mutations: {
    setM3(state, m3) {
      state.m3 = m3;
      console.log('store: m: setM3:', m3);
    },
    setBid(state, bid) {
      state.bid = bid;
      console.log('store: m: setBid:', bid);
    },
    setManifest(state, json) {
      state.manifest = json;
      console.log('store: m: setManifest:', json);
    },
  },
  actions: {
    async setBid({ commit, getters }, bid) {
      commit('setBid', bid);
      console.log(getters.getManifestUri);
      const response = await axios.get(getters.getManifestUri);
      console.log(response);
      commit('setManifest', response.data);
    },
  },
});
