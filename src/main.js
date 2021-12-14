import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/* eslint-disable import/order */
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import 'primevue/resources/themes/mdc-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.min.css';

import ja from '@/i18n/locale/ja.js';

// app
const app = createApp(App);
app.use(store).use(router).use(PrimeVue, { locale: ja });
app.component('Button', Button);
app.component('InputText', InputText);
app.mount('#app');
