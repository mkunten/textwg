<template>
  <SideBar v-model:visible="visibleRight" position="right"
    closeButton="ture">
    <Accordion multiple :activeIndex="[0,1]" lazy>
      <AccordionTab header="XML Metadata">
        <Card>
          <template #title>
            <span class="text-sm">Label</span>
          </template>
          <template #content>
            <span class="text-sm">{{ this.selectedXML.label }}</span>
          </template>
        </Card>
        <Card>
          <template #title>
            <span class="text-sm">XML URI</span>
          </template>
          <template #content>
            <span class="text-sm">
              <a target="_blank"
                href="{{ this.selectedXML.uri }}">
                {{ decodeURIComponent(this.selectedXML.uri) }}
              </a>
            </span>
          </template>
        </Card>
      </AccordionTab>
      <AccordionTab header="TEI Header (converted by CETEIcean)">
        <Card>
          <template #content>
            <pre>{{ this.jsonPrettify(this.teiHeader) }}</pre>
          </template>
        </Card>
      </AccordionTab>
    </Accordion>
  </SideBar>
  <div>
    <span>{{ this.selectedText.title }}</span>
    <mdicon name="menu" class="absolute right-0"
      @click="this.visibleRight = !this.visibleRight" />
  </div>
  <TabView ref="tv" v-model:activeIndex="tabActiveIndex"
    @tab-change="onTabChanged">
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
import xmlJs from 'xml-js';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Card from 'primevue/card';
import ScrollPanel from 'primevue/scrollpanel';
import SideBar from 'primevue/sidebar';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';

export default {
  name: 'TextViewer',
  components: {
    Accordion,
    AccordionTab,
    Card,
    SideBar,
    ScrollPanel,
    TabPanel,
    TabView,
  },
  data() {
    return {
      CETEIcean: null,
      visibleRight: false,
      tabActiveIndex: 0,
      xmlLoaded: null,
      selectedXMLIndex: null,
      teiHeader: null,
      teiData: {},
    };
  },
  computed: {
    m3() {
      return this.$store.state.m3;
    },
    selectedText() {
      return this.$store.state.selectedText;
    },
    selectedXML() {
      return this.selectedText.xmls[this.selectedXMLIndex];
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
          teiHeader: (e) => {
            this.teiHeaderInit(e.outerHTML);
            e.innerHTML = '';
          },
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
      this.selectedXMLIndex = null;
      this.tabActiveIndex = 0;
      this.$nextTick(() => {
        this.selectedXMLIndex = 0;
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
              // not work with `Number.MAX_SAFE_INTEGER`...
            });
          })
          .catch((error) => {
            console.error('TextViewer: axios: ', error);
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
      this.selectedXMLIndex = event.index;
    },
    teiHeaderInit(html) {
      this.teiHeader = xmlJs.xml2js(html, {
        compact: true,
        elementNameFn: (name) => name.slice(4),
      });
      console.log(this.teiHeader.teiheader.filedesc.sourcedesc.listwit);
      // todo
    },
    jsonPrettify(json) {
      return xmlJs.json2xml(json, {
        compact: true,
        spaces: 2,
        fullTagEmptyElement: true,
        indentCdata: true,
        indentAttributes: true,
      });
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
    selectedXMLIndex: {
      handler(idx) {
        if (idx !== null) {
          this.loadXML(idx, this.selectedText.xmls[idx]);
        }
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
