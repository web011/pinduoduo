<template>
    <div class="commodity">
        <div class="commodity-title">
            <div class="lefttitle">
                <img src="./listimg/title.webp" alt="" width="25px">
                <span>百亿补贴</span>
            </div>
            <div class="subtitle">
                <span style="margin-right:20px;">|</span>
                <span>大牌正品 官方补贴</span>
            </div>
            <span><a href="javascript:;" class="subtitle" style="font-size:14px;margin-right: 10px;">查看更多 ></a></span>
        </div>
        <div class="commodity-bottom">
            <div class="commodity-padding">
                <div class="commodity-p">
                    <img src="./listimg/titlebottom1.webp" alt="" width="80px">
                    <div class="stitle">洁丽雅</div>
                    <span class="price-title">补贴价￥16</span>
                </div>
                <div class="commodity-p">
                    <img src="./listimg/titlebottom2.webp" alt="" width="80px">
                    <div class="stitle">箭牌</div>
                    <span class="price-title">补贴价￥36.5</span>
                </div>
                <div class="commodity-p">
                    <img src="./listimg/titlebottom3.webp" alt="" width="80px">
                    <div class="stitle">冷酸灵</div>
                    <span class="price-title">补贴价￥26.8</span>
                </div>
                <div class="commodity-p">
                    <img src="./listimg/titlebottom4.webp" alt="" width="80px">
                    <span class="stitle">洁柔</span>
                    <span class="price-title">补贴价￥19.9</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.commodity-title{
    height: 40px;
    width: 100%;
    background-color: #fff;
    margin-top: 10px;
    justify-content: space-between;
    align-items: center;
    display: flex;
}
.lefttitle{
    color: #151516;
    font: 16px;
    font-weight: bold;
    height: 40px;
    justify-content: center;
    display: flex;
    align-items: center;
}
.lefttitle>img{
    margin: 0 10px;
}
.subtitle{
    color: #9c9c9c;
    font-size: 12px;
    text-decoration:none;
}
.commodity-bottom{
    width: 100%;
    height: 120px;
    background-color: #fff;
}
.commodity-padding{
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 0 10px;
}
.commodity-p{
    width: 100%;
    position: relative;
    color: #e02e24;
    font-size: 12px;
    text-align: center;
}
.stitle{
    position: absolute;
    bottom: 25px;
    left: 10px;
    border: none;
    background-color: #d6a189;
    color:#fff;
    font-size: 10px;
}
.price-title{
    margin-top: 15px;
    display: inline-block;
}
</style>