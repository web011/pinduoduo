import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入第三方组件库 mint-ul
import MintUI from 'mint-ui'
// 引入mintui样式
import "mint-ui/lib/style.css"
import "./font/iconfont.css"
// 将mint-ui注册到Vue里面
Vue.use(MintUI)


// 使用vant
import { PullRefresh } from 'vant';
// import 'vant/lib/pull-refresh/index.css';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import 'vant/lib/goods-action/index.css';
import 'vant/lib/goods-action-button/index.css';
import 'vant/lib/goods-action-icon/index.css';
Vue.use(PullRefresh)
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(GoodsActionIcon);

// 使用第三方库 ly-tab
import LyTab from "ly-tab"
Vue.use(LyTab)

import '@/font/css/style.css';

// 引入axios
import axios from "axios"
// 配置请求时保存session信息
axios.defaults.withCredentials=true;
// 配置请求基础路劲
axios.defaults.baseURL="http://127.0.0.1:8080/"
// 注册
Vue.prototype.axios=axios;
import Vuex from "vuex"
Vue.use(Vuex)


var store = new Vuex.Store({
  state:{
    goods_id:"111",
    uname:''
  },
  mutations:{
    // 修改共享变量
    uname(state,name){
      state.uname=name;
    },
    goodsuid(state,id){
      state.goods_id=id;
    }
  },
  getters:{
    // 获取共享变量
    getgoodsuid(state){
      return state.goods_id;
    },
    getuname(state){
      return state.uname;
    }
  },
  actions:{
    // 异步修改共享变量
    ybAge:(context=>{
      setTimeout(() => {
        context.commit("clage")
      }, 1500);
    })
  }
})

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
