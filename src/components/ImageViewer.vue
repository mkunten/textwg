<template>
  <div class="imageviewer grid">
    <div class="miradorviewer md:w-12 lg:w-8">
      <Mirador3 mirador-id="mirador" manifestURI="manifestURI2" />
    </div>
    <div class="textviewer md:w-12 lg:w-4">
      <TextViewer />
    </div>
  </div>
</template>

<script>
import Mirador3 from '@/components/Mirador3.vue';
import TextViewer from '@/components/TextViewer.vue';

export default {
  name: 'ImageViewer',
  components: {
    Mirador3,
    TextViewer,
  },
  data() {
    return {
      manifestURI: null,
      manifestData: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.imageviewer {
  width: 100%;
  height: 600px;
  border: 1px solid black;
  overflow: hidden;
}

.miradorviewer {
  position: relative;
  height: 400px;
}

.textviewer {
  height: 200px;
}

.textviewer .p-scrollpanel-bar {
  background-color: #1976d2;
  opacity: 1;
  transition: background-color .3s;
}

$sm:576px !default;
$md:768px !default;
$lg:992px !default;
$xl:1200px !default;
@media screen and (min-width: $lg) {
  .imageviewer {
    height: 600px;
  }
  .miradorviewer {
    height: 600px;
  }
  .textviewer {
    height: 600px;
  }
}
</style>
