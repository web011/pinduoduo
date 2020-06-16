<template>
    <div class="hot-nav">
        <!-- 滚动区域 -->
        <div class="hot-nav-content">
            <div class="nav-content-inner">
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/1_1.webp" alt="">
                    <img class="imgx" src="../../../../assets/hot-nav/x.webp" alt="">
                    <span>限时秒杀</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/1_2.webp" alt="">
                    <span>断码清仓</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/1_3.webp" alt="">
                    <span>新衣馆</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/1_4.webp" alt="">
                    <img class="imgx" src="../../../../assets/hot-nav/x.webp" alt="">
                    <span>免费领水果</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/1_5.webp" alt="">
                    <span>9块9特卖</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/1_6.webp" alt="">
                    <span>多多爱消除</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/1_7.webp" alt="">
                    <span>天天领现金</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/1_8.webp" alt="">
                    <span>省钱月卡</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/2_1.webp" alt="">
                    <span>充值中心</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/2_2.webp" alt="">
                    <span>医药馆</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/2_3.webp" alt="">
                    <img class="imgx" src="../../../../assets/hot-nav/x.webp" alt="">
                    <span>现金签到</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/2_4.webp" alt="">
                    <span>多多赚大钱</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/2_5.webp" alt="">
                    <span>电器城</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/2_6.webp" alt="">
                    <span>爱逛街</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/2_7.webp" alt="">
                    <span>砍价免费拿</span>
                </a>
                <a class="inner-item">
                    <img src="../../../../assets/hot-nav/2_8.webp" alt="">
                    <span>每日好店</span>
                </a>
            </div>
        </div>
        <!-- 进度条 -->
        <div class="hot-nav-bottom">
            <div class="hot-nav-bottom-inner" :style="innerBarStyle"></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            // 1屏幕的宽度
            screenW:window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            // 2滚动内容宽度
            // 越多越断，通过这个来判断移动位置
            scrollContentW:720,
            // 3滚动条背景长度
            bgBarW:100,
            // 4滚动条的长度
            barXWidth:0,
            // 5起点
            startX:0,
            // 6记录结束点
            endFlag:0,
            // 7移动距离
            barMoveWidth:0
        }
    },
    mounted(){
        this.getBottomBarWidth();
        this.bindEvent();
    },
    computed:{
        innerBarStyle(){
            return {
                width: `${this.barXWidth}px`,
                left:`${this.barMoveWidth}px`
            }
        }
    },
    methods:{
        getBottomBarWidth(){
            this.barXWidth = this.bgBarW * (this.screenW / this.scrollContentW)
        },
        // 移动端监听
        bindEvent(){
            this.$el.addEventListener('touchstart',this.handleTouchStart,false);
            this.$el.addEventListener('touchmove',this.handleTouchMove,false);
            this.$el.addEventListener('touchend',this.handleTouchEnd,false)
        },
        // 开始触摸
        handleTouchStart(event){
            // console.log(event.touches);
            // 1 获取第一个触点
            let touch = event.touches[0];
            // 2 求出起始点
            this.startX = Number(touch.pageX);
        },
        // 开始移动
        handleTouchMove(){
            // console.log("开始移动")
            // 1 获取第一个触点
            let touch = event.touches[0];
            // 2 求出移动的距离
            let moveWidth = Number(touch.pageX) -this.startX;
            // 3 求出滚动条走的距离
            this.barMoveWidth = -((this.bgBarW / this.scrollContentW) * moveWidth - this.endFlag);
            // 4 边界值处理
            if(this.barMoveWidth <= 0){ //左边
                this.barMoveWidth=0;
            }else if(this.barMoveWidth >= this.bgBarW - this.barXWidth){
                this.barMoveWidth = this.bgBarW - this.barXWidth;
            }
        },
        // 结束触摸
        handleTouchEnd(){
            // console.log("结束触摸");
            this.endFlag = this.barMoveWidth;
        }
    }
}
</script>
<style scoped>
.hot-nav{
    width: 100%;
    height: 150px;
    position: relative;
    padding-bottom: 10px;
}
.hot-nav-content{
    width: 100%;
    overflow-x: scroll;
}
.nav-content-inner{
    width: 720px;
    height: 160px;
    display: flex;
    flex-wrap: wrap;
    background-color: #ffffff;
}
.inner-item{
    width: 90px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #666;
    position: relative;
}
img{
    width: 37.4375px;
    height: 37.4375px;
    margin-bottom: 5px;
}
span{
    font-size: 12px;
}
.hot-nav-content::-webkit-scrollbar{
    display: none;
}
.hot-nav-bottom{
    width: 100px;
    height: 2px;
    background-color: #cccccc;
    position: absolute;
    bottom: 8px;
    left: 50%;
    margin-left: -50px;
}
.hot-nav-bottom-inner{
    position: absolute;
    left: 0;
    height: 100%;
    background-color: orangered;
    width: 0px;
}
.imgx{
    width: 15px;
    height: 15px;
    position: absolute;
    top:0;
    left: 55px;
}
</style>