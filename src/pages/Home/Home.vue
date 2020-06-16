<template>
    <div class="home">
        <titlebar :inshowsearch="inshowsearch"></titlebar>
        <ly-tab
        v-model="selectedId"
        :items="items"
        :options="options"
        @change="handleChange"
        class="fix"
        />
        <router-view></router-view>
        <searchpanel v-if="inshow" :inshowsearch="inshowsearch"></searchpanel>
    </div>
</template>
qqq
<script>
import TitileBar from '../../components/TitileBar/TitileBar'
import SearchPanel from '../../components/TitileBar/SearchPanel'
export default {
    data(){
        return {
            inshow:false,
            i:1,
            active:"Home",
            selectedId:0,
            items:[
                {label:"热门"},
                {label:"女装"},
                {label:"百货"},
                {label:"手机"},
                {label:"水果"},
                {label:"鞋包"},
                {label:"食品"},
                {label:"男装"},
                {label:"母婴"},
                {label:"内衣"},
                {label:"运动"},
                {label:"家装"},
                {label:"美妆"},
                {label:"电器"},
                {label:"家纺"},
                {label:"车品"},
            ],
            options:{
                activeColor:"#e9232c" //选中的颜色
            },
            subRouteUrl:["/home/hot","/home/wc","/home/ds","/home/mp","/home/fruits","/home/box","/home/food","/home/menswear","/home/mi","/home/underwear","/home/movement","/home/hd","/home/bm","/home/hea","/home/ht","/home/CarProducts"]
        }
    },
    methods:{
        handleChange(item,index){
            this.$router.replace(this.subRouteUrl[index])
        },
        inshowsearch(bool){
            this.inshow=bool;
        },
        aaa(){
            this.inshow=true;
        }
    },
    components:{
        "titlebar":TitileBar,
        "searchpanel":SearchPanel
    },
}
</script>
<style scoped>
.home{
    margin-top: 45px;
}
.fix{
    position: fixed;
    left: 0;
    top: 48px;
    z-index: 998;
    width: 100%;
}
</style>