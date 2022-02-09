<template>
  <template v-if="this.el !== null">
    <span :class="`${this.el.type} ${this.el.name}`"></span>
    <template v-if="this.el.type === 'text'">
      <span v-if="this.el.text !== ''">{{ this.el.text }}</span>
    </template>
    <!-- <template v&#45;else&#45;if="this.el.type === ''"> -->
    <!-- </template> -->
    <template v-else-if="this.el.name === 'graphic'">
      <template v-if="this.el.attributes.n">
        <mdicon
          name="book-open-page-variant-outline"
          title="ビューワで開く"
          @click.prevent="jumpToByCanvasId(this.el.attributes.n)">
        </mdicon>
      </template>
    </template>
    <template v-else-if="this.el.name === 'lb'">
      <br class="tei-lb" />
    </template>
    <template v-else-if="this.el.name === 'pb'">
      <span class="tei-pb">【{{ this.esc(this.el.attributes.n) }}】</span>
      <template v-if="this.el.attributes.facs">
        <a target="_blank" :href="this.el.attributes.facs">
          <mdicon
            name="open-in-new"
            title="外部DBで開く">
          </mdicon>
        </a>
        <mdicon
          name="book-open-page-variant-outline"
          title="ビューワで開く"
          @click.prevent="jumpToByURI(this.el.attributes.facs)">
        </mdicon>
      </template>
    </template>
    <template v-else>
      <template v-for="(el, idx) in this.el.elements" :key="idx">
        <span :class="`tei-${el.name}`">
          <Tei :el ="el" :parents="this.parents.concat(this.el.name)"></Tei>
        </span>
      </template>
    </template>
  </template>
</template>

<script>
export default {
  props: {
    el: { type: Object, default: null, required: true },
    parents: { type: Array, default: () => [], required: false },
  },
  watch: {
    el() {
      console.debug(111, this.el);
    },
  },
  methods: {
    esc(str) {
      if (!str) {
        return '';
      }
      return str;
    },
    jumpToByCanvasId(canvasId) {
      this.$store.dispatch('setM3Param', {
        key: 'canvasId',
        value: canvasId,
      });
    },
    jumpToByURI(uri) {
      if (uri.indexOf('//kotenseki.nijl.ac.jp/') !== 0) {
        const frame = uri.replace(/^.*\/(\d+)/, '$1') - 1;
        this.$store.dispatch('setM3Param', {
          key: 'frame',
          value: frame,
        });
      }
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
