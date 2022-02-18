/* eslint-disable import/order */
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import mdiVue from 'mdi-vue/v3';
import * as mdijs from '@mdi/js';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import 'primevue/resources/themes/mdc-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.min.css';

/* eslint-disable-next-line import/extensions */
import ja from '@/i18n/locale/ja.js';
/* eslint-enable import/order */

// app
createApp(App)
  .use(store)
  .use(router)
  .use(mdiVue, { icons: mdijs })
  .use(PrimeVue, { locale: ja })
  .component('Button', Button)
  .component('SelectButton', SelectButton)
  .mount('#app');
