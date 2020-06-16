<template>
    <div>
        <titlebar :inshowsearch="inshowsearch"></titlebar>
        <!-- 联动列表 -->
        <div class="shop">
            <!-- 左边 -->
            <div class="menu-wrapper">
                <ul type="none">
                    <li v-for="(item,index) of arr" :key="index" class="menu-item"
                    :class="{current:index === currentIndex}"
                    @click="_clickLeftItem(index)"
                    ref="menulist">
                        <span>{{item}}</span>
                    </li>
                </ul>
            </div>
            <!-- 右边 -->
            <div class="shop-wrapper">
                <ul type="none" ref="shopParent">
                    <li class="shop-li" v-for="(item,index1) of arr" :key="index1">
                        <div class="shop-title">
                            <h4>{{item}}<img src="../../assets/mhsh.webp" alt="" width="50px" style="margin-left:5px;"></h4>
                        </div>
                        <ul class="shops-item" type="none">
                            <li v-for="(item,index) of list" :key="index">
                                <img :src="item.img_url" alt="">
                                <span>{{item.title}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <searchpanel v-if="isShow" :inshowsearch="inshowsearch"></searchpanel>
    </div>
</template>
<script>
import TitleBar from '../../components/TitileBar/TitileBar'
import BScroll from 'better-scroll'
import SearchPanel from '../../components/TitileBar/SearchPanel'
export default {
    data(){
        return {
            scrollY:0,
            rightLiTops:[],
            arr:["推荐","鞋包","食品","美妆","母婴","内衣","手机","女装","百货","洗护","生鲜","男装","运动","数码","家装","充值"],
            list:[
                {lid:1,img_url:"https://t00img.yangkeduo.com/goods/images/2019-03-06/859a4194-b720-400a-841b-7d4c3672a61d.jpg",title:"短袜"},
                {lid:2,img_url:"https://t00img.yangkeduo.com/goods/images/2020-04-02/bc6cb19411cd18d3d7aefff5b213e6a2.jpeg",title:"连衣裙"},
                {lid:3,img_url:"https://t00img.yangkeduo.com/goods/images/2020-02-29/2b89938b6ec140885e4463e33e3f90ba.jpeg",title:"女装T血"},
                {lid:1,img_url:"https://t00img.yangkeduo.com/goods/images/2019-03-06/859a4194-b720-400a-841b-7d4c3672a61d.jpg",title:"短袜"},
                {lid:2,img_url:"https://t00img.yangkeduo.com/goods/images/2020-04-02/bc6cb19411cd18d3d7aefff5b213e6a2.jpeg",title:"连衣裙"},
                {lid:3,img_url:"https://t00img.yangkeduo.com/goods/images/2020-02-29/2b89938b6ec140885e4463e33e3f90ba.jpeg",title:"女装T血"},
                {lid:1,img_url:"https://t00img.yangkeduo.com/goods/images/2019-03-06/859a4194-b720-400a-841b-7d4c3672a61d.jpg",title:"短袜"},
                {lid:2,img_url:"https://t00img.yangkeduo.com/goods/images/2020-04-02/bc6cb19411cd18d3d7aefff5b213e6a2.jpeg",title:"连衣裙"},
                {lid:3,img_url:"https://t00img.yangkeduo.com/goods/images/2020-02-29/2b89938b6ec140885e4463e33e3f90ba.jpeg",title:"女装T血"},
                {lid:1,img_url:"https://t00img.yangkeduo.com/goods/images/2019-03-06/859a4194-b720-400a-841b-7d4c3672a61d.jpg",title:"短袜"},
                {lid:2,img_url:"https://t00img.yangkeduo.com/goods/images/2020-04-02/bc6cb19411cd18d3d7aefff5b213e6a2.jpeg",title:"连衣裙"},
                {lid:3,img_url:"https://t00img.yangkeduo.com/goods/images/2020-02-29/2b89938b6ec140885e4463e33e3f90ba.jpeg",title:"女装T血"},
                {lid:1,img_url:"https://t00img.yangkeduo.com/goods/images/2019-03-06/859a4194-b720-400a-841b-7d4c3672a61d.jpg",title:"短袜"},
                {lid:2,img_url:"https://t00img.yangkeduo.com/goods/images/2020-04-02/bc6cb19411cd18d3d7aefff5b213e6a2.jpeg",title:"连衣裙"},
                {lid:3,img_url:"https://t00img.yangkeduo.com/goods/images/2020-02-29/2b89938b6ec140885e4463e33e3f90ba.jpeg",title:"女装T血"},
                {lid:1,img_url:"https://t00img.yangkeduo.com/goods/images/2019-03-06/859a4194-b720-400a-841b-7d4c3672a61d.jpg",title:"短袜"},
                {lid:2,img_url:"https://t00img.yangkeduo.com/goods/images/2020-04-02/bc6cb19411cd18d3d7aefff5b213e6a2.jpeg",title:"连衣裙"},
                {lid:3,img_url:"https://t00img.yangkeduo.com/goods/images/2020-02-29/2b89938b6ec140885e4463e33e3f90ba.jpeg",title:"女装T血"},
            ],
            isShow:false, //设搜索面板的显示
        }
    },
    components:{
        "titlebar":TitleBar,
        "searchpanel":SearchPanel
    },
    created(){
        this.$nextTick(()=>{
            // 初始化
            this._initScroll(); 
            // 求出右边所有版块的头部位置
            this._initRightLiTops();
        });
    },
    computed:{
        currentIndex(){
            // 获取数据
            const {scrollY,rightLiTops} = this;
            // 取出索引
            return rightLiTops.findIndex((LiTop,index)=>{
                this._LeftScroll(index)
                return scrollY >= LiTop && scrollY < rightLiTops[index + 1]
            });
        }
    },
    methods:{
        _LeftScroll(index){
            let menuLists = this.$refs.menulist;
            let el = menuLists[index]
            this.LeftScroll.scrollToElement(el,300,0,-100)
            
        },
        _clickLeftItem(index){
            this.scrollY = this.rightLiTops[index];
            this.RightScroll.scrollTo(0,-this.scrollY,300);
        },
        _initScroll(){
            // 左边
            this.LeftScroll = new BScroll('.menu-wrapper',{
                click:true,
                tap:true
            });
            // 右边
            this.RightScroll = new BScroll('.shop-wrapper',{
                probeType:3,
                click:true,
                tap:true
            });
            // 监听右侧的滑动事件
            this.RightScroll.on('scroll',(pos)=>{
                this.scrollY = Math.abs(pos.y);
            });
        },
        _initRightLiTops(){
            // 临时数组
            const tempArr=[];
            // 定义变量记录高度
            let top=0;
            tempArr.push(top);
            // 遍历li标签，然后取出高度
            let allLis = this.$refs.shopParent.getElementsByClassName("shop-li")
            Array.prototype.slice.call(allLis).forEach(li=>{
                top += li.clientHeight;
                tempArr.push(top);
            });
            // 更新数据
            this.rightLiTops = tempArr;
        },
        inshowsearch(bool){
            this.isShow=bool;
        }
    }
}
</script>
<style scoped>
.shop{
    display: flex;
    position: absolute;
    bottom: 50px;
    top: 50px;
    width: 100%;
    background-color:#fff;
    overflow: hidden;
}
.shop>.menu-wrapper{
    background-color: #fafafa;
    width: 80px;
    flex: 0 0 80px;
}
.shop>.menu-wrapper .menu-item{
    width: 100%;
    height: 60px;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: lighter;
    color: #666;
    position: relative;
    font-size: 14px;
}
.shop>.menu-wrapper .current{
    color: #e02e24;
}
.shop>.menu-wrapper .current::before{
    content: "";
    background-color: #e02e24;
    width: 4px;
    height: 30px;
    position: absolute;
    left: 0;
}
.shop-wrapper{
    flex: 1;
    background-color: #fff;
}
.shop-title{
    display: flex;
    justify-content: left;
    flex-direction: row;
    font-weight: 500;
    font-size: 15px;
}
.shop-title>h4{
    padding: 10px 0 10px 10px;
}
.shops-item{
    display: flex;
    flex-wrap: wrap;
}
.shops-item>li{
    display: flex;
    flex-direction: column;
    width: 33.3%;
    height: 90px;
    justify-content: center;
    align-items: center;
    color: #666;
    font-size: 14px;
}
.shops-item>li>img{
    width: 60%;
    margin-bottom: 5px;
}
.phone-type{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-bottom:1px;
}
</style>