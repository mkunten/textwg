import { createStore } from 'vuex';

export default createStore({
  state: {
    m3: null,
    bid: null,

    selectedText: {},
    param: {},
    texts: [{
      provider: 'NIJL',
      items: [{
        title: '十六夜物語',
        manifestURI: 'https://kotenseki.nijl.ac.jp/biblio/200003074/manifest',
        xmls: [{
          label: '上',
          uri: 'https://raw.githubusercontent.com/TEI-EAJ/jpn_classical/master/%E2%91%A1%E6%A0%A1%E8%A8%82%E6%9C%AC%E6%96%87%E3%83%87%E3%83%BC%E3%82%BF%E5%9B%BD%E6%96%87%E5%AD%A6%E7%A0%94%E7%A9%B6%E8%B3%87%E6%96%99%E9%A4%A8%E6%89%80%E8%94%B5%E3%80%8E%E5%8D%81%E5%85%AD%E5%A4%9C%E7%89%A9%E8%AA%9E%E3%80%8F%E4%B8%8A%E5%B7%BB.xml',
        }, {
          label: '下',
          uri: 'https://raw.githubusercontent.com/TEI-EAJ/jpn_classical/master/%E2%91%A1%E6%A0%A1%E8%A8%82%E6%9C%AC%E6%96%87%E3%83%87%E3%83%BC%E3%82%BF%E5%9B%BD%E6%96%87%E5%AD%A6%E7%A0%94%E7%A9%B6%E8%B3%87%E6%96%99%E9%A4%A8%E6%89%80%E8%94%B5%E3%80%8E%E5%8D%81%E5%85%AD%E5%A4%9C%E7%89%A9%E8%AA%9E%E3%80%8F%E4%B8%8B%E5%B7%BB.xml',
        }],
      }, {
        title: '源氏物語',
        manifestURI: 'https://nakamura196.github.io/jpsearch/data/genji/manifest/01.json',
        xmls: [{
          label: '第1冊',
          uri: 'https://tei-eaj.github.io/parallel_text_viewer/data/pt/01.xml',
        }],
      }],
    }, {
      provider: 'NDL',
      items: [
      ],
    }],
  },
  getters: {
  },
  mutations: {
    setM3(state, m3) {
      state.m3 = m3;
      console.log('store: m: setM3:', m3);
    },
    setSelectedText(state, text) {
      state.selectedText = text;
      console.log('store: m: setSelectedText:', state.selectedText);
    },
    setParam(state, param) {
      state.param = param;
      console.log('store: m: setParam:', param);
    },
  },
  actions: {
    setParam({ commit }, param) {
      commit('setParam', param);
    },
  },
});
