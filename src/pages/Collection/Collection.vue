<template>
    <div class="collection-container">
        <titlebar :inshowsearch="inshowsearch"></titlebar>
        <div class="top-del">
            <router-link to="/me" class="rto">返回</router-link>
            <div>
                <a href="javascript:;" v-show="!guanli" @click="guanl">管理</a>
                <a href="javascript:;" v-show="guanli" @click="guanl1">完成</a>
            </div>
        </div>
        <div class="collection-item" v-for="(item,index) of arr" :key="index" v-show="arr.length > 0">
            <input type="checkbox" v-model="item.cb" @change="select">
            <img :src="item.thumb_url" alt="" width="100px">
            <div class="collection-title">
                <span>{{item.goods_name}}</span>
                <button @click="ks" :data-url="item.thumb_url" :data-price="item.price">请选择款式</button>
                <div class="bottom-b">
                    <span class="price">￥{{item.price}}</span>
                    <span class="tip">{{item.cart_tip}}</span>
                    <span class="gengduo">...</span>
                </div>  
            </div>
        </div>
        <div class="buttom-flex" :class="marginBottom">
            <div class="top-title">
                <div class="title-bottom">
                    <img :src="list.thumb_url" alt="" height="100px">
                    <div class="j" style="margin-top:25px;margin-left:10px;">
                        <p class="title-price">￥{{list.price}}-{{list.price-120}}</p>
                        <span class="title-subtitle">请选择 款式</span>
                    </div>
                </div>
                <span style="margin-bottom: 50px;margin-right:10px;font-weight: bold;color: #999;" @click="nones">X</span>
            </div>
            <div class="bottom-neir">
                <span>款式</span>
                <div class="m" style="padding: 5px 5%;">
                    <span v-for="index in 6" :key="index" :data-index="index" @click="dianji" :class="index==i?'xz':'bxz'" class="bxz">【多功能透气款】粉色</span>
                </div>
            </div>
            <div class="bottom-count">
                <span>数量</span>
                <div class="count-button">
                    <button @click="counts(-1)">-</button>
                    <span>{{n}}</span>
                    <button @click="counts(+1)">+</button>
                </div>
            </div>
            <div class="buttons">
                <mt-button size="large">确定</mt-button>
            </div>
        </div>
        <div v-show="arr.length == 0" class="kkry">
            <span class="kkryspan">空空如也</span>
        </div>
        <div class="js" v-show="yinchang">
            <span>已选{{num}}款</span>
            <div class="js-right">
                <span>合计:<span style="color:red;font-size:15px;">￥{{total}}</span></span>
                <button>去结算</button>
            </div>
        </div>
        <div v-show="not">
            <div class="js" v-show="yinchang==false">
                <span @change="quanx">
                    <input type="checkbox" v-model="quanxs">
                    全选
                </span>
                <div class="js-right">
                    <button @click="deleitem">删除</button>
                </div>
            </div>
        </div>
        <searchpanel v-if="inshow" :inshowsearch="inshowsearch"></searchpanel>
        <div class="chat-titile" v-show="yinchang">
            <img src="./img/tj.png" alt="" width="23px">
            <span>精品推荐</span>
        </div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-show="yinchang">
            <div class="recommend-container">
                <ul class="recommend">
                    <shoplist 
                    v-for="(item,index) of arrs" 
                    :key="index"
                    :item="item"
                    ></shoplist>
                </ul>
            </div>
        </van-pull-refresh>
    </div>
</template>
<script>
import TitileBar from '../../components/TitileBar/TitileBar'
import SearchPanel from '../../components/TitileBar/SearchPanel'
import ShopList from '../../components/ShopList/ShopList'
export default {
    data(){
        return {
            marginBottom:{
                // 0
                marginBottom:false,
                // -450
                marginBottoms:true
            },
            inshow:false,
            arr:[],
            list:[],
            i:0,
            n:1,
            delects:false,
            delid:[],
            yinchang:true,
            isLoading:false,
            arrs:[],
            pno:0,
            guanli:false,
            quanxs:false,
            not:true,
            shouchangxz:[]
        }
    },
    created(){
        this.collection();
        this.loadMore();
    },
    computed:{
        num(){
            var num=0;
            for(var item of this.arr){
                if(item.cb)
                    num+=1;
            }
            return num;
        },
        total(){
            var total=0;
            for(var s of this.arr){
                if(s.cb){
                    total+=s.price;
                }
            }
            return total;
        },
    },
    methods:{
        loadMore(){
            var url='product';
            this.pno++;
            var obj={pno:this.pno}
            this.axios.get(url,{params:obj}).then(res=>{
                this.arrs=res.data.data;
            })
        },
        inshowsearch(bool){
            this.inshow=bool;
        },
        collection(){
            var url="collection";
            this.axios.get(url).then(res=>{
                if(res.data.code == -1){
                    this.$messagebox("消息","请先登陆").then(res=>{
                        this.$router.push("/me")
                    })
                }else{
                   this.arr=res.data.data;
                   this.shuxing();
                }
            });
        },
        ks(e){
            var price=e.target.dataset.price;
            var url=e.target.dataset.url;
            this.list.price=price;
            this.list.thumb_url=url;
            this.marginBottom.marginBottom=true;
            this.marginBottom.marginBottoms=false;
            this.yinchang=false;
            this.not=false;
        },
        nones(){
            this.marginBottom.marginBottom=false;
            this.marginBottom.marginBottoms=true;
            this.n=1;
            this.i=0;
            setTimeout(() => {
                this.yinchang=true;
                this.guanli=false;
                this.not=true;
            }, 500);
        },
        dianji(e){
            this.i=e.target.dataset.index;
        },
        counts(i){
            this.n+=i;
        },
        onRefresh() {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.loadMore();
                this.isLoading = false;
            }, 100);
        },
        guanl(){
            if(this.arr.length>0){
                this.guanli=true;
                this.yinchang=false;
            }
        },
        guanl1(){
            this.guanli=false;
            this.yinchang=true
        },
        quanx(){
            for(var t of this.arr){
                t.cb=this.quanxs;
            }
        },
        deleitem(){
            this.$messagebox.confirm("是否删除所选中的商品")
            .then(res=>{
                var id="";
                for(var item of this.arr){
                    if(item.cb){
                        id+=item.id+',';
                    }
                }
                id=id.slice(0,-1);
                if(id===""){
                    this.$toast("请选择需要删除的商品");
                    return;
                }
                this.axios.get("/delcollections",{params:{id}})
                .then(res=>{
                    if(res.data.code==-1){
                        this.$toast("删除失败");
                    }else{
                        this.$toast("删除成功");
                        this.collection();
                    }
                })
            })
        },
        select(){
            var count=0;
            for(var item of this.arr){
                if(item.cb)
                    count+=1;
            }
            if(count==this.arr.length)
                this.quanxs=true;
            else
                this.quanxs=false;
        },
        shuxing(){
            this.guanli=false;
            if(this.arr.length==0){
                this.yinchang=true;
            }
            if(this.arr.length>0){
                for(var s of this.arr){
                    this.shouchangxz.push(s.goods_id);
                }
            }
        }
    },
    components:{
        "titlebar":TitileBar,
        "searchpanel":SearchPanel,
        "shoplist":ShopList,
    },
    watch:{
        n(){
            if(this.n<1){
                this.n=1;
            }
        }
    },
}
</script>
<style scoped>
.collection-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 55px;
    background-color: #f5f5f5;
    margin-bottom: 50px;
}
.collection-item{
    width: 100%;
    height: 110%;
    display: flex;
    justify-content:left;
    align-items: center;
    background-color: #fff;
    margin-top: 5px;
}
.collection-item>input{
    width: 25px;
    height: 25px;
    margin-left: 20px;
    margin-right: 10px;
}
.collection-title{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.collection-title>span{
    color: #666;
    font-size: 14px;
    margin-top: 13px;
    padding: 0 5px;
    height: 33px;
    overflow: hidden;
}
.collection-title>button{
    width: 70px;
    height: 20px;
    color:#666;
    font-size: 13px;
    border:none;
    background-color: #fff;
    border: 0.001rem solid #666;
    margin: 10px 0 20px 10px;
    outline: none;
}
.collection-title .price{
    color: red;
    font-weight: bold;
    margin-left: 10px;
}
.collection-title .tip{
    color: #666;
    font-size: 12px;
    margin-right: 45px;
}
.collection-title .gengduo{
    font-weight: bold;
    margin-right: 10px;
}
.top-del{
    width:100%;height:20px;
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.top-del>.rto{
    padding: 5px;
    color: #666;
}
.top-del a{
    text-decoration: none;
    color: #666;
    padding: 5px;
}
.buttom-flex{
    width: 100%;
    height: 400px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    transition: .5s linear;
}
.top-title{
    width: 100%;
    height: 100px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #666;
}
.title-bottom>img{
    margin-bottom: 30px;
}
.title-bottom{
    display: flex;
}
.title-bottom>j{
    flex-direction: column;
}
.title-price{
    color: red;
    font-size: 13px;
    font-weight: bold;
}
.title-subtitle{
    color: #222;
    font-size: 13px;
}
.bottom-neir{
    height: 140px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #666;
}
.bottom-neir>span{
    color: #666;
    padding: 5px;
}
.bxz{
    width: 41%;
    background-color: #f5f5f5;
    font-size: 13px;
    color: #999;
    padding: 5px;
    margin-right: 10px;
    border-radius: 5px;
    display: inline-block;
    margin-bottom: 10px;
}
/* 选中的样式 */
.xz{
    background-color: red;
    color:#fff;
}
.bottom-count{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #666;
}
.bottom-count>span{
    color: #000;
    font-size: 14px;
}
.count-button>button{
    width: 30px;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 5px;
}
.count-button>span{
    margin: 0 10px;
    font-size: 13px;
    font-weight: bold;
}
.buttons{
    margin-top: 65px;
}
.mint-button--default{
    background-color: red;
    color: #fff;
}
.marginBottom{
    margin-bottom: 0;
}
.marginBottoms{
    margin-bottom: -450px;
}
.kkry{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    text-align: center;
    line-height: 242.5px;
}
.kkry>.kkryspan{
    font-size: 20px;
    color: #666;
}
.js{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    z-index: 999;
}
.js>span{
    font-size: 13px;
    margin: 10px;
    color: #666;
}
.js>.js-right{
    font-size: 13px;
    height: 100%;
}
.js>.js-right>button{
    width: 110px;
    height: 100%;
    background-color: red;
    border: none;
    color: #fff;
    margin-left: 10px;
    border-radius: 3px;
}
.chat-titile{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.chat-titile>img{
    margin-right: 2px;
}
.recommend-container{
    background-color: #f5f5f5;
    width: 100%;
    height: 100%;
}
.recommend-container>.recommend{
    display: flex;
    flex-wrap: wrap;
    background-color: #f5f5f5;
    margin-bottom: 47px;
}
.bottom-b{
    display: flex;
    justify-content: space-between;
}
</style>