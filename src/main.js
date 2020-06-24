import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';

// styles
import '@/styles/main.scss';

Vue.config.productionTip = false;

const store = createStore();
const router = createRouter({ store });

const app = {
  router,
  store,
  render: (h) => h(App),
};

new Vue(app).$mount('#app');
