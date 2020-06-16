<template>
    <div class="titileBar">
        <div class="titilebar-item" @click.prevent="inshowsearch(true)">
            <img src="./img/ss.png" alt="" width="15px">
            <span>强力手电筒</span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        inshowfunction:Function,
        inshowsearch:Function
    }
}
</script>
<style scoped>
.titileBar{
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #ffffff;
}
.titilebar-item{
    width: 90%;
    height: 35px;
    border: none;
    background-color: #ededed;
    margin-top: 8px;
    margin-left: 17px;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
}
.titilebar-item>img{
    margin-right: 5px;
}
.titilebar-item>span{
    color:#9c9c9c;
    font-size: 14px;
    text-decoration: none;
}
</style>