<template>
  <div class="tategaki">
    <TeiNodes :el="this.el" :parents="this.parents"></TeiNodes>
  </div>
</template>

<script>
import TeiNodes from '@/components/TeiNodes.vue';

export default {
  name: 'Tei',
  components: {
    TeiNodes,
  },
  props: {
    el: { type: Object, default: null, required: true },
    parents: { type: Array, default: () => [], required: false },
  },
  computed: {
    selectedText() {
      return this.$store.state.selectedText;
    },
  },
  watch: {
    el() {
      console.debug(111, 'watch: el', this.el);
    },
  },
  mounted() {
    // ??: -1000 size got to be set with 'nextTick' or other...
    setTimeout(() => {
      if (this.$el !== null && this.parents.length === 0) {
        const el = this.$el.parentNode;
        if (el.scrollWidth !== 0) {
          el.scrollLeft = el.scrollWidth;
        }
      }
    }, 100);
  },
};
</script>

<style scoped>
.tategaki {
  text-align: left;
  writing-mode: vertical-tb;
  -webkit-writing-mode: vertical-tb;
  -ms-writing-mode: vertical-tb;
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: vertical-rl;
  text-orientation: upright;
}
</style>
