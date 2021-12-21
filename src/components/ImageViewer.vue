<template>
  <SelectButton v-model="layout"
    :options="layoutOptions" optionValue="value">
    <template #option="slotProps">
      <mdicon :name="slotProps.option.icon" />
    </template>
  </SelectButton>
  <Splitter :layout="layout">
    <SplitterPanel>
      <div class="miradorviewer">
        <Mirador3 mirador-id="mirador" manifestURI="manifestURI2" />
      </div>
    </SplitterPanel>
    <SplitterPanel>
      <div class="textviewer">
        <TextViewer />
      </div>
    </SplitterPanel>
  </Splitter>
</template>

<script>
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Mirador3 from '@/components/Mirador3.vue';
import TextViewer from '@/components/TextViewer.vue';

export default {
  name: 'ImageViewer',
  components: {
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
      manifestURI: null,
      manifestData: null,
    };
  },
};
</script>

<style scoped>
.p-splitter-panel {
  overflow-x: hidden;
}

.imageviewer {
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
