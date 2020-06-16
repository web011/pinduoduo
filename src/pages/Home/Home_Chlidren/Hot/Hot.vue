<template>
    <div class="Hot">
        <!-- 1 轮播图 -->
        <div>
            <mt-swipe :auto="4000" class="w">
                <mt-swipe-item><img src="../imgs/1.webp" alt="" width="100%" height="95%"></mt-swipe-item>
                <mt-swipe-item><img src="../imgs/2.webp" alt="" width="100%" height="95%"></mt-swipe-item>
                <mt-swipe-item><img src="../imgs/3.webp" alt="" width="100%" height="95%"></mt-swipe-item>
                <mt-swipe-item><img src="../imgs/4.webp" alt="" width="100%" height="95%"></mt-swipe-item>
                <mt-swipe-item><img src="../imgs/5.webp" alt="" width="100%" height="95%"></mt-swipe-item>
                <mt-swipe-item><img src="../imgs/6.webp" alt="" width="100%" height="95%"></mt-swipe-item>
                <mt-swipe-item><img src="../imgs/7.webp" alt="" width="100%" height="95%"></mt-swipe-item>
                <mt-swipe-item><img src="../imgs/8.webp" alt="" width="100%" height="95%"></mt-swipe-item>
                <mt-swipe-item><img src="../imgs/9.webp" alt="" width="100%" height="95%"></mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 2 广告 -->
        <div class="hot-ad">
            <img src="./listimg/ggao.png" alt="" width="100%">
        </div>
        <!-- 3 中间导航 -->
        <hotnav></hotnav>
        <commodity-recommend></commodity-recommend>
        <hotshoplist></hotshoplist>
    </div>
</template>
<script>
import HotNav from './Hot-Nav'
import HotShopList from './HotShopList'
import CommodityRecommend from './Commodity-Recommend'
export default {
    components:{
        "hotnav":HotNav,
        "hotshoplist":HotShopList,
        "commodity-recommend":CommodityRecommend
    }
}
</script>
<style scoped>
.Hot{
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
}
.w{
    display: inline-block;
    width: 100%;
    height: 135px;
    margin-top: 47px;
    background-image: url('../imgs/1.webp');
    background-position-y: 135px;
    background-size: 100%;
}
.hot-ad{
    background-color: #fff;
    margin-top: -3px;
}
</style>