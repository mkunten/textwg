<template>
  <div :id="this.miradorId" class="mirador"></div>
</template>

<script>
import Mirador from 'mirador/dist/es/src/index';
import { miradorImageToolsPlugin } from 'mirador-image-tools';

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
    getM3Window(windowId = 'windowDefault') {
      return this.m3.store.getState().windows[windowId];
    },
    getM3ManifestJSON(windowId = 'windowDefault') {
      const state = this.m3.store.getState();
      return state.manifests[state.windows[windowId].manifestId].json;
    },
    initM3() {
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
    },
    setM3Text(text, windowId = 'windowDefault') {
      if (this.getM3Window(windowId) !== null) {
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
    this.initM3();
  },
  beforeUnmount() {
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
            this.setM3CanvasBySeqIdx(m3Param.value);
            break;
          case 'canvasId':
            this.setM3CanvasById(m3Param.value);
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
