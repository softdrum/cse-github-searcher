import Vue from 'vue';
import App from './App.vue';
import router from './router'
import store from './store'
import BaseCard from '@/components/cards/BaseCard';
import {
  BootstrapVue,
  BIcon,
  BIconSearch,
  BIconArrowClockwise,
  BIconMailbox,
  BIconBriefcase,
  BIconGeoAlt,
  BIconStar,
  BIconPeople,
  BIconPencilSquare,
  BIconExclamationTriangleFill,
  BIconArrowLeft,
} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.component('BIcon', BIcon)
Vue.component('BIconSearch', BIconSearch)
Vue.component('BIconArrowClockwise', BIconArrowClockwise)
Vue.component('BIconMailbox', BIconMailbox)
Vue.component('BIconBriefcase', BIconBriefcase)
Vue.component('BIconGeoAlt', BIconGeoAlt)
Vue.component('BIconStar', BIconStar)
Vue.component('BIconPeople', BIconPeople)
Vue.component('BIconPencilSquare', BIconPencilSquare)
Vue.component('BIconExclamationTriangleFill', BIconExclamationTriangleFill)
Vue.component('BIconArrowLeft', BIconArrowLeft)
Vue.component('base-card', BaseCard);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')