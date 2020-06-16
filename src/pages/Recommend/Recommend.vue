<template>
<div class="shop">
    <div class="recommend-container">
        <ul type="none" class="recommend">
            <shoplist v-for="(item,index) of arr" :key="index" :item="item"/>
        </ul>
    </div>
</div>
</template>
<script>
import ShopList from '../../components/ShopList/ShopList';
import BScroll from 'better-scroll'
export default {
    data(){
        return {
            arr:[],
            pno:0,
            isLoading: false,
        }
    },
    created(){
        this.loadMore();
        this.$nextTick(()=>{
            this._initBScroll();
        });
    },
    methods:{
        // 下拉刷新
        loadMore(){
            var url="product";
            this.pno++;
            var obj={pno:this.pno}
            this.axios.get(url,{params:obj}).then(res=>{
                if(res.data.code==-1){
                    this.$toast("请先登陆");
                    this.$router.push('/me')
                    return;
                }else{
                    var rows = this.arr.concat(res.data.data);
                    this.arr=rows;
                }
            })
        },
        // 上拉刷新
        loadMore1(){
            var url='product';
            this.pno++;
            var obj={pno:this.pno}
            this.axios.get(url,{params:obj}).then(res=>{
                this.arr=res.data.data;
            })
        },
        _initBScroll() {
            this.listScroll = new BScroll('.recommend-container',{
                click:true,
                tap:true,
                probeType:3
            });
            // 监听列表滚动
            this.listScroll.on('touchEnd',(pos=>{
                    //监听下拉
                    if(pos.y>=50){
                        setTimeout(() => {
                            this.loadMore1();
                        }, 100);
                    }
                    //监听上拉
                    if(this.listScroll.maxScrollY > pos.y + 20){
                        setTimeout(() => {
                            this.loadMore();
                        }, 1000);
                    }
            }));
                this.listScroll.on('scrollEnd',()=>{
                    this.listScroll.refresh();
                })
        },
    },
    components:{
        "shoplist":ShopList,
    },
}
</script>
<style scoped>
.shop{
    display: flex;
    position: absolute;
    bottom: 0px;
    top: 0px;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    padding-bottom: 40px;
    height: 100%;
}
.recommend{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 5px 5px;
} 
</style>