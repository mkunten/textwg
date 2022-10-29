<template>
  <div class="tategaki" @contextmenu="onContextMenu">
    <TeiNodes :el="this.el" :parents="this.parents"/>
  </div>
  <ContextMenu ref="contextmenu" :model="contextmenuItems">
    <template
      #item="{isActive, isExactActive}"
      :if="currPos[selectedText.edRef].n">
      <a :class="{'active-link': isActive, 'active-link-exact': isExactActive}">
        <div>
          <mdicon name="book-open-page-variant-outline"
            title="ビューア上で移動"
            @click="navigateByCurrPos(selectedText.edRef)"/>
          {{ selectedText.edRef }}:
          {{ currPos[selectedText.edRef].n }},
          l. {{ currPos[selectedText.edRef].l }}
        </div>
        <div v-for="r in selectedText.refs" :key="r.edRef">
          <mdicon name="book-open-page-variant-outline"
            title="ビューア上で移動"
            @click="navigateByCurrPos(r.edRef)"/>
          {{ r.edRef }}:
          {{ currPos[r.edRef].n }},
          l. {{ currPos[r.edRef].l }}
        </div>
      </a>
    </template>
  </ContextMenu>
</template>

<script>
import TeiNodes from '@/components/TeiNodes.vue';
import ContextMenu from 'primevue/contextmenu';

export default {
  name: 'Tei',
  components: {
    TeiNodes,
    ContextMenu,
  },
  props: {
    el: { type: Object, default: null, required: true },
    parents: { type: Array, default: () => [], required: false },
  },
  data() {
    return {
      contextmenuItems: [{
        label: 'label',
      }],
      currPos: {},
    };
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
  methods: {
    onContextMenu(event) {
      if (!this.selectedText.refs || this.selectedText.refs.length === 0) {
        return false;
      }
      const sel = window.getSelection();
      if (sel.type !== 'Range') {
        return false;
      }
      let pbs = [this.selectedText.edRef,
        ...(this.selectedText.refs.map((r) => r.edRef))];
      let lbs = [...pbs];

      this.currPos = {};
      let node = sel.anchorNode;
      for (let i = 0; i < 500; i += 1) {
        node = this.getPreviousSibling(node);
        if (!node) {
          break;
        } else if (node.dataset) {
          if (node.dataset.type === 'pb') {
            if (pbs.includes(node.dataset.edref)) {
              const { edref } = node.dataset;
              if (!this.currPos[edref]) {
                this.currPos[edref] = {};
              }
              this.currPos[edref].n = node.dataset.n;
              this.currPos[edref].canvasId = node.dataset.canvasid;
              pbs = pbs.filter((n) => n !== edref);
            }
          } else if (node.dataset.type === 'lb') {
            if (lbs.includes(node.dataset.edref)) {
              const { edref } = node.dataset;
              this.currPos[edref] = {
                l: node.dataset.n,
              };
              lbs = lbs.filter((n) => n !== edref);
            }
          }
          if (pbs.length === 0 && lbs.length === 0) {
            break;
          }
        }
      }

      this.$refs.contextmenu.show(event);
      return true;
    },

    getPreviousSibling(node) {
      if (node.previousSibling) {
        return node.previousSibling;
      }
      if (node.parentNode) {
        return this.getPreviousSibling(node.parentNode);
      }
      return null;
    },

    navigateByCurrPos(key) {
      this.$store.dispatch('setM3Param', {
        key: 'canvasId',
        value: this.currPos[key].canvasId,
        windowId: key,
      });
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
  max-height: 540px;
}
</style>
