<template>
    <div class="login-container">
        <div class="z"></div>
        <div class="login-n-u">
            <span class="n-u"></span>
            <input type="text" placeholder="手机号码" maxlength="11" v-model="phone">
        </div>
        <div style="height:1px;"></div>
        <div class="login-n-u">
            <span class="n-u s"></span>
            <input type="text" placeholder="验证码" maxlength="6" v-model="vc">
            <button :class="yz" :disabled="disabled" @click="buttons">
                <span v-show="n===60">发送验证码</span>
                <span v-show="n!==60">重新发送{{n}}</span>
            </button>
        </div>
        <div class="login-button">
            <mt-button size="large" @click="login">同意协议并登录</mt-button></div>
        <div class="login-button">
            <router-link class="items" to="/me">返回</router-link></div>
        <div class="f">
            <span class="subtitle">已阅读并同意</span>
            <a href="javascript:;" class="protocol">服务协议与隐私政策</a>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            vc:"",
            phone:"1881362968",
            disabled:true,
            randoms:"",
            n:60,
            yz:{
                // 禁用
                buttons:true,
                // 不禁用
                button:false
            },
        }
    },
    methods:{
        buttons(){
            if(this.phone==""){
                this.$toast("请先输入手机号")
            }else{
                this.randoms=Math.floor(Math.random()*1000000);
                alert("验证码："+this.randoms)
                this.disabled=true;
                this.n-=1;
                var In=setInterval(()=>{
                    this.n--;
                    if(this.n==0){
                        clearInterval(In);
                        this.n=60;
                    }
                    if(this.n==60) this.disabled=false;
                },1000)
            }
        },
        login(){
            var reg=/^1[3-9]\d{9}$/;
            var bool=reg.test(this.phone);
            if(this.phone==""){
                this.$toast("手机号不能为空")
                return;
            }else if(this.vc==""){
                this.$toast("验证码不能为空")
                return;
            }
            else if(bool){
                if(this.vc!=this.randoms){
                    this.$toast("验证码不正确")
                    return;
                }else{
                    var url = 'login';
                    var p = this.phone;
                    var obj = {phone:p}
                    this.axios.get(url,{params:obj}).then(res=>{
                        if(res.data.code==1){
                            this.$toast({message:"登陆成功",position:"bottom"});
                            this.$store.commit("uname",this.phone);
                            this.$router.push("me");
                        }else{
                            this.$toast("手机号不存在")
                        }
                    })
                }
            }else{
                this.$toast("手机格式不正确")
                this.phone="";
            }
        }
    },
    watch:{
        phone(){
            this.phone=this.phone.replace(/[A-Za-z]/ig,"");
            if(this.phone.length>="11"){
                this.yz.buttons=false;
                this.yz.button=true;
                this.disabled=false;
            }else{
                this.yz.button=false;
                this.yz.buttons=true;
                this.disabled=true;
            }
        },
        n(){
            if(this.n<60) {
                this.yz.buttons=true;
                this.yz.button=false;
                this.disabled=true;
            }else{
                this.yz.buttons=false;
                this.yz.button=true;
                this.disabled=false;
            }
        }
    }
}
</script>
<style scoped>
.login-container{
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
    position: fixed;
}
.z{height: 10px;background-color: #f4f4f4;
}
.n-u{
    width: 20px;height: 25px;
    background: url(./images/u_n.png);
    background-size: 40px;
    background-repeat:no-repeat;
    display: inline-block;
    margin-left: 10px;
}
.login-n-u{
    width: 100%;
    height: 45px;
    background-color: #fff;
    display: flex;
    justify-content: left;
    align-items: center;
    position: relative;
}
.login-n-u>input{
    border: none;
    outline: none;
    padding-left: 10px;
    width: 90%;
}
.login-n-u>button{
    position: absolute;
    top: 7px;
    right: 10px;
    height: 30px;
    width: 100px;
    background-color: #fff;
    border-radius: 4px;
}
.s{
    background-position-x: -20px;
}
.mint-button--large{
    width: 95%;
    background-color: #e02e24;
    color: #fff;
    font-weight: lighter;
    font-size: 15px;
}
.login-button{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.items{
    background-color: #ffffff;
    color: #e02e24;
    border: 1px solid #e02e24;
    width: 95%;
    height: 41px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
}
.f{
    margin: 15px 0 0 10px;
}
.subtitle{
    color: #9c9c9c;
    font-size: 11px;
    margin-right: 5px;
}
.protocol{
    text-decoration: none;
    color: #58595b;
    font-size: 12px;
}
/* 这是禁言样式 */
.buttons{
    color: #f4d0ce;
    border: 1px solid #f4d0ce;
}
/* 这是不禁用的样式 */
.button{
    color: #e02e24;
    border: 1px solid #e02e24;
}
</style>