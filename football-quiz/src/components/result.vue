/* 答题结果页面 */
<template>
  <div class="result">
     <div style="position:relative">
       <img v-bind:src="Images[correctTotal]">
       <div class="text">
          <div class="first">"{{text1[correctTotal]}}"</div>
           <div class="second">{{text2[correctTotal]}}</div>
        </div></div> 
      <div class="drawer" v-on:click="$emit('draw')">
        <img src="../../static/images/result/drawbtn.png">
        
        </div>
          <div id="zhu">音乐：Cheery Monday（来自incompetech.com）</div>
          <div class="footer">
            <img src="../../static/images/qrcode.png">
            <img>
        <img class="sec" src="../../static/images/gamename.png">
        <audio id="bgMusic" src="https://www.ipareto.com/dist/static/music/bg.m4a" autoplay="autoplay" loop="loop"></audio>
    </div>
  </div>
  
</template>
<script>
 
import Image0 from "../../static/images/result/0.png"
import Image1 from "../../static/images/result/1.png"
import Image2 from "../../static/images/result/2.png"
import Image3 from "../../static/images/result/3.png"
import Image4 from "../../static/images/result/4.png"
export default {
    data(){
        return{
                 Images:[Image0,Image1,Image2,Image3,Image4],
                 text1:['伪球迷','伪球迷','铁杆粉','懂球帝','MVP'],
                 text2:['修炼失败，需要回炉重造一下','修炼失败，需要回炉重造一下','万事俱备，只差一pick','认过眼神，是会踢球的人','国足就靠你振兴了！']
        }
    },
   
    props: {
        correctTotal: {
            type: Number,
            default: 0
        },
    },
    components:{
    
    },
  mounted() {
      /* 五彩动画逻辑 */
    this.__init();
  },
  methods: {
    __init(){
      /* 抽奖入口 */
  /*     debugger;
      var height = this.$('img')[0].style.height;
      var top = height*0.6;
      this.$('.text')[0].style.top = top; */
    },
  }
};
</script>
<style scoped lang="scss" >
.text{
      position: absolute;
  /*       top: 392px;
    right: 22px; */
       @include dpr(bottom, 20%);
    @include dpr(right, 5%);
    line-height: 37pt;
  color:white;
  .first{
    font-family: caisiBold;
    font-size:30pt;
  }
  .second{
font-family: caisiNormal;
    font-size:12pt;
  }
}
#zhu{
      text-align: center;
      position: absolute;
    font-size: 12pt;
    width: 100%;
    bottom: 6px;
    left: 3px;
}
img{
        width: 100%;
}
.drawer{
    @include dpr(width, 145px);
    @include dpr(height, 53px);
    margin: 0 auto;
    margin-top: 11px;
        z-index: 2;
    position: relative;
}
  .footer{
        position: absolute;
    bottom: 18px;
    width: 100%;

    & img:first-child{
            @include dpr(width, 52px);
    @include dpr(height, 52px);
    margin-left: 10%;
    }
     & img:nth-child(2){
       width:46%;
      /*  @include dpr(width, 46%18px); */
    @include dpr(height, 52px);
        /* display: inline-block; */
        visibility: hidden;
    }
    .sec{
     /*  position: absolute; */
     /* margin-left:60%;  */
       @include dpr(width, 113px);
    @include dpr(height, 52px);
    }
  }
</style>