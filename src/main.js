import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './components';

import Filters from './plugins/filters';

import './assets/sass/index.scss';

Vue.config.productionTip = false;
Vue.use(Filters);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
