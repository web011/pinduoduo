<template>
    <div class="tabbar">
        <mt-tabbar fixed v-model="active">
            <mt-tab-item id="Home" @click.native="change(0),selete('/Home')">
                <div style="margin-bottom:3px;">
                    <img 
                    :src="cur[0].isSelect?require('../../assets/1_1.webp'):require('../../assets/1_2.webp')" class="imgstyle">
                </div>
                首页
            </mt-tab-item>
            <mt-tab-item id="Recommend" @click.native="change(1),selete('/Recommend')">
                <div style="margin-bottom:3px;">
                    <img
                    :src="cur[1].isSelect?require('../../assets/2_1.webp'):require('../../assets/2_2.webp')" class="imgstyle">
                </div>
                推荐
            </mt-tab-item>
            <mt-tab-item id="Search" @click.native="change(2),selete('/fl')">
                <div style="margin-bottom:3px;">
                    <img
                    :src="cur[2].isSelect?require('../../assets/3_1.webp'):require('../../assets/3_2.webp')" class="imgstyle">
                </div>
                分类
            </mt-tab-item>
            <mt-tab-item id="Chat" @click.native="change(3),selete('/chat')">
                <div style="margin-bottom:3px;">
                    <img
                    :src="cur[3].isSelect?require('../../assets/4_1.webp'):require('../../assets/4_2.webp')" class="imgstyle">
                </div>
                聊天
            </mt-tab-item>
            <mt-tab-item id="Me" @click.native="change(4),selete('/me')">
                <div style="margin-bottom:3px;">
                    <img
                    :src="cur[4].isSelect?require('../../assets/5_1.webp'):require('../../assets/5_2.webp')" class="imgstyle">
                </div>
                个人中心
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
export default {
    data(){
        return {
            active:"Home",
            cur:[
                {isSelect:true},
                {isSelect:false},
                {isSelect:false},
                {isSelect:false},
                {isSelect:false},
            ]
        }
    },
    methods:{
        change(n){
            for(var i=0;i<this.cur.length;i++){
                this.cur[i].isSelect=false;
            }
            this.cur[n].isSelect=true;
        },
        selete(path){
            this.$router.replace(path);
        }
    }
}
</script>
<style scoped>
.imgstyle{
    width: 20px;
    height: 20px;
}

</style>