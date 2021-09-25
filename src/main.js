import Vue from 'vue'
import Antd from 'ant-design-vue';
import router from "@/router";
import 'ant-design-vue/dist/antd.css'
import "./style/global.less"
import store from "@/store";
import VCharts from 'v-charts'
import App from './App.vue'

Vue.use(Antd)
Vue.use(VCharts)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
