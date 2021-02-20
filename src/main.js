import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue';

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
