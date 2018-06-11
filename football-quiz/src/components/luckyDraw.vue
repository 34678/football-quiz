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
      <div class="item" v-on:click="drawagain()" ></div>
        <div class="item" v-on:click="getAwards()" ></div>
        <div class="item" v-on:click="myAwards()"></div>
        <div class="item" v-on:click="liucheng()"></div>
    </div>
    <!-- 奖品列表 -->
    <div class="awardlist">
    
      <div class="awardlist__wrapper" v-on:click.stop>
       
      <div id="awardlist__last"></div>
      <ul id="awardlist__ul">
        <li class="awardlist__li" v-for="(item,index) in awardsList" value="index" >
        <!--   {{images[map[item.name]]}} -->
          <img :src="images[map[item.name]]">
          </li>
      </ul>
      <div id="awardlist__next"></div>
      <span>丰富奖品</span>
      
      </div>
    </div>
    <!-- 中奖记录 -->
    <div class="myawardlist">
      <div class="myawardlist__wrapper" v-on:click.stop>
      <table id="myawardlist__table">
        <tr class="myawardlist__tr">
          <th>获奖名称</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
        <tr class="myawardlist__tr" v-for="(item,index) in myawards">
          <th>{{item.name}}</th>
          <th>{{item.createTime}}</th>
          <th></th>
        </tr>
      </table>
      <span>我的中奖记录</span>
      
      </div>
      </div>
   
   
   <!-- 兑奖流程 -->
       <div class="duijiang">
      <div class="duijiang__wrapper" v-on:click.stop>
        <div>奖品兑换流程</div>
        <div>优惠券：点击兑换链接，进入京东平台即可领取优惠券</div>

        <div>电影票：中奖后点击兑换链接，即时生成一个电影票兑换码，根据操作指引即可获取免费电子电影票</div>
        <hr>
        <div>
          以上奖品兑换流程如有操作疑问，请联系金先生<br>
          电话：17576062332<br>
          邮箱：ulysses@ipareto.com<br>
        </div>
      </div>
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
        require("../../static/images/draw/2bg.png")
      ],
      images: [
        require("../../static/images/draw/award/20.png"),
        require("../../static/images/draw/award/30.png"),
        require("../../static/images/draw/award/50.png"),
        require("../../static/images/draw/award/movie.png")
      ],
      awardsList: {},
      /* 奖品总数 */
      awardsTotal: 0,
      map: {
        "20元优惠券": 0,
        "30元优惠券": 1,
        "50元优惠券": 2,
        全国通兑电影票: 3
      },
      myawards: {}
    };
  },
  mounted() {
    this.__init();
  },
  components: {},
  methods: {
    drawagain(){
        /* 在抽一次函数 */

    },
    myAwards() {
      var vm = this;
      /* 查看我的所有的奖品 */
      /* ！！ */
      this.$http
        .get(
          "https://www.ipareto.com/zeissSjb/getAwardRecords?openid=oYkYa03gpCorQzWW3GCM-uw10aCo",
          {
            params: {}
          }
        )
        .then(function(response) {
          console.log("getAwards", response);
          if (response.data.msg == "ok") {
            vm.myawards = response.data.data;
            vm.$(".myawardlist")[0].style.display = "block";
            /* 点击黑色部分消失 */
              vm
              .$(".myawardlist")[0]
              .addEventListener("click", function() {
                vm.$(".myawardlist")[0].style.display = "none";
              });
          } else {
            alert("请求数据错误");
          }
        })
        .catch(function(response) {
          //错误处理 比如出现一个蒙层显示网络错误
          console.log(response);
        });
    },
    liucheng() {
      var vm = this;
      vm.$(".duijiang")[0].style.display = "block";
      /* 点击黑色部分消失 */
      vm
      .$(".duijiang")[0]
      .addEventListener("click", function() {
      vm.$(".duijiang")[0].style.display = "none";
      });
    },
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
            console.log("vm.awardsList", vm.awardsList);
            vm.awardsTotal = response.data.data.length;
            vm.$(".awardlist")[0].style.display = "block";
            /* 丰富奖品的左右切换事件 */
            vm.xiangce();
            /* 点击消失 */
            vm
              .$(".awardlist")[0]
              .addEventListener("click", function disapear() {
                vm.$(".awardlist")[0].style.display = "none";
              });
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
    __init() {},
    /* 丰富奖品的左右切换事件 */
    xiangce() {
      var vm = this;
      var player = 0;
      var left = document.getElementById("awardlist__last");
      var right = document.getElementById("awardlist__next");

      right.addEventListener(
        "click",
        function() {
          var lis = vm.$(".awardlist__li");
          lis[player].style.visibility = "hidden";
          if (player == vm.awardsTotal - 1) {
            player = 0;
          } else {
            player++;
          }
          lis[player].style.visibility = "visible";
        },
        false
      );
      left.addEventListener(
        "click",
        function() {
          var lis = vm.$(".awardlist__li");
          lis[player].style.visibility = "hidden";
          if (player == 0) {
            player = vm.awardsTotal - 1;
          } else {
            player--;
          }
          lis[player].style.visibility = "visible";
        },
        false
      );
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
    @include dpr(margin-top, -95px);
    .item {
      @include dpr(width, 88px);
      @include dpr(height, 33px);
      @include dpr(margin-left, 270px);
      @include dpr(margin-bottom, 6px);
      background-size: contain;
      background-repeat: no-repeat;
    }
    & .item:nth-child(1) {
      background-image: url("../../static/images/draw/btn/again.png");
    }
    & .item:nth-child(2) {
      background-image: url("../../static/images/draw/btn/awards.png");
    }
    & .item:nth-child(3) {
      background-image: url("../../static/images/draw/btn/my.png");
    }
    & .item:nth-child(4) {
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
    .awardlist__wrapper {
      @include dpr(width, 300px);
      @include dpr(height, 205px);
      margin: 0 auto;
      margin-top: 50%;
      background: #b5bbda;
      padding: 74px 0;
      box-sizing: border-box;
      position: relative;
      span {
        position: absolute;
        top: 20px;
        left: 37%;
        font-size: 16pt;
        color: #2d3565;
      }
      div {
        display: inline-block;
        vertical-align: top;
      }
      div:first-child {
        float: left;
      }
      div:nth-child(2) {
        float: right;
      }
      #awardlist__last {
        width: 0;
        height: 0;
        border-width: 21px 21px 26px 0;
        border-style: solid;
        border-color: transparent #213186 transparent transparent; /*透明 灰 透明 透明 */
        margin: 20px auto;
        position: relative;
        margin-left: 35px;
        margin-right: 6px;
      }
      #awardlist__next {
        width: 0;
        height: 0;
        border-width: 21px 0 21px 26px;
        border-style: solid;
        border-color: transparent transparent transparent #213186;
        margin: 20px auto;
        position: relative;
      }
      ul {
        @include dpr(width, 171px);
        @include dpr(height, 80px);
        margin: 0 auto;
        display: inline-block;
        width: 50%;
        li {
          position: absolute;
          visibility: hidden;
          img {
            @include dpr(width, 171px);
            @include dpr(height, 80px);
          }
        }
        & li:first-child {
          visibility: visible;
        }
      }
    }
  }
  .myawardlist{
     width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: none;
    background: rgba(0, 0, 0, 0.7);
    font-size: 14pt;
    .myawardlist__wrapper {
      @include dpr(width, 300px);
      @include dpr(height, 300px);

       margin: 0 auto;
      margin-top: 50%;
      background: #2d3565;
      position: relative;

      padding: 1px;
    padding-top: 67px;
    box-sizing: border-box;
          span {
       position: absolute;
    top: 20px;
    left: 30%;
    font-size: 16pt;
    color: white;
      }
      table{
            border-collapse: separate;
         border-spacing:3px;
      }
      tr{
        color:white;
      }
      & tr:first-child{
          color:yellow;
      }


    }
  }
  .duijiang{
        width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: none;
    background: rgba(0, 0, 0, 0.7);
        font-size: 11pt;
    line-height: 13pt;
    color: white;
    
    hr + div{
      color:yellow;
    }
    .duijiang__wrapper{
          padding: 0 17px;
      @include dpr(width, 300px);
      @include dpr(height, 300px);
      margin: 0 auto;
      margin-top: 50%;
      background: #2d3565;
 
      box-sizing: border-box;
      position: relative;
      div:first-child{
              font-size: 18pt;
    text-align: center;
    padding-top: 13px;
    padding-bottom: 40px;
    }
    div:nth-child(n+2){
      margin-bottom: 14px;
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