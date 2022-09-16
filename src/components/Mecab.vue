<template>
  <Toast />
  <Panel>
  </Panel>
  <Panel>
    <DataTable
      :value="nodes"
      showGridlines
      stripedRows
    >
      <template #header>
        Mecab
        <FileUpload
          mode="basic"
          name="file"
          :auto="true"
          :url="api.convert"
          @upload="onUpload"
          ></FileUpload>
      </template>
      <Column field="id" header="id"></Column>
      <Column field="startPos" header="pos"></Column>
      <Column field="surface" header="surface"></Column>
      <Column field="features.pos1" :header="featureLabel.pos1"></Column>
      <Column field="features.pos2" :header="featureLabel.pos2"></Column>
      <Column field="features.pos3" :header="featureLabel.pos3"></Column>
      <Column field="features.pos4" :header="featureLabel.pos4"></Column>
      <Column field="features.cType" :header="featureLabel.cType"></Column>
      <Column field="features.cForm" :header="featureLabel.cForm"></Column>
      <Column field="features.lForm" :header="featureLabel.lForm"></Column>
      <Column field="features.lemma" :header="featureLabel.lemma"></Column>
    </DataTable>

  </Panel>
</template>

<script>
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import FileUpload from 'primevue/fileupload';
import Panel from 'primevue/panel';
import Toast from 'primevue/toast';

export default {
  name: 'Mecab',

  components: {
    Column,
    DataTable,
    FileUpload,
    Panel,
    Toast,
  },

  data() {
    return {
      api: {
        convert: 'http://localhost:1323/api/mecab/convert',
      },
      nodes: [],
      featureLabel: {
        pos1: '品詞大分類',
        pos2: '品詞中分類',
        pos3: '品詞小分類',
        pos4: '品詞細分類',
        cType: '活用型',
        cForm: '活用形',
        lForm: '語彙素読み',
        lemma: '語彙素（＋語彙素細分類）',
        orth: '書字形出現形',
        pron: '発音形出現形',
        kana: '仮名形出現形',
        goshu: '語種',
        orthBase: '書字形基本形',
        pronBase: '発音形基本形',
        kanaBase: '仮名形基本形',
        formBase: '語形基本形',
        iType: '語頭変化化型',
        iForm: '語頭変化形',
        iConType: '語頭変化結合型',
        fType: '語末変化化型',
        fForm: '語末変化形',
        fConType: '語末変化結合型',
        aType: 'アクセント型',
        aConType: 'アクセント結合型',
        aModType: 'アクセント修飾型',
        lid: '語彙表ID',
        lemma_id: '語彙素ID',
      },
    };
  },

  methods: {
    onUpload(e) {
      this.nodes = JSON.parse(e.xhr.response).data;
      console.log(this.nodes);
      this.$toast.add({
        sereity: 'success',
        summary: 'converted',
        life: 3000,
      });
    },
  },
};
</script>
