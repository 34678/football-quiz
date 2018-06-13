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
                    <li id="4"><img src="../../static/images/draw/award/500.png"/></li>
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
      timer: 0,
      map: {
        "20元优惠券": 0,
        "30元优惠券": 1,
        "50元优惠券": 2,
        '全国通兑电影票': 3,
        '500元优惠券':4
      },
      index: -1,
      /* 用于计算经过奖品多少次 */
      count: 0,
    }
  },

  mounted() {
    this.__init();
  },
    props: {
    id: {
      type: String,
      default: ""
    },
        type: {
      type: String,
      default: "answer"
    },
      openid: {
      type: String,
      default: ""
    },
    },
  methods: {
    __init() {
      var vm = this;
    /*   debugger; */
      //请求抽奖结果数据
     /*  vm.id="sdhajda"; */
    /*  debugger; */
    alert('id'+vm.id)
     alert('open'+vm.openid)
      if(vm.id&&vm.openid){
      vm.$.post("https://www.ipareto.com/zeissSjb/draw",{
              'openid': vm.openid,
            'answerId': vm.id,
            "type":vm.type},function(result){
                 /*   debugger; */
                    /* console.log(result); */
                    var response = result;
                 
                    if (response.msg == "ok") {
                        alert("抽奖结果"+response.data)
                        /* var data = "20元优惠券"; */
                        var data = response.data;
                        /* debugger; */
                              var index = vm.map[data];
  
                              if(index!==3){
                               debugger;
                               vm.index = index;
                               vm.$emit('drawdone',[index])
                              }else{
                                 vm.index = index;
                                 vm.$emit('drawdone',[index,data.movieCode])
                              }
                           
                                   /*  console.log("this.$route.params.paicheNo", this.$route.params.id); */
                             //抽奖成功才轮播
                          vm.lunboinit();
                    } else {
                      alert("抽过奖了");
                    }
          });
     
      }// this.$http
      //   .get("https://www.ipareto.com/zeissSjb/draw", {
      //     params: {
      //       openid: "oYkYa03gpCorQzWW3GCM-uw10aCo",
      //       answerId: vm.id
      //     }
      //   })
      //   .then(function(response) {
      //     response.data.msg = "ok";
      //     if (response.data.msg == "ok") {
      //         console.log("抽奖结果"+response.data)
      //         /* var data = "20元优惠券"; */
      //         var data = response.data;
      //               var index = vm.map[data];
      //               vm.index = index;
      //     } else {
      //       alert("请求问题数据错误");
      //     }
      //   })
      //   .catch(function(response) {
    
      //     console.log(response);
 
      //   });
      

    },
    lunboinit(){
      var vm = this;
      //轮播初始化
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
      var speed = 3;
      vm.speed = speed;
      //鼠标移开
      //定时器  控制移动的时间
      var timer = requestAnimationFrame(vm.move, 30);
      vm.timer = timer;
      /*   var timer2=setInterval(index,1000);*/
    },
    move() {
      /* 没有奖品 返回 */
      
      var vm = this;
      var oUl = vm.$("#div1 ul")[0];
      var speed = vm.speed;
      //滑完了一组图片就从头开始
      /* console.log(oUl.offsetLeft+"---"+oUl.offsetWidth/2);*/
      if (oUl.offsetLeft < -oUl.offsetWidth / 2) {
        /* 转两次就跑到奖品 */
        vm.count++;
        oUl.style.left = "0";
      }
      if (oUl.offsetLeft > 0) {
        oUl.style.left = -oUl.offsetWidth / 2 + "px";
      }
      oUl.style.left = oUl.offsetLeft - speed + "px";
      /* console.log('oUl.offsetLeft',oUl.offsetLeft);
            console.log('left',oUl.style.left) */
      /* 计算是否经过奖品 */
      var oLi = vm.$("#div1 ul li");
      /* !!left在奖品的左边就停下来（为什么left不会用负的奖品的左边index） */
      var index1 = vm.index * oLi[0].offsetWidth;
      // console.log("oUl.offsetLeft", oUl.offsetLeft);
       
      if (vm.count < 2) {
        //可以先执行2次
        vm.timer = requestAnimationFrame(vm.move);
      } else {
        oUl.style.left = -index1 + "px";
        /* 抽奖完成跳到luckdraw */
       /*  vm.$router.push({
          name: "luckyDraw",
          params: {
            'award':vm.index,
            'id':vm.$route.params.id
          }
        }); */
      }
    },
     move2() {
      /* 没有奖品 返回 */
      
      var vm = this;
      var oUl = vm.$("#div1 ul")[0];
      var speed = vm.speed;
      //滑完了一组图片就从头开始
      /* console.log(oUl.offsetLeft+"---"+oUl.offsetWidth/2);*/
      if (oUl.offsetLeft < -oUl.offsetWidth / 2) {
        /* 转两次就跑到奖品 */
        vm.count++;
        oUl.style.left = "0";
      }
      if (oUl.offsetLeft > 0) {
        oUl.style.left = -oUl.offsetWidth / 2 + "px";
      }
      oUl.style.left = oUl.offsetLeft - speed + "px";
      /* console.log('oUl.offsetLeft',oUl.offsetLeft);
            console.log('left',oUl.style.left) */
      /* 计算是否经过奖品 */
      var oLi = vm.$("#div1 ul li");
      /* !!left在奖品的左边就停下来（为什么left不会用负的奖品的左边index） */
      var index1 = vm.index * oLi[0].offsetWidth;
      // console.log("oUl.offsetLeft", oUl.offsetLeft);
       
      if (vm.count < 2) {
        //可以先执行2次
        vm.timer = requestAnimationFrame(vm.move);
      } else {
        oUl.style.left = -index1 + "px";
        /* 抽奖完成跳到luckdraw */
       /*  vm.$router.push({
          name: "luckyDraw",
          params: {
            'award':vm.index,
            'id':vm.$route.params.id
          }
        }); */
      }
    }
  }
};
</script>
<style scoped lang="scss" >
.draw {
  /*  position: absolute;
  top: 0;
  left: 0; */
  /*   width: 100%;
  height: 100%; */

  @include dpr(width, 152px);
  @include dpr(height, 70px);
  @include dpr(margin-top, 158px);
  @include dpr(margin-left, 122px);

  #m-top {
    /* position: absolute;
    top: 40%;
    left: 31%; */
    #div1 {
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