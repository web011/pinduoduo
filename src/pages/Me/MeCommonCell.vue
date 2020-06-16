<template>
    <div class="cell" @click="clickCell(leftTitle)">
        <div class="cell-left" :style="{color:leftTitleColor}">
            <i :class="leftIcon" class="r" v-show="leftIcon"></i>
            <span v-show="leftTitle">{{leftTitle}}</span>
        </div>
        <div class="cell-right" :style="{color:leftTitleColor}">
            <span v-show="rightTitle" class="font">{{rightTitle}}</span>
            <i class="itlike-uniE909"></i>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        leftTitle:{type:String,default:''},
        leftIcon:{type:String,default:''},
        rightTitle:{type:String,default:''},
        leftTitleColor:{type:String,default:''},
       clickCell:{type:Function,default:()=>{}},
    }
}
</script>
<style scoped>
.cell{
    height: 44px;
    background-color: #fff;
    display: flex;
    justify-content :space-between;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #ececec;
}
.cell-left,.cell-right{
    display: flex;
    align-items :center;
}
.cell-left,.cell-right>i{margin-right: 5px;}
.r{margin-right: 10px;}
.cell-left,.cell-right>span{
    font-size: 14px;
}
.font{
    font-size: 13px !important;
    color: #666;
}
</style>