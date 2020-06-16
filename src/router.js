import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home/Home'
import Recommend from './pages/Recommend/Recommend'
import Fl from './pages/Fl/Fl'
import Chat from './pages/Chat/Chat'
import Me from './pages/Me/Me'
import Login from './pages/Login/Login'
import Mesetting from './pages/Me/Mesetting'
import Goods from './pages/Goods/Goods'
import Collection from './pages/Collection/Collection'

// 二级路由
import Hot from './pages/Home/Home_Chlidren/Hot/Hot'
import WC from './pages/Home/Home_Chlidren/WC'
import BM from './pages/Home/Home_Chlidren/BM'
import Box from './pages/Home/Home_Chlidren/Box'
import CarProducts from './pages/Home/Home_Chlidren/CarProducts'
import DS from './pages/Home/Home_Chlidren/DS'
import Hd from './pages/Home/Home_Chlidren/Hd'
import Food from './pages/Home/Home_Chlidren/Food'
import Fruits from './pages/Home/Home_Chlidren/Fruits'
import HEA from './pages/Home/Home_Chlidren/HEA'
import HT from './pages/Home/Home_Chlidren/HT'
import MensWear from './pages/Home/Home_Chlidren/MensWear'
import MI from './pages/Home/Home_Chlidren/MI'
import Movement from './pages/Home/Home_Chlidren/Movement'
import MP from './pages/Home/Home_Chlidren/MP'
import Underwear from './pages/Home/Home_Chlidren/Underwear'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path:'/home',component:Home,
      children:[
        {path:"Hot",component:Hot,meta:{showBottomTabbar:true}},
        {path:"WC",component:WC},
        {path:"Box",component:Box},
        {path:"BM",component:BM},
        {path:"CarProducts",component:CarProducts},
        {path:"DS",component:DS},
        {path:"Hd",component:Hd},
        {path:"Food",component:Food},
        {path:"Fruits",component:Fruits},
        {path:"HEA",component:HEA},
        {path:"HT",component:HT},
        {path:"MensWear",component:MensWear},
        {path:"MI",component:MI},
        {path:"Movement",component:Movement},
        {path:"MP",component:MP},
        {path:"Underwear",component:Underwear},
        {path:"/home",redirect:"/home/hot"},
      ],
    },
    {path:"/",redirect:"/home"},
    {path:"/recommend",component:Recommend,meta:{showBottomTabbar:true}},
    {path:"/Fl",component:Fl,meta:{showBottomTabbar:true}},
    {path:"/chat",component:Chat,meta:{showBottomTabbar:true}},
    {path:"/me",component:Me,meta:{showBottomTabbar:true}},
    {path:"/goods",component:Goods},
    {path:"/collection",component:Collection},
    {path:"/login",component:Login},
    {path:"/setting",component:Mesetting},
    {path:"/*",component:function(){
      document.write("错误输入地址栏")
    }}
  ]
})
