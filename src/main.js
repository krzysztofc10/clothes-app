import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import pl from '@/translations/pl.json';
import en from '@/translations/en.json';

Vue.config.productionTip = false
Vue.use(VueI18n);

const messages = { en, pl };

const i18n = new VueI18n({ locale: 'en', fallbackLocale: 'en', messages });

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
