import Vue from "vue";
import App from "./App.vue";

// import axios from 'axios'
// import VueAxios from 'vue-axios'

import store from './storage/store';

import Grid from "./plugins/Grid";
import Modal from "./plugins/Modal";
import Preloader from "./plugins/Preloader";

// Vue.use(VueAxios, axios);

const Plugin = {
    install(Vue) {
        Vue.component('grid', Grid);
        Vue.component('modal', Modal);
        Vue.component('preloader', Preloader);
    }
};

Vue.config.productionTip = false;
Vue.use(Plugin);

new Vue({
    store,
    render: h => h(App)
}).$mount("#app");
