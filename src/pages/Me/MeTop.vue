<template>
    <div class="me-top">
    <router-link tag="div" class="user" to="">
      <img src="./images/mes.jpg" alt="">
      <p>{{$store.getters.getuname}}</p>
      <i class="itlike-3"></i>
    </router-link>
    <div class="my-older">
      <div class="older-top">
        <h3>我的订单</h3>
        <span>查看全部 > </span>
      </div>
      <div class="older-bottom">
        <div class="bottom-item">
          <i class="itlike-1"></i>
          <span class="font">待付款</span>
        </div>
        <div class="bottom-item">
          <i class="itlike-2"></i>
          <span class="font">待分享</span>
        </div>
        <div class="bottom-item">
          <i class="itlike-3"></i>
          <span class="font">待发货</span>
        </div>
        <div class="bottom-item">
          <i class="itlike-4"></i>
          <span class="font">待收货</span>
        </div>
        <div class="bottom-item">
          <i class="itlike-5"></i>
          <span class="font">待评价</span>
        </div>
      </div>
    </div>
    <div class="older-bottom" id="top">
        <div class="bottom-item">
          <i class="itlike-1"></i>
          <span class="font">优惠价</span>
        </div>
        <div class="bottom-item">
          <i class="itlike-2"></i>
          <router-link class="font" to="/Collection" style="text-decoration: none">商品收藏</router-link>
        </div>
        <div class="bottom-item">
          <i class="itlike-3"></i>
          <span class="font">历史浏览</span>
        </div>
        <div class="bottom-item">
          <i class="itlike-4"></i>
          <span class="font">退款售后</span>
        </div>
        <div class="bottom-item">
          <i class="itlike-5"></i>
          <span class="font">我的评价</span>
        </div>
      </div>
    <div class="setting">
      <div class="setting-item">
        <i class="itlike-1"></i>
        <span class="font">新人红包</span>
      </div>
      <div class="setting-item">
        <i class="itlike-2"></i>
        <span class="font">多多果园</span>
      </div>
      <div class="setting-item">
        <i class="itlike-3"></i>
        <span class="font">砍价免费拿</span>
      </div>
      <div class="setting-item">
        <i class="itlike-4"></i>
        <span class="font">边逛边赚</span>
      </div>
      <div class="setting-item">
        <i class="itlike-5"></i>
        <span class="font">天天领红包</span>
      </div>
      <div class="setting-item">
        <i class="itlike-uniE902"></i>
        <span class="font">收货地址</span>
      </div>
      <div class="setting-item">
        <i class="itlike-1"></i>
        <span class="font">我的评价</span>
      </div>
      <div class="setting-item">
        <i class="itlike-3"></i>
        <span class="font">官方客服</span>
      </div>
      <router-link tag="div" class="setting-item" to="/setting">
        <i class="itlike-4"></i>
        <span class="font">设置</span>
      </router-link>
    </div>
    <div class="chat-titile">
      <img src="./images/tj.png" alt="" width="23px">
      <span>精品推荐</span>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="recommend-container" v-if="arr.length > 0">
            <ul class="recommend">
                <shoplist 
                v-for="(item,index) of arr" 
                :key="index"
                :item="item"
                ></shoplist>
            </ul>
        </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import ShopList from '../../components/ShopList/ShopList'
export default {
    data(){
        return {
            name:"",
            isLoading:false,
            arr:[],
            pno:0,
        }
    },
    created(){
      this.loadMore();
    },
    methods:{
      loadMore(){
            var url='product';
            this.pno++;
            var obj={pno:this.pno}
            this.axios.get(url,{params:obj}).then(res=>{
                if(res.data.code==-1){
                    this.$toast("请先登陆");
                    this.$router.push('/me')
                }else{
                     this.arr=res.data.data;
                }
            })
        },
        onRefresh() {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.loadMore();
                this.isLoading = false;
            }, 100);
        },
    },
    components:{
        "shoplist":ShopList
    },
}
</script>
<style scoped>
.me-top{font-size :14px}
.me-top>.user{
    display :flex;
    flex-direction :row;
    align-items :center;
    padding :20px;
    background-color: #fff;
    margin-bottom :10px;
}
.me-top>.user>p{margin: 0 10px;}
.me-top>.user>img{
    width :60px;
    height :60px;
    border-radius :50%;
    background-size: 100%;
}
.me-top>.user>i{font-size :25px;}
.my-older{background-color :#fff}
.older-top{
    display: flex;
    flex-direction: row;
    padding: 0 10px;
    justify-content: space-between;
    height: 44px;
    line-height: 44px;
}
.older-bottom{ display: flex;background-color: #fff;}
#top{margin-top: 10px;}
.bottom-item{
    flex :1;
    height :60px;
    display :flex;
    flex-direction :column;
    justify-content :center;
    align-items :center;
}
.bottom-item>i{
    font-size: 30px;
    color: #E9232C;
    margin-bottom: 5px;
}
.setting{
    margin-top: 10px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.setting-item{
    width: 90px;
    height :70px;
    display :flex;
    flex-direction :column;
    justify-content: center;
    align-items: center;
}
.setting-item>i{
    font-size: 30px;
    color: orange;
    margin-bottom: 5px;
}
 .font{
   font-size: 12px;
   color: #666;
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
</style>