<template>
    <div class="shop-container">
        <ul class="shop-list" type="none">
            <li class="shop-list-item" v-for="index of 3" :key="index">
                <img src="./listimg/1.webp" alt="">
                <h4 class="list-item-title"><img src="./listimg/1_h4.webp" alt=""> 【10双--20双装】袜女士防勾丝肉色包芯丝钢丝面膜袜子薄款短丝袜</h4>
                <div class="list-item-bottom">
                    <span class="item-price">¥1亿</span>
                    <span class="item-count">已拼10万+件</span>
                    <span class="item-user">
                        <img src="./listimg/list-user1.webp" alt="">
                        <img src="./listimg/list-user2.webp" alt="">
                    </span>
                    <span class="item-buy">
                        <button>去拼单 ></button>
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.shop-container{
    margin-bottom: 50px;
    background-color: #f5f5f5;
}
.shop-list-item{
    margin-bottom: 10px;
    margin-top: 10px;
    background-color: #fff;
    display: flex;flex-direction: column;

}
.list-item-title{
    line-height: 22px;
    width: 94%;
    margin-left: 3%;
    height: 44px;
    overflow: hidden;
    margin-top: 5px;
}
.list-item-title>img{
    width: 40px;
}
.list-item-bottom{
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.item-price{
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    color: red;
    flex: 1;
}
.item-count{
    flex: 2;
    font-size: 12px;
    color: #ccc;
}
.item-user{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
}
.item-user>img{
    width: 30px;
    border-radius: 50%;
}
.item-user>img:nth-child(2){
    margin-left: -6px;
}
.item-buy{
    flex: 2;
    font-size: 15px;
}
.item-buy>button{
    width: 80%;
    border: none;
    height: 34px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    background-color: red;
    border-radius: 5px;
}
</style>