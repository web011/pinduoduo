<template>
    <div class="me">
        <div v-if=(ft)>
            <metop />
        </div>
        <selectlogin v-else/>
    </div>
</template>
<script>
import SelectLogin from '../Login/SelectLogin'
import MeTop from './MeTop'
export default {
    data(){
        return {
            phone:'',
            ft:false
        }
    },
    components:{
        "selectlogin":SelectLogin,
        "metop":MeTop
    },
    created(){
        this.me();
    },
    methods:{
        me(){
            var url='me';
            var obj={phone:this.phone};
            this.axios.get(url,{params:obj}).then(res=>{
                if(res.data.code!==-1){
                    this.ft=true;
                }else{
                    this.ft=false;
                }
                if(res.data.code==1){
                    this.$store.commit("uname",res.data.msg);
                }
            })
        }
    }
}
</script>
<style scoped>
.me{
    background-color: #f5f5f5;
    width: 100%;
    height: 100%;
}
</style>