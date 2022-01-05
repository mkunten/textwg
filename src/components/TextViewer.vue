<template>
  <TabView ref="tv" @tab-change="onTabChanged" @tab-click="onTabClicked">
    <TabPanel v-for="xml in selectedText.xmls"
      :key="xml.label" :header="xml.label">
      <ScrollPanel :ref="'sp' + xml.label"
        style="width: 100%; height: 100%;">
        <div :ref="`viewer${xml.label}`"
          class="tategaki" @click="onClick"></div>
      </ScrollPanel>
    </TabPanel>
  </TabView>
</template>

<script>
import axios from 'axios';
import CETEI from 'CETEIcean';
import ScrollPanel from 'primevue/scrollpanel';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';

export default {
  name: 'TextViewer',
  components: {
    ScrollPanel,
    TabPanel,
    TabView,
  },
  data() {
    return {
      CETEIcean: null,
      xmlLoaded: null,
    };
  },
  computed: {
    m3() {
      return this.$store.state.m3;
    },
    selectedText() {
      return this.$store.state.selectedText;
    },
  },
  methods: {
    getCanvasById(id) {
      return this.$store.getters.getCanvasById(id);
    },
    initCETEIcean() {
      this.CETEIcean = new CETEI({
        ignoreFragmentId: true,
      });
      const behaviors = {
        tei: {
          lb: ['<br />'],
          pb: ['<a><img class="tei-pb-jumpTo" title="移動" data-facs="$@facs" src="images/book-open-page-variant-outline.svg" /></a><a title="新日本古典籍総合目録DBで開く" target="_blank" href="$@facs"><img src="images/open-in-new.svg" /></a>'],
          surface: null,
          graphic: ['<a><img class="tei-graphic-jumpTo" title="移動" data-n="$@n" data-url="$@url" src="images/book-open-page-variant-outline.svg" /></a>'],
        },
      };
      this.CETEIcean.addBehaviors(behaviors);
    },
    resetText() {
      this.xmlLoaded = [];
      this.$nextTick(() => {
        this.$refs.tv.$el
          .getElementsByClassName('p-tabview-nav-link')[0].click();
      });
    },
    loadXML(idx, xml) {
      if (!this.xmlLoaded[idx]) {
        this.xmlLoaded[idx] = true;
        axios.get(xml.uri)
          .then((response) => {
            this.CETEIcean.makeHTML5(response.data, (dom) => {
              const v = this.$refs[`viewer${xml.label}`];
              v.append(dom);
              v.parentNode.scrollLeft = v.parentNode.scrollWidth;
              // not work well with `Number.MAX_SAFE_INTEGER`...
            });
          })
          .catch((error) => {
            console.log('TextViewer: axios: ', error);
          });
      }
    },
    onClick(event) {
      if (event.target.classList.contains('tei-pb-jumpTo')) {
        const frame = event.target.dataset.facs
          .replace(/^.*\/(\d+)/, '$1') - 1;
        this.$store.dispatch('setParam', {
          key: 'frame',
          value: frame,
        });
        event.preventDefault();
      } else if (event.target.classList.contains('tei-graphic-jumpTo')) {
        const canvasId = event.target.dataset.n;
        this.$store.dispatch('setParam', {
          key: 'canvasId',
          value: canvasId,
        });
        event.preventDefault();
      }
    },
    onTabChanged(event) {
      this.loadXML(event.index, this.selectedText.xmls[event.index]);
    },
    onTabClicked(event) {
      this.loadXML(event.index, this.selectedText.xmls[event.index]);
    },
  },
  mounted() {
    this.initCETEIcean();
  },
  watch: {
    selectedText: {
      handler() {
        this.resetText();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.tategaki {
  margin-top: 2rem;
  text-align: left;
  writing-mode: vertical-tb;
  -webkit-writing-mode: vertical-tb;
  -ms-writing-mode: vertical-tb;
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: vertical-rl;
  /* text-orientation: upright; */
}

tei-pb {
  display: block !important;
  border: 1px solid black !important;
  content: "xxx";
  width: 20px !important;
  height: 20px !important;
  background-image: url('/images/tei-logo-sm.png');
}
.tei-pb {
  display: block !important;
  border: 1px solid black;
  width: 20px !important;
  height: 20px !important;
  background-image: url('/images/tei-logo-sm.png');
}
</style>
