<template>
    <div class="me-setting">
        <div class="top">
            <mecommoncell left-icon="itlike-2" left-title="免密码设置" :clickCell="dealCellClock"/>
            <mecommoncell left-icon="itlike-3" left-title="免拼设置" right-title="还剩1次免拼机会" :clickCell="dealCellClock"/>
            <mecommoncell left-icon="itlike-1" left-title="消息接收设置" :clickCell="dealCellClock"/>
        </div>
        <div class="top">
            <mecommoncell left-icon="itlike-5" left-title="常见问题" :clickCell="dealCellClock"/>
            <mecommoncell left-icon="itlike-4" left-title="意见反馈" :clickCell="dealCellClock"/>
        </div>
        <div class="top">
            <mecommoncell left-icon="itlike-4" left-title="商家免费入驻" :clickCell="dealCellClock"/>
        </div>
        <div class="top">
            <mecommoncell left-icon="itlike-4" left-title="关于拼多多" :clickCell="dealCellClock"/>
        </div>
        <mt-button size="large" class="top color" @click="dealLogout">退出登陆</mt-button>
        <router-link class="top fanhui" to="/me">返回</router-link>
    </div>
</template>
<script>
import MeCommonCell from './MeCommonCell'
export default {
    components:{
        "mecommoncell":MeCommonCell
    },
    methods:{
        dealCellClock(props){
            this.$toast("点击了"+props)
        },
        dealLogout(){
            this.$messagebox.confirm("是否退出登陆")
            .then(res=>{
                this.axios.get("tuichu").then(res=>{
                     this.$toast({message:"退出成功",position:"bottom"});
            })
                this.$router.push("/home")
            }).catch(err=>{
                this.$toast("取消成功");
            })
        }
    }
}
</script>
<style scoped>
.me-setting{
    background-color: #f4f4f4;
    width: 100%;
    height: 100%;
    position: fixed;
}
.top{
    margin-top: 10px;
}
.auto{
    margin-top: 10px;
}
.color{
    color: #9c9c9c;
    font-size: 14px;
    background-color: #fff;
}
.fanhui{
    width: 100%;
    text-decoration: none;
    height: 41px;
    color: #9c9c9c;
    text-align: center;
    display: inline-block;
    background-color: #fff;
    line-height: 41px;
    border-radius: 5px;
}
</style>