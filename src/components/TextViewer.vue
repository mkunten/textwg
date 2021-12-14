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
  methods: {
    initCETEIcean() {
      this.CETEIcean = new CETEI({
        ignoreFragmentId: true,
      });
      const behaviors = {
        tei: {
          lb: ['<br />'],
          pb: ['<a title="新日本古典籍総合目録DB" target="_blank" href="$@facs">新</a>', 'test'],
        },
      };
      this.CETEIcean.addBehaviors(behaviors);
      console.log(this.CETEIcean);
    },
    initText() {
      axios.get(`/texts/${this.bid}.xml`)
        .then((response) => {
          this.CETEIcean.makeHTML5(response.data, (dom) => {
            this.$refs.viewer.append(dom);
            this.$refs.sp.$refs.content.scrollLeft = Number.MAX_SAFE_INTEGER;
          });
        })
        .catch((error) => {
          console.log('TextViewer: axios: ', error);
        });
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
