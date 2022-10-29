<template>
  <div :id="this.miradorId" class="mirador"></div>
  <Toast><Button @click="test">test</Button></Toast>
</template>

<script>
import Mirador from 'mirador/dist/es/src/index';
import { miradorImageToolsPlugin } from 'mirador-image-tools';
import ReactDOM from 'react-dom';

export default {
  name: 'Mirador3',
  props: [
    'miradorId',
  ],
  data() {
    return {
    };
  },
  computed: {
    m3() {
      return this.$store.state.m3;
    },
    selectedText() {
      return this.$store.state.selectedText;
    },
    texts() {
      return this.$store.state.texts;
    },
    m3Param() {
      return this.$store.state.m3Param;
    },
  },
  methods: {
    test() {
      console.log('test');
      console.log('test done');
    },
    getM3Window(windowId = 'windowDefault') {
      return this.m3.store.getState().windows[windowId];
    },
    getM3ManifestJSON(windowId = 'windowDefault') {
      const state = this.m3.store.getState();
      return state.manifests[state.windows[windowId].manifestId].json;
    },
    initM3() {
      console.log('initM3');
      if (this.m3) {
        console.log('rerender m3');
        ReactDOM.render(
          this.m3.render(),
          document.getElementById(this.miradorId),
        );
      } else {
        const m3 = Mirador.viewer({
          language: 'ja',
          id: this.miradorId,
          window: {
            sideBarOpenByDefault: false,
          },
        }, [
          ...miradorImageToolsPlugin,
        ]);

        this.$store.commit('setM3', m3);
        window.m3 = m3; // debug
      }
    },
    setM3Text(text, windowId = 'windowDefault') {
      const num = text.refs ? text.refs.length + 1 : 1;
      if (num >= 2) {
        let layout = {
          first: text.edRef,
          second: text.refs[0].edRef,
          direction: 'column',
        };
        for (let i = 1; i < num - 2; i += 1) {
          layout = {
            first: layout,
            second: text.refs[i].edRef,
            direction: 'column',
          };
        }
        this.m3.store.dispatch(Mirador.actions
          .updateWorkspaceMosaicLayout(layout));
        this.m3.store.dispatch(Mirador.actions
          .addWindow({ id: text.edRef, manifestId: text.manifestURI }));
        text.refs.forEach((r) => {
          this.m3.store.dispatch(Mirador.actions
            .addWindow({ id: r.edRef, manifestId: r.manifestURI[0] }));
        });
      } else if (this.getM3Window(windowId) !== null) {
        this.m3.store.dispatch(Mirador.actions
          .addWindow({ id: windowId, manifestId: text.manifestURI }));
      } else {
        console.info('m3 update');
        this.m3.store.dispatch(Mirador.actions
          .updateWindow(windowId, { manifestId: text.manifestURI }));
      }
    },
    setM3CanvasById(id, windowId = 'windowDefault') {
      this.m3.store.dispatch(Mirador.actions
        .setCanvas(windowId, id));
    },
    setM3CanvasBySeqIdx(seqIdx, windowId = 'windowDefault') {
      this.setM3CanvasById(this.getM3ManifestJSON(windowId)
        .sequences[0].canvases[seqIdx]['@id']);
    },
  },
  mounted() {
    console.log('m3: mounted');
    this.initM3();
  },
  beforeUnmount() {
    console.log('m3: unmount');
    this.m3.unmount();
  },
  watch: {
    selectedText: {
      handler(text) {
        this.setM3Text(text);
      },
      deep: true,
    },
    m3Param: {
      handler(m3Param) {
        switch (m3Param.key) {
          case 'seqIdx':
            this.setM3CanvasBySeqIdx(m3Param.value, m3Param.windowId);
            break;
          case 'canvasId':
            this.setM3CanvasById(m3Param.value, m3Param.windowId);
            break;
          default:
            console.error('unexpected setParam key');
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.mirador {
  width: 100%;
  height: 100%;
  min-width: 480px;
  min-height: 300px;
}
</style>
