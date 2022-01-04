<template>
  <div :id="this.miradorId" class="mirador"></div>
</template>

<script>
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
      const m3 = window.Mirador.viewer({
        language: 'ja',
        id: this.miradorId,
        window: {
          sideBarOpenByDefault: false,
        },
      });
      this.$store.commit('setM3', m3);
      window.m3 = m3; // for debug
    },
    setM3Text(text, windowId = 'windowDefault') {
      if (this.getM3Window(windowId) !== null) {
        this.m3.store.dispatch(window.Mirador.actions
          .addWindow({ id: windowId, manifestId: text.manifestURI }));
      } else {
        this.m3.store.dispatch(window.Mirador.actions
          .updateWindow(windowId, { manifestId: text.manifestURI }));
      }
    },
    setM3CanvasByFrame(frame = 0, windowId = 'windowDefault') {
      this.m3.store.dispatch(window.Mirador.actions
        .setCanvas(windowId,
          this.getM3ManifestJSON(windowId).sequences[0]
            .canvases[frame]['@id']));
    },
  },
  mounted() {
    this.initM3();
  },
  watch: {
    selectedText: {
      handler(text, old) {
        if (!old.manifestURI || text.manifestURI !== old.manifestURI) {
          this.setM3Text(text);
        }
        if (text.frame !== undefined) {
          this.setM3CanvasByFrame(text.frame);
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
