<template>
  <ScrollPanel ref="sp" style="width: 100%; height: 100%;">
    <div ref="viewer" class="tategaki"></div>
  </ScrollPanel>
</template>

<script>
import axios from 'axios';
import CETEI from 'CETEIcean';
import ScrollPanel from 'primevue/scrollpanel';

export default {
  name: 'TextViewer',
  components: {
    ScrollPanel,
  },
  data() {
    return {
      bid: 200003074,
      CETEIcean: null,
    };
  },
  computed: {
    m3() {
      console.log(this.$store.state.m3, 3);
      return this.$store.state.m3;
    },
    manifest() {
      return this.$store.state.manifest;
    },
  },
  methods: {
    getCanvasById(id) {
      return this.$store.getters.getCanvasById(id);
    },
    initCETEIcean() {
      this.CETEIcean = new CETEI({
        ignoreFragmentId: true,
      });
      const behaviors = {
        tei: {
          lb: ['<br />'],
          pb: ['<a><img class="jumpTo" title="移動" data-facs="$@facs" src="images/book-open-page-variant-outline.svg" /></a><a title="新日本古典籍総合目録DBで開く" target="_blank" href="$@facs"><img src="images/open-in-new.svg" /></a>'],
        },
      };
      this.CETEIcean.addBehaviors(behaviors);
    },
    initText() {
      axios.get(`texts/${this.bid}.xml`)
        .then((response) => {
          this.CETEIcean.makeHTML5(response.data, (dom) => {
            this.$refs.viewer.append(dom);
            window.x = this.$refs.sp.$refs.content;
            const c = this.$refs.sp.$refs.content;
            c.scrollLeft = c.scrollWidth;
            // not work well with `Number.MAX_SAFE_INTEGER`...

            c.addEventListener('click', this.jumpToPage, false);
          });
        })
        .catch((error) => {
          console.log('TextViewer: axios: ', error);
        });
    },
    jumpToPage(event) {
      if (event.target.classList.contains('jumpTo')) {
        const frame = event.target.dataset.facs.replace(/^.*\//, '') - 1;
        const action = window.Mirador.actions
          .setCanvas('default', this.getCanvasById(frame));
        this.m3.store.dispatch(action);

        event.preventDefault();
      }
    },
  },
  mounted() {
    this.initCETEIcean();
    this.initText();
  },
};
</script>

<style scoped>
.tategaki {
  margin-top: 2rem;
  text-align: left;
  writing-mode: vertical-tb;
  -webkit-writing-mode: vertical-tb;
  -ms-writing-mode: vertical-tb;
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: vertical-rl;
  /* text-orientation: upright; */
}

tei-pb {
  display: block !important;
  border: 1px solid black !important;
  content: "xxx";
  width: 20px !important;
  height: 20px !important;
  background-image: url('/images/tei-logo-sm.png');
}
.tei-pb {
  display: block !important;
  border: 1px solid black;
  width: 20px !important;
  height: 20px !important;
  background-image: url('/images/tei-logo-sm.png');
}
</style>
