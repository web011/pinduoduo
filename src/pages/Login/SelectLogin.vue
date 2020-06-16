<template>
    <div class="select-login">
        <div class="bottom">
            <img src="./images/pdd.png" alt="" width="50px">
            <span class="s">拼多多</span>
        </div>
        <router-link to="/login" tag="button">手机登陆</router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.select-login{
    background-color: #f5f5f5;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    z-index: 100;
}
button{
    width: 80%;
    height: 38px;
    background-color: red;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    color: #fff;
    margin-top: 30px;

}
.bottom{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
}
.s{
    margin-left: 10px;
    font-size: 24px;
    color: red;
    font-weight: bold;
}
</style>