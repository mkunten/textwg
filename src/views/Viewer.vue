<template>
  <DropDown v-model="selectedText"
    :options="texts" optionLabel="title"
    optionGroupChildren="items" optionGroupLabel="provider">
  </DropDown>
  <SelectButton v-model="layout"
    :options="layoutOptions" optionValue="value">
    <template #option="slotProps">
      <mdicon :name="slotProps.option.icon"/>
    </template>
  </SelectButton>
  <div class="viewer">
    <Splitter :layout="layout">
      <SplitterPanel>
        <div class="miradorviewer">
          <Mirador3 mirador-id="mirador"/>
        </div>
      </SplitterPanel>
      <SplitterPanel>
        <div class="textviewer">
          <TextViewer/>
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script>
import DropDown from 'primevue/dropdown';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Mirador3 from '@/components/Mirador3.vue';
import TextViewer from '@/components/TextViewer.vue';

export default {
  name: 'Viewer',
  components: {
    DropDown,
    Splitter,
    SplitterPanel,
    Mirador3,
    TextViewer,
  },
  data() {
    return {
      layout: 'horizontal',
      layoutOptions: [{
        icon: 'view-split-vertical',
        value: 'horizontal',
      }, {
        icon: 'view-split-horizontal',
        value: 'vertical',
      }],
    };
  },
  computed: {
    selectedText: {
      get() {
        return this.$store.state.selectedText;
      },
      set(text) {
        this.$store.commit('setSelectedText', text);
      },
    },
    texts() {
      return this.$store.state.texts;
    },
  },
  mounted() {
    console.log(11, this.selectedText);
    if (!this.selectedText.title) {
      this.$store.commit('setSelectedTextByOrd', 1);
    }
  },
};
</script>

<style scoped>
.p-splitter-panel {
  overflow-x: hidden;
}

.viewer {
  width: 100%;
  height: 600px;
  border: 1px solid black;
  overflow: hidden;
}

.miradorviewer {
  position: relative;
  height: 100%;
}

.textviewer {
  position: relative;
  max-width: 95%;
  height: 100%;
}
</style>
