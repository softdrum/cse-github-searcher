import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import BaseCard from '@/components/cards/BaseCard';
import titleMixin from './mixins/title.mixin';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.mixin(titleMixin);

Vue.component('base-card', BaseCard);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')