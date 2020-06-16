<template>
    <div class="chat-container">
        <div class="chat-items">
            <img src="./img/xx.png" alt="" width="50px">
            <span class="s">还没有聊天消息哦</span>
            <span class="e">与商家、官方客服的聊天会显示在这里</span>
            <a href="javascript:;">联系官方客服</a>
        </div>
        <div class="chat-titile">
            <img src="./img/tj.png" alt="" width="23px">
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
                    <mt-button></mt-button>
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
            arr:[],
            pno:0,
            isLoading:false
        }
    },
    components:{
        "shoplist":ShopList
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
    }
}
</script>
<style scoped>
.chat-container{
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.chat-items{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #58595b;
    height: 280px;
    background-color: #f4f4f4;
}
.chat-items>.s{
    margin-top: 25px;
    font-size: 14px;
}
.chat-items>.e{
    color:#9c9c9c;
    margin-top: 10px;
    font-size: 13px;
}
.chat-items>a{
    text-decoration: none;
    color:#3aace9;
    margin-top: 15px;
    font-size: 14px;
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