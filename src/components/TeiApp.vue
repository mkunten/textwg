<template>
  <span
    class="tei-lem"
    title="異読"
    :lem="lem"
    @click.prevent="toggleOlp"
  ><mdicon
    name="information-outline" size="18"
  /><TeiNodes
    :el="this.lem" :parents="this.childParents"
  /></span><OverlayPanel ref="op">
    <div class="tategaki">
      <div>
        {{
          this.formatLabel(this.lem.attributes.wit)
        }}<TeiNodes :el="this.lem" :parents="this.childParents" />
      </div>
      <div
        v-for="el in this.rdgs"
        :key="el.elementID"
      >
        {{
          this.formatLabel(el.attributes.wit)
        }}<TeiNodes :el="el" :parents="this.childParents" />
      </div>
    </div>
  </OverlayPanel>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import OverlayPanel from 'primevue/overlaypanel';

export default {
  name: 'TeiApp',
  components: {
    OverlayPanel,
    TeiNodes: defineAsyncComponent(() => import('@/components/TeiNodes.vue')),
  },

  props: {
    el: { type: Object, default: null, required: true },
    parents: { type: Array, default: () => [], required: false },
  },

  computed: {
    childParents() {
      return this.$props.parents.concat('app');
    },
    lem() {
      return this.$props.el.elements.find((el) => el.name === 'lem');
    },
    rdgs() {
      return this.$props.el.elements.filter((el) => el.name === 'rdg');
    },
  },

  methods: {
    formatLabel(wit) {
      return `【${wit.slice(1)}】`;
    },
    toggleOlp(event) {
      this.$refs.op.toggle(event);
      // firefox bug of width-culcuration timing?
      if (window.navigator.userAgent.startsWith('Mozilla')) {
        this.$nextTick(() => {
          this.$refs.op.container.style.boxSizing = 'content-box';
        });
      }
    },
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
.tei-lem {
  text-underline-position: right; /* required in Firefox */
  text-decoration: underline dotted red;
}
</style>
