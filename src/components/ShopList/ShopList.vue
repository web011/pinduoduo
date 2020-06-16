<template>
    <div class="recommend-item">
        <div>
            <img :src="item.thumb_url" alt="" width="100%">
            <h4 class="item-title">{{item.short_name}}</h4>
            <div class="subtitle">
                <span>退货包运货</span>
                <span style="margin-left:5px;">极速退货</span>
                <span style="margin-left:5px;">{{item.subtitle3}}</span>
            </div>
            <div class="item-bottom">
                <span class="pirces">￥{{item.price / 10}}</span>
                <span class="counts">{{item.sales_tip}}</span>
                <div class="item-btn">
                    <button @click="coods($event)" :data-id="item.goods_id" >查看商品</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            arr:[]
        }
    },
    props:{
        item:Object
    },
    methods:{
        coods(e){
            var goods_id=e.target.dataset.id;
            this.$store.commit("goodsuid",goods_id);
            this.$router.push('/goods');
        },
    }
}
</script>
<style scoped>
.recommend-container>.recommend .recommend-item{
    width: 49.5%;
}
.recommend-container>.recommend .recommend-item:nth-child(2n-1){
    margin-right: 1%;
}
.item-title{
    line-height: 20px;
    font-size: 13px;
    font-weight: lighter;
    display: flex;
    justify-content: left;
    height: 20px;
    overflow: hidden;
    margin-left: 10px;
}
.subtitle>span{
    color: rgb(255, 87, 6);
    background-color: rgba(255, 87, 6, 0.08);
    font-size: 12px;
    margin-left: 10px;
}
.item-bottom{
    margin: 5px 0 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.spanimg{margin-right: 5px;}
.counts{color: #9c9c9c;font-size: 10px;margin-right: 10px;}
.pirces{color: red;font-size: 13px;font-weight: bold; margin-left: 9px;}
.item-btn>button{
    border: 1px solid orange;
    height: 25px;
    width: 50px;
    font-size: 11px;
    margin-right: 5px;
    border-radius: 5px;
    background-color: transparent;
    color: red;
}
</style>