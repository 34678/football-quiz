<template>
  <div class="draw">
      <!--  抽奖动画效果页面  -->
        <div id="m-top">
            <div id="div1">
                <ul>
                    <li id="1"><img src="../../static/images/draw/award/20.png"/></li>
                    <li id="2"><img src="../../static/images/draw/award/30.png"/></li>
                    <li id="3"><img src="../../static/images/draw/award/50.png"/></li>
                    <li id="4"><img src="../../static/images/draw/award/movie.png"/></li>
                </ul>
            </div>
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      oUl: {},
      speed: 0,
      timer: 0
    };
  },
  mounted() {
    this.__init();
  },
  methods: {
    __init() {
      var vm = this;
      //轮播图部分
      var oUl = vm.$("#div1 ul")[0];
      var oLi = vm.$("#div1 ul li");
      oUl.innerHTML = oUl.innerHTML + oUl.innerHTML;
      // 需要更新
      oLi = vm.$("#div1 ul li");
      //ul的宽为所有Li的宽度否则会换行
      oUl.style.width = oLi[0].offsetWidth * oLi.length + "px";
      vm.oUl = oUl;
      //移动速度
      var speed = 1;
      vm.speed = speed;
      //鼠标移开
      //定时器  控制移动的时间
      var timer = requestAnimationFrame(vm.move, 30);
        vm.timer = timer;
      /*   var timer2=setInterval(index,1000);*/
    },
    move() {
      var vm = this;
      var oUl = vm.$("#div1 ul")[0];
      var speed = vm.speed;
      //滑完了一组图片就从头开始
      /* console.log(oUl.offsetLeft+"---"+oUl.offsetWidth/2);*/
      if (oUl.offsetLeft < -oUl.offsetWidth / 2) {
        oUl.style.left = "0";
      }
      if (oUl.offsetLeft > 0) {
        oUl.style.left = -oUl.offsetWidth / 2 + "px";
      }
      oUl.style.left = oUl.offsetLeft - speed + "px";
      /* console.log('oUl.offsetLeft',oUl.offsetLeft);
            console.log('left',oUl.style.left) */
      vm.timer = requestAnimationFrame(vm.move);
    }
  }
};
</script>
<style scoped lang="scss" >
.draw {
  #m-top{
          position: absolute;
    top: 40%;
    left: 31%;
    #div1{
        position: relative;
 
   
    margin: 0 auto;
    overflow: hidden;
     @include dpr(width, 152px);
    @include dpr(height, 72px);
    ul {
      position: absolute;
      left: 0;
      top: 0;
      li {
        float: left;
        list-style: none;
      }
      @include dpr(width, 1216px);
      @include dpr(height, 70px);
    }
    }
  }
}
img {
  @include dpr(width, 152px);
  @include dpr(height, 70px);
}
</style>