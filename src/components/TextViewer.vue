<template>
  <SideBar
    style="width: 80%"
    v-model:visible="visibleRight"
    position="right"
    closeButton="true"
  >
    <Accordion multiple :activeIndex="[0,1]" lazy>
      <AccordionTab header="TEI nodes viewer">
        <Card>
          <template #content>
            <AutoComplete
              v-model="tnvFilter"
              :suggestions="tnvSuggestions"
              field="name"
              @complete="tnvSearch"
              @itemSelect="tnvOnSelected"
              autoHighlight
              completeOnFocus
              forceSelection
              placeholder="input tag name or #xml:id"
            >
              <template #item="slotProps">
                <div>
                  {{ slotProps.item.name }}
                  <template v-if="slotProps.item.count">
                    ({{ slotProps.item.count }})
                  </template>
                </div>
              </template>
            </AutoComplete>
            <div style="margin-top: 1rem">
              <pre v-if="tnvSelected">{{
                this.jsonPrettify({
                  type: 'element',
                  name: 'data',
                  elements: this.tnvResult,
                })
              }}</pre>
              <span v-else>
                no data (e.g. <code>witness</code>, <code>app</code>)
              </span>
            </div>
          </template>
        </Card>
      </AccordionTab>
      <AccordionTab header="Metadata">
        <Card>
          <template #title>
            <span class="text-sm">Text</span>
          </template>
          <template #content>
            <div class="text-sm">
              title: {{ this.selectedText.title }}<br />
              manifestURI: <a class="text-sm" target="_blank"
                :href="this.selectedText.manifestURI">
                {{ this.selectedText.manifestURI }}
              </a>
            </div>
          </template>
        </Card>
        <Card>
          <template #title>
            <span class="text-sm">TEI/XML</span>
          </template>
          <template #content>
            <div class="text-sm">
              label: {{ this.selectedXML.label }}<br />
              uri: <a class="text-sm" target="_blank"
                :href="this.selectedXML.uri">
                {{ this.selectedXML.uri }}
              </a>
            </div>
          </template>
        </Card>
      </AccordionTab>
      <AccordionTab header="TEI Header">
        <Card>
          <template #content>
            <pre>{{
              this.jsonPrettify(
                this.xmlJsGetObjectByTagname(
                  this.selectedXML.uri,
                  'teiHeader',
                ))
            }}</pre>
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
  <TabView
    v-model:activeIndex="tabActiveIndex"
    @tab-change="onTabChanged"
  >
    <TabPanel
      v-for="xml in selectedText.xmls"
      :key="xml.label"
      :header="xml.label"
    >
      <ScrollPanel
        style="width: 100%; height: 100%;">
        <Tei
          v-if="data[xml.uri]"
          :el="this.data[xml.uri].xml.elements[0].elements[1]"
        />
      </ScrollPanel>
    </TabPanel>
  </TabView>
</template>

<script>
import axios from 'axios';
import xmlJs from 'xml-js';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import AutoComplete from 'primevue/autocomplete';
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
    AutoComplete,
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
      selectedXMLIndex: null,
      data: {}, // key: xml uri; value: xml2json object etc.
      tnvFilter: '',
      tnvSuggestions: [],
      tnvSelected: '',
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
    selectedData() {
      if (this.selectedXML === null
        || this.data[this.selectedXML.uri] === undefined) {
        return null;
      }
      return this.data[this.selectedXML.uri];
    },
    tnvSuggestionsAll() {
      return this.selectedData.tei.list
        .concat(Object.keys(this.selectedData.tei.xmlIDs)
          .map((name) => ({ name })));
    },
    tnvResult() {
      if (this.tnvSelected.startsWith('#')) {
        console.log(this.selectedData.tei.xmlIDs[this.tnvSelected]);
        return [this.selectedData.tei.xmlIDs[this.tnvSelected]];
      }
      return this.xmlJsGetObjectsByTagname(this.selectedXML.uri,
        this.tnvSelected);
    },
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
          this.loadXML();
        }
      },
      deep: true,
    },
  },

  provide() {
    return {
      getXMLIDs: () => this.selectedData.tei.xmlIDs,
    };
  },

  methods: {
    resetText() {
      this.xmlLoaded = [];
      this.selectedXMLIndex = null;
      this.tabActiveIndex = 0;
      this.$nextTick(() => {
        this.selectedXMLIndex = 0;
      });
    },
    onTabChanged(event) {
      this.selectedXMLIndex = event.index;
    },
    async loadXML() {
      const { uri } = this.selectedText.xmls[this.selectedXMLIndex];
      if (!this.data[uri]) {
        try {
          const response = await axios.get(uri);
          const data = xmlJs.xml2js(response.data, {
            ignoreDeclaration: true,
            ignoreInstruction: true,
            ignoreComment: true,
          });
          this.data[uri] = this.xmlJsInit(data);
        } catch (error) {
          console.error('TextViewer: loadXML:', error);
        }
      }
    },
    // initialize a TEI object and create list of element names
    xmlJsInit(obj) {
      let id = 0;
      const map = {};
      const xmlIDs = {};
      const walk = (obj0) => {
        const obj1 = obj0;
        obj1.elementID = id;
        if (obj1.name) {
          if (!map[obj1.name]) {
            map[obj1.name] = 1;
          } else {
            map[obj1.name] += 1;
          }
        }
        if (obj1.attributes && obj1.attributes['xml:id']) {
          xmlIDs[`#${obj1.attributes['xml:id']}`] = obj1;
        }
        id += 1;
        if (obj1.elements) {
          obj1.elements.forEach((obj2) => {
            walk(obj2);
          });
        }
      };
      walk(obj);

      const list = Object.keys(map).sort().map((name) => ({
        name,
        count: map[name],
      }));

      console.info('tag list:', list, map, 'xml:id', xmlIDs);

      return {
        xml: obj,
        tei: { list, xmlIDs, els: {} },
      };
    },
    // find a element by a tagname
    xmlJsGetObjectByTagname(uri, tagname) {
      if (this.data[uri].tei.els[tagname] === undefined) {
        this.xmlJsGetObjectsByTagnameInit(uri, tagname);
      }
      if (this.data[uri].tei.els[tagname].length > 0) {
        return this.data[uri].tei.els[tagname][0];
      }
      return null;
    },
    // find elements by a tagname
    xmlJsGetObjectsByTagname(uri, tagname) {
      if (this.data[uri].tei.els[tagname] === undefined) {
        this.xmlJsGetObjectsByTagnameInit(uri, tagname);
      }
      return this.data[uri].tei.els[tagname];
    },
    xmlJsGetObjectsByTagnameInit(uri, tagname) {
      const r = [];
      const walk = (obj) => {
        if (!obj.elements) {
          return;
        }
        obj.elements.forEach((o) => {
          if (o.name === tagname) {
            r.push(o);
          } else {
            walk(o);
          }
        });
      };
      walk(this.data[uri].xml);
      this.data[uri].tei.els[tagname] = r;
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
    // convert json to string
    xmlJsToText(obj) {
      return obj.elements.reduce(this.xmlJsToTextWalk, '');
    },
    xmlJsToTextWalk(prev, curr) {
      if (curr.type === 'text') {
        return `${prev}${curr.text}`;
      }
      return curr.elements.reduce(this.xmlJsToTextWalk, prev);
    },
    // tnvSearch
    tnvSearch(event) {
      setTimeout(() => {
        if (this.selectedXML === null
          || this.data[this.selectedXML.uri] === undefined) {
          return null;
        }
        this.tnvSuggestions = this.tnvSuggestionsAll.filter((item) => (
          item.name.startsWith(event.query)
        ));
        return true;
      }, 250);
    },
    // tnvOnSelected
    tnvOnSelected(event) {
      this.tnvSelected = event.value.name;
    },
  },
};
</script>
