<template>
  <div>
    <DropDown v-model="selectedText"
      :options="texts" optionLabel="title"
      optionGroupChildren="items" optionGroupLabel="provider">
    </DropDown>
    <SelectButton v-model="layout"
      :options="layoutOptions" optionValue="value"
      style="display: inline-flex;">
      <template #option="slotProps">
        <mdicon :name="slotProps.option.icon"/>
      </template>
    </SelectButton>
  </div>
  <div class="viewer">
    <Splitter :layout="layout">
      <SplitterPanel>
        <div :class="miradorviewerClass">
          <Mirador3 mirador-id="mirador"/>
        </div>
      </SplitterPanel>
      <SplitterPanel>
        <div :class="textviewerClass">
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
    miradorviewerClass() {
      return `miradorviewer-${this.layout}`;
    },
    textviewerClass() {
      return `textviewer-${this.layout}`;
    },
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
  height: 640px;
  border: 1px solid black;
  overflow: hidden;
}

.miradorviewer-horizontal {
  position: relative;
  height: 640px;
}
.miradorviewer-vertical {
  position: relative;
  height: 100%;
}

.textviewer-horizontal {
  position: relative;
  max-width: 95%;
  height: 600px;
}
.textviewer-vertical {
  position: relative;
  max-width: 95%;
  height: 100%;
}
</style>
