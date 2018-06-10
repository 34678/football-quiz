/* 答题结果页面 */
<template>
  <div class="result">
      <img v-bind:src="Images[correctTotal]">
      <div class="drawer" v-on:click="$emit('draw')"><img src="../../static/images/result/drawbtn.png"></div>
        <footer></footer>
  </div>
  
</template>
<script>
import Footer from '../components/base/footer'
import Image0 from "../../static/images/result/0.png"
import Image1 from "../../static/images/result/1.png"
import Image2 from "../../static/images/result/2.png"
import Image3 from "../../static/images/result/3.png"
import Image4 from "../../static/images/result/4.png"
export default {
    data(){
        return{
                 Images:[Image0,Image1,Image2,Image3,Image4],
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