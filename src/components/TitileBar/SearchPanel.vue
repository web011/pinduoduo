<template>
    <div class="search-panel">
        <div class="search-nav">
            <button href="" @click="inshowsearch(false)">返回</button>
            <div class="inputs">
                <img src="./img/ss.png" alt="" width="20px">
                <input ref="Mysearch" type="text" placeholder="道德经">
            </div>
            <span class="searchs">搜索</span>
        </div>
        <div class="seaarch-content-subtitle">
            <img src="./img/gd.png" alt="" width="20px">
            <span>更多搜索方式</span>
        </div>
        <div class="seaarch-content">
            <img src="./img/dp.png" alt=""  width="15px">
            <span>搜索店铺</span>
        </div>
        <div class="seaarch-content-subtitle">
            <img src="./img/fx.png" alt="" width="20px">
            <span>搜索发现</span>
        </div>
        <ul class="search-list" type="none">
            <li v-for="(item,index) of arr" :key="index">
                {{item}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            arr:["丝袜女防勾丝短","女短丝袜","袜子女舒服","男士袜子船袜","薄丝袜女短","女款丝袜短"]
        }
    },
    props:{
        inshowsearch:{type:Function},
        inshowfunction:{type:Function}
    },
    mounted(){
        this.$refs.Mysearch.focus();
    }
}
</script>
<style scoped>
.search-panel{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
}
.search-nav{
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.search-nav>button{
    color:#666;
    border: none;
    height: 40px;
    background-color: #ffffff;
    margin: 5px 0 0 10px;
    outline: none;
}
.inputs{
    height: 40px;
    width: 70%;
    background-color: #ededed;
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 5px;
    border-radius: 5px;
    padding-left: 15px;
}
.inputs>input{
    border:none;
    background-color: #ededed;
    border: solid #ededed;
    margin-left: 3px;
    outline: none;
}
.searchs{
    color: red;
    margin-right: 10px;
}
.seaarch-content-subtitle{
    margin-left: 15px;
    width: 100%;
    height:50px;
    align-items: center;
    display: flex;
    font-size: 14px;
    color: #9c9c9c;
}
.seaarch-content-subtitle>span{
    margin-left:5px;
}
.seaarch-content{
    margin-top:0px;
    height: 30px;
    width: 150px;
    background-color: #f4f4f4;
    color: #58595b;
    display: flex;
    align-items: center;
    margin-left: 15px;
    padding-left: 10px;
    border-radius: 50px;
    font-size: 14px;
}
.seaarch-content>span{
    margin-left:5px;
}
.search-list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.search-list>li{
    background-color: #f4f4f4;
    color: #aaaaaa;
    margin: 5px 10px;
    padding: 8px;
    border-radius: 10px;
    font-size: 13px;
}
</style>