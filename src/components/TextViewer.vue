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
                :href="this.selectedXML.uri">
                {{ decodeURIComponent(this.selectedXML.uri) }}
              </a>
            </span>
          </template>
        </Card>
      </AccordionTab>
      <AccordionTab header="TEI Header">
        <Card>
          <template #content>
          <pre>{{ this.jsonPrettify(this
            .xmlJsGetObjectByTagname('teiHeader')) }}</pre>
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
        <div
          v-if="this.selectedXMLData.elements"
          :ref="`viewer${xml.label}`"
          class="tategaki">
          <Tei :el="this.selectedXMLData.elements[0].elements[1]"></Tei>
        </div>
      </ScrollPanel>
    </TabPanel>
  </TabView>
</template>

<script>
import axios from 'axios';
import xmlJs from 'xml-js';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Card from 'primevue/card';
import ScrollPanel from 'primevue/scrollpanel';
import SideBar from 'primevue/sidebar';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import Tei from '@/components/Tei.vue';

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
    Tei,
  },
  data() {
    return {
      visibleRight: false,
      tabActiveIndex: 0,
      xmlData: {},
      selectedXMLIndex: null,
      teiData: { els: {}, maps: {} },
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
      if (this.selectedXMLIndex === null) {
        return null;
      }
      return this.selectedText.xmls[this.selectedXMLIndex];
    },
    selectedXMLData() {
      if (this.selectedXML === null
        || this.xmlData[this.selectedXML.uri] === undefined) {
        return {};
      }
      return this.xmlData[this.selectedXML.uri];
    },
  },
  methods: {
    getCanvasById(id) {
      return this.$store.getters.getCanvasById(id);
    },
    resetText() {
      this.xmlLoaded = [];
      this.selectedXMLIndex = null;
      this.tabActiveIndex = 0;
      this.teiData = { els: {}, maps: {} };
      this.$nextTick(() => {
        this.selectedXMLIndex = 0;
      });
    },
    async loadXML(idx) {
      const xml = this.selectedText.xmls[idx];
      if (this.xmlData[xml.uri] === undefined) {
        try {
          const response = await axios.get(xml.uri);
          this.xmlData[xml.uri] = xmlJs.xml2js(response.data, {
            ignoreDeclaration: true,
            ignoreInstruction: true,
            ignoreComment: true,
          });
          this.xmlData.curr = this.xmlData[xml.uri];
        } catch (error) {
          console.error('TextViewer: loadXML:', error);
        }
      }
    },
    onTabChanged(event) {
      this.selectedXMLIndex = event.index;
    },
    xmlJsToText(obj) {
      return obj.elements.reduce(this.xmlJsToTextWalk, '');
    },
    xmlJsToTextWalk(prev, curr) {
      if (curr.type === 'text') {
        return `${prev}${curr.text}`;
      }
      return curr.elements.reduce(this.xmlJsToTextWalk, prev);
    },
    // find a element by a tagname
    xmlJsGetObjectByTagname(tagname) {
      if (this.teiData.els[tagname] === undefined) {
        this.xmlJsGetObjectsByTagnameInit(tagname);
      }
      if (this.teiData.els[tagname].length > 0) {
        return this.teiData.els[tagname][0];
      }
      return null;
    },
    // find elements by a tagname
    xmlJsGetObjectsByTagname(tagname) {
      if (this.teiData.els[tagname] === undefined) {
        this.xmlJsGetObjectsByTagnameInit(tagname);
      }
      return this.teiData.els[tagname];
    },
    xmlJsGetObjectsByTagnameInit(tagname) {
      this.teiData.els[tagname] = [];
      this.xmlJsGetObjectsByTagnameInitWalk(this.xmlData.curr, tagname);
    },
    xmlJsGetObjectsByTagnameInitWalk(obj, tagname) {
      if (!obj.elements) {
        return;
      }
      obj.elements.forEach((o) => {
        if (o.name === tagname) {
          this.teiData.els[tagname].push(o);
        } else {
          this.xmlJsGetObjectsByTagnameInitWalk(o, tagname);
        }
      });
    },
    // create a key(xml:id)-value map by a tagname
    xmlJsToMapByTagname(tagname) {
      this.teiData.maps[tagname] = {};
      this.xmlJsGetObjectsByTagname(tagname).forEach((o) => {
        this.teiData.maps[tagname][o.attributes['xml:id']] = this.xmlJsToText(o);
      });
    },
    // get prettified json string
    jsonPrettify(obj) {
      if (!obj) {
        return '';
      }
      return xmlJs.json2xml(obj, {
        spaces: 2,
        fullTagEmptyElement: true,
        indentCdata: true,
        indentAttributes: true,
      });
    },
  },
  mounted() {
    // this.initCETEIcean();
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
          this.loadXML(idx);
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
