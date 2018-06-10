/* 抽奖结果页面 */
<template>
  <div class="luckyDraw" :style="{backgroundImage:'url('+bgclass[currentDraw-1]+')'}">
 
      <!-- 出礼品区 -->
      <div class="draw">
          <!-- 滚动礼品的组件 --> 
          <div></div>
          <div class="duihuan" v-on:click="duihuan()"></div>      
        </div>
        <!-- 功能按钮 -->
    <div class="toolbar">
        <div class="item" v-on:click="getAwards()" ></div>
        <div class="item"></div>
        <div class="item"></div>
    </div>
    <!-- 奖品列表 -->
    <div class="awardlist">
      <div id="awardlist__last"><</div>
      <ul id="awardlist__ul">
        <li class="awardlist__li" v-for="(item,index) in awardsList" value="index">{{item.name}}</li>
      </ul>
      <div id="awardlist__next">></div>
    </div>
    <div class="footer">
            <img src="../../static/images/qrcode.png">
            <img>
        <img class="sec" src="../../static/images/gamename.png">
    </div>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentDraw: 1,
      bgclass: [
        require("../../static/images/draw/1bg.png"),
        "../../static/images/draw/2bg.png"
      ],
      awardsList: {},
      /* 奖品总数 */
      awardsTotal:0,
    };
  },
  mounted() {
    this.__init();
  },
  components: {},
  methods: {
    getAwards() {
      var vm = this;
      /* 查看所有的奖品 */
      this.$http
        .get("https://www.ipareto.com/zeissSjb/getAwards", {
          params: {}
        })
        .then(function(response) {
          console.log("getAwards", response);
          if (response.data.msg == "ok") {
            vm.awardsList = response.data.data;
            vm.awardsTotal = response.data.data.length;
            vm.$(".awardlist")[0].style.display = "block";
            /* 丰富奖品的左右切换事件 */
            vm.xiangce();
            /* 点击消失 */
            vm.$(".awardlist")[0].addEventListener('click',function(){
              vm.$(".awardlist")[0].style.display = "none";
            })
          } else {
            alert("请求问题数据错误");
          }
        })
        .catch(function(response) {
          //错误处理 比如出现一个蒙层显示网络错误
          console.log(response);
        });
    },
    duihuan() {
      /* 兑换奖品 */
    },
    __init() {
   
      
      
    },
    /* 丰富奖品的左右切换事件 */
    xiangce(){
      var vm = this;
        var player = 0;
        var left = document.getElementById("awardlist__last");
        var right = document.getElementById("awardlist__next");
        
        right.addEventListener("click", function () {
          var lis =vm.$(".awardlist__li");
            lis[player].style.visibility = "hidden";
            if (player == (vm.awardsTotal-1)) {
                player = 0;
            } else {
                player++;
            }
            lis[player].style.visibility = "visible";
        }, false);
        left.addEventListener("click", function () {
          var lis =vm.$(".awardlist__li");
            lis[player].style.visibility = "hidden";
            if (player == 0) {
                player = (vm.awardsTotal-1);
            } else {
                player--;
            }
            lis[player].style.visibility = "visible";
        }, false);
    }
  }
};
</script>
<style scoped lang="scss" >
.luckyDraw {
  background: white;
  background-size: 100%;
  background-repeat: no-repeat;
  .draw {
    .duihuan {
      @include dpr(width, 84px);
      @include dpr(height, 34px);
      @include dpr(margin-top, 232px);
      @include dpr(margin-left, 149px);
      background-image: url("../../static/images/draw/btn/duihuan.png");
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .toolbar {
    @include dpr(margin-top, -57px);
    .item {
      @include dpr(width, 88px);
      @include dpr(height, 33px);
      @include dpr(margin-left, 270px);
      @include dpr(margin-bottom, 6px);
      background-size: contain;
      background-repeat: no-repeat;
    }
    & .item:nth-child(1) {
      background-image: url("../../static/images/draw/btn/awards.png");
    }
    & .item:nth-child(2) {
      background-image: url("../../static/images/draw/btn/my.png");
    }
    & .item:nth-child(3) {
      background-image: url("../../static/images/draw/btn/flow.png");
    }
  }
  img {
    width: 100%;
  }
  .awardlist {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: none;
    background: rgba(0, 0, 0, 0.7);
    ul {
      margin: 0 auto;
      margin-top: 143px;
      width: 50%;
      li {
             position: absolute;
             visibility: hidden;
      }
      & li:first-child{
         visibility: visible;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 18px;
    width: 100%;

    & img:first-child {
      @include dpr(width, 52px);
      @include dpr(height, 52px);
      margin-left: 10%;
    }
    & img:nth-child(2) {
      @include dpr(width, 100px);
      @include dpr(height, 52px);
      /* display: inline-block; */
      visibility: hidden;
      
    }
    .sec {
      /*  position: absolute; */
      /* margin-left:60%;  */
      @include dpr(width, 113px);
      @include dpr(height, 52px);
    }
  }
}
</style>