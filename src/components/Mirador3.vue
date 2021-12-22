<template>
  <div :id="this.miradorId" class="mirador"></div>
</template>

<script>
import { mapMutations } from 'vuex';

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
    };
  },
  methods: {
    ...mapMutations([
      'setM3',
    ]),
  },
  async mounted() {
    await this.$store.dispatch('setBid', 200003074);
    const manifestUri = this.$store.getters.getManifestUri;
    const manifests = {};
    manifests[manifestUri] = {
      provider: 'NIJL',
    };
    const m3 = window.Mirador.viewer({
      language: 'ja',
      id: this.miradorId,
      window: {
        allowClose: false,
        sideBarOpenByDefault: true,
      },
      manifests,
      windows: [{
        id: 'default',
        loadedManifest: manifestUri,
        thumbnameilNavigationPosition: 'far-bottom',
      }],
    });
    this.setM3(m3);
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
