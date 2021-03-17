// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import './assets/reset.css';
import 'animate.css';
import 'element-ui/lib/theme-chalk/index.css';
// 公用属性
Vue.prototype.$localhost = "http://127.0.0.1:3000"
// 引入饿了么ui
import ElementUI from 'element-ui';
Vue.use(ElementUI);

// 导入公共组件
import comComponents from './components';
for (const k in comComponents) {
  if (Object.hasOwnProperty.call(comComponents, k)) {
    const element = comComponents[k];
    Vue.component(k,element)
  }
}
// 导入公共过滤器
import comFilters from './filters';
for (const k in comFilters) {
  if (Object.hasOwnProperty.call(comFilters, k)) {
    const element = comFilters[k];
    Vue.filter(k,element)
  }
}
// 引入vux
import store from './store';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
