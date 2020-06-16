<template>
 <div class="app-container">
    <router-view></router-view>
    <tabbar v-show="$route.meta.showBottomTabbar"></tabbar>
 </div>
</template>
<script>
import TabBar from "./components/TabBar/TabBar"
export default {
   components:{
      "tabbar":TabBar,
   },
}
</script>
<style>
*{margin: 0;padding: 0;}
   .app-container{
     padding-top:0px;
     padding-bottom:0px;
     overflow-x:hidden;
   }

 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;

}
.mint-tabbar>.mint-tab-item.is-selected{
    /* 透明背景 */
    background-color: transparent;
    color: #e02e24 !important;
}
.mint-tab-item-label {
   font-size: 8px !important;
}
.ly-tab-item{
    font-weight: bold;
}
</style>
