<template>
  <div :id="this.miradorId" class="mirador"></div>
</template>

<script>
export default {
  name: 'Mirador3',
  components: {
  },
  props: [
    'miradorId',
    'manifestURI',
  ],
  data() {
    return {
      miradorInstance: null,
    };
  },
  mounted() {
    this.miradorInstance = window.Mirador.viewer({
      id: this.miradorId,
      manifests: {
        'https://kotenseki.nijl.ac.jp/biblio/200003074/manifest': {
          provider: 'NIJL',
        },
      },
      windows: [{
        loadedManifest: 'https://kotenseki.nijl.ac.jp/biblio/200003074/manifest',
        canvasIndex: 1,
        thumbnameilNavigationPosition: 'far-bottom',
      }],
    });
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
