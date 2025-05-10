import Vue from 'vue'
// 全局引入(1)
import ElementUI from 'element-ui';
// 需要注意的是，样式文件需要单独引入。
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import './api/mock'

//按需引入(1)
// import { Row,Button } from "element-ui"

import App from './App.vue'

Vue.config.productionTip = false

// 全局引入(2)
Vue.use(ElementUI);
//按需引入(2)
// Vue.use(Row);
// Vue.use(Button);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
