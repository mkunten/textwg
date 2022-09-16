<template>
  <Menubar :model="items">
    <template #item="{item}">
      <router-link
        :to="item.to"
        custom
        v-slot="{ href, navigate, isActive, isExactActive }"
        >
        <a :href="href"
          @click="navigate"
          :class="{ 'active-link': isActive, 'active-link-exact': isExactActive }"
          >{{ item.label }}</a>
      </router-link>
    </template>
    <template #end>{{ version }}</template>
  </Menubar>

  <router-view></router-view>
</template>

<script>
import Menubar from 'primevue/menubar';

export default {
  name: 'Index',

  components: {
    Menubar,
  },

  data() {
    return {
      version: '20220803',
      items: [
        {
          label: 'files',
          to: '/files',
        },
        {
          label: 'viewer',
          to: '/viewer',
        },
        {
          label: 'analysis',
          to: '/analysis',
        },
      ],
    };
  },
};
</script>

<style scoped>
.p-menubar {
  margin-bottom: 1rem;
}

.p-menuitem > a {
  display: inline-block;
  width: 7rem;
  color: black;
  text-decoration: none;
}

.p-menuitem > a.active-link-exact {
  background-color: #EEFFFF;
}
</style>
