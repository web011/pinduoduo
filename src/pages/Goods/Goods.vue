<template>
  <div class="goods-containe">
      <div class="goods-item">
          <img :src="arr.thumb_url" alt="" width="100%">
          <div class="goods-title">
              <span style="color:red;margin-left:5px;">￥<span class="price">{{arr.price / 10}}</span><span style="font-size:12px;">起</span></span>
              <span class="tip">{{arr.sales_tip}}</span>
          </div>
          <span class="goods-name">{{arr.goods_name}}</span>
          <div class="goods-subtitle">
              <span style="margin-left:10px;">店内拼满34返3元</span>
              <div class="sub-left">
                  <span class="sub-span">满19元减2元</span>
                  <span class="sub-span">满29元减3元</span>
                  <span class="sub-span">满48元减5元</span>
              </div>
          </div>
          <div class="goods-bottom">
              <span class="bottom-span">极速退款</span>
              <span class="bottom-span">全场包邮</span>
              <span class="bottom-span">7天无理由退货</span>
              <span class="bottom-span">48小时发货</span>
          </div>
        <div class="bottom-tui">
            <div class="bottom-left">
                <div @click="gengduo">
                    <img src="./imgs/gd.png" alt="" width="15px" style="margin-bottom:5px;">
                    更多
                </div>
                <div @click="onClickIcon">
                    <img :src="require(imags?'./imgs/sc2.png':'./imgs/sc.png')" alt="" width="15px"  style="margin-bottom:5px;">
                    收藏
                </div>
                <div>
                    <img src="./imgs/kf.png" alt="" width="15px" style="margin-bottom:5px;">
                    客服
                </div>
            </div>
            <div class="bottom-right">
                <button class="d">单独购买</button>
                <button class="p">发起拼单</button>
            </div>
        </div>
        <div class="lefts" v-show="ins">
            <router-link to="/collection" class="a-link">查看收藏</router-link>
            <router-link to="/home" class="a-link">返回首页</router-link>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            arr:[],
            goods_id:this.$store.getters.getgoodsuid,
            imags:false,
            ins:false,
            list:[]
        }
    },
    created(){
        this.goods();
        this.collection();
    },
    methods:{
        onClickIcon() {
            var goods_id=this.arr.goods_id;
            var goods_name=this.arr.goods_name;
            var thumb_url=this.arr.thumb_url;
            var price=this.arr.price;
            var count=1;
            var cb=false;
            var cart_tip=this.arr.sales_tip;
            if(this.imags==true){
                this.imags=false;
                this.$toast("取消成功");
                var objs={goods_id};
                var urls='delcollection';
                this.axios.get(urls,{params:objs}).then(res=>{
                    if(res.data.code==-1){
                        this.$messagebox("消息","请先登陆").then(res=>{
                            this.$router.push("/me");
                        })
                    }
                })
            }else{
                this.imags=true;
                this.$toast("收藏成功");
                var obj={goods_id,goods_name,thumb_url,price,count,cart_tip,cb}
                var url = 'grcart';
                this.axios.get(url,{params:obj}).then(res=>{
                    if(res.data.code==-1){
                        this.$messagebox("消息","请先登陆").then(res=>{
                            this.$router.push("/me");
                        })
                    }
                })
            }
        },
        goods(){
            var obj={goods_id:this.goods_id};
            var url = 'goods';
             this.axios.get(url,{params:obj}).then(res=>{
                var row=res.data.data[0];
                this.arr=row;
             })
        },
        gengduo(){
            if(this.ins==true){
                this.ins=false;
            }else{
                this.ins=true;
            }
        },
        collection(){
            var url="collection";
            this.axios.get(url).then(res=>{
                if(res.data.code == -1){
                    this.$messagebox("消息","请先登陆").then(res=>{
                        this.$router.push("/me")
                    })
                }else{
                   this.list=res.data.data;
                   for(var s of this.list){
                       if(s.goods_id==this.goods_id){
                           this.imags=true;
                           return;
                       }
                   }
                }
            });
        },
    },
}
</script>

<style scoped>
.goods-containe{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
.goods-item{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
}
.goods-title{
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.price{
    color: #f00;
    font-size: 20px;
    margin: 0 3px 0 0;
}
.tip{
    font-size: 12px;
    color: #666;
    margin-right: 10px;
}
.goods-name{
    color: #151516;
    font-size: 17px;
    padding: 0 10px;
    font-weight: bold;
}
.goods-subtitle{
    width: 100%;
    height: 55px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    color: #666;
    font-size: 13px;
    border-bottom: 0.001rem solid #666;
}
.sub-left{
    margin: 5px 0 0 10px;
    width: 100%;
}
.sub-span{
    border: 1px solid #f00;
    font-size: 13px;
    color: red;
    padding: 0 3px;
    margin-right: 5px;
}
.goods-bottom{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: left;
    align-items: center;
    color: #666;
    font-size: 13px;
    padding-left: 10px;
}
.bottom-span{
    margin-right: 15px;
}
.bottom-tui{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #999;
}
.bottom-tui>.bottom-left{
    height: 100%;
    display: flex;
    justify-content: center;
}
.bottom-tui>.bottom-left>div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    padding: 0 13px;
}
.bottom-right{
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    padding: 0 5px;
}
.bottom-right>button{
    width: 100px;
    height: 90%;
    border: none;
    font-size: 14px;
}
.bottom-right>.d{
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    background: linear-gradient(to right,#ffd01e,#ff8917);
}
.bottom-right>.p{
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    background: linear-gradient(to right,#ff6034,#ee0a24);
}
.lefts{
    position: fixed;
    bottom: 50px;
    left: 0;
    height: 50px;
    width: 50px;
    background-color: #f5f5f5;
    text-align: center;
}
.lefts>.a-link{
    font-size: 11px;
    margin-top: 8px;
    color: #666;
    text-decoration: none;
}
</style>