<template>
  <TeiNodes :el="this.el" :parents="this.parents"></TeiNodes>
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
  methods: {
    esc(str) {
      if (!str) {
        return '';
      }
      return str;
    },
    witness(el) {
      return this.selectedText.teiData.maps.witness[el.attributes.wit];
    },
    toggleOlp(event) {
      this.$refs[event.target.value].toggle(event);
    },
  },
  mounted() {
    if (this.$el !== null && this.parents.length === 0) {
      const el = this.$el.parentNode.parentNode;
      if (el.scrollWidth !== 0) {
        el.scrollLeft = el.scrollWidth;
      }
    }
  },
};
</script>

<style scoped>
.tategaki {
  margin: -1rem;
  text-align: center;
  writing-mode: vertical-tb;
  -webkit-writing-mode: vertical-tb;
  -ms-writing-mode: vertical-tb;
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: vertical-rl;
  text-orientation: upright;
}
.tei-lem {
  color: blue;
}
</style>
