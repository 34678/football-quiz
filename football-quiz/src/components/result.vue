/* 答题结果页面 */
<template>
  <div class="result">
      <img :src="'../../static/images/result/'+correctTotal+'.png'">
      <div class="drawer" v-on:click="$emit('draw')"><img src="../../static/images/result/drawbtn.png"></div>
        <footer></footer>
  </div>
  
</template>
<script>
import Footer from '../components/base/footer'
export default {
    data(){
        return{

        }
    },
    props: {
        correctTotal: {
            type: Number,
            default: 0
        },
    },
    components:{
        Footer 
    },
  mounted() {
      /* 五彩动画逻辑 */
    this.__init();
  },
  methods: {
    __init(){
      /* 抽奖入口 */
    },
  }
};
</script>
<style scoped lang="scss" >
img{
        width: 100%;
}
.drawer{
    @include dpr(width, 145px);
    @include dpr(height, 53px);
    margin: 0 auto;
    margin-top: 11px;
}
</style>