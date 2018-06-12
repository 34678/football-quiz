/* 抽奖结果页面 */
<template>
  <div class="luckyDraw" :style="{backgroundImage:'url('+bgclass[currentDraw-1]+')'}">
 
      <!-- 出礼品区 -->
      <div class="draw" >
          <!-- 滚动礼品的组件 --> 
          <draw :type="type" :id="id" :openid="openid" v-if="refresh"></draw>
         <!--  <div class="myaward" :style="{backgroundImage:'url('+images[currentDraw-1]+')'}"></div> -->
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
      <div id="zhu">音乐：Cheery Monday（来自incompetech.com）</div>
    <div class="footer">
            <img src="../../static/images/qrcode.png">
            <img>
        <img class="sec" src="../../static/images/gamename.png">
    </div>
   <guide v-on:back="back()" ></guide> 
   <audio id="bgMusic" src="../../static/music/bg.m4a" autoplay="autoplay" loop="loop"></audio>
  </div>
</template>
<script>
import Guide from "../components/guide";
import draw from '../components/draw'
export default {
  data() {
    return {
      openid:"",
      type:'answer',
      refresh:true,
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
        "全国通兑电影票": 3
      },
      mapurl:{
        "0": 'http://coupon.m.jd.com/coupons/show.action?key=1b5178199b5f45d689dbe1c2ffb26e07&roleId=12356682&to=mall.jd.com/index-739696.html',
        "1": 'http://coupon.m.jd.com/coupons/show.action?key=e62fb9056c6b4a03841beadf0b3bc298&roleId=12356609&to=mall.jd.com/index-739696.html',
        "2": 'http://coupon.m.jd.com/coupons/show.action?key=62d137163a7d44aaad6f61172a61b20f&roleId=12356526&to=mall.jd.com/index-739696.html',
        "3": 'http://cdn.m2015.cn/zeiss/uv/os/',
      },
      myawards: {},
      index: 0,
      /* 是否已经分享朋友圈 */
      hasshare:false,
      /* 请求抽奖接口需要的id */
      id:''
    };
  },
  mounted() {
    this.__init();
  },
  components: {
    Guide,
    draw
  },
  methods: {
    back() {
      this.$(".guide")[0].style.display = "none";
    },
    drawagain() {
      /* 在抽一次函数 */
      /* 朋友圈引导 */
  
      alert('是否已经分享'+this.hasshare)
      if(!this.hasshare){
        this.$(".guide")[0].style.display = "block";
        /* 等待用户分享 */
        this.wechatshare()
      }else{
        /* 直接抽奖 */
        /* 重新加载一次抽奖 */
        vm.type = 'share';
        this.refresh = false
        this.$nextTick(() => {
        this.refresh = true
        })
       /*  this.$router.push({name:"draw",params:{
          id:this.id
        }}); */
      }
      /* 分享朋友圈再回来可以拿到状态 */
    },
    wechatshare() {
      var vm = this;
      this.$http
        .get("https://www.ipareto.com/zeissSjb/wechatjs/init", {
          params: {}
        })
        .then(function(response) {
          var rsp = response;
          if (rsp.code == 0) {
            data = rsp.data;
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.appId, // 必填，公众号的唯一标识
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.nonceStr, // 必填，生成签名的随机串
              signature: data.signature, // 必填，签名
              jsApiList: ["onMenuShareTimeline"] // 必填，需要使用的JS接口列表
            });
            wx.ready(function() {
              console.log("微信js初始化成功");
           

              wx.onMenuShareTimeline({
                title: "答世界杯题，免费赢取电影票", // 分享标题
                link: 'https://www.ipareto.com/zeissSjb/wechat/authorize?returnUrl=https://www.ipareto.com/dist/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl:
                 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528789842537&di=c9aae9e15fdf1890e37fae56fbd7a478&imgtype=0&src=http%3A%2F%2Fimg2.fengniao.com%2Fproduct%2F95%2F746%2FceZckZsl6oBUA.jpg', // 分享图标
                success: function() {
                  // 用户点击了分享后执行的回调函数
                   vm.hasshare = true;
                },
                cancel: function() {
                  
                }
              });

              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            });
            wx.error(function(res) {
              console.log("微信js初始化失败：" + res);
            
              // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
          } else {
            console.log(rsp.msg);
          }
        })
        .catch(function(response) {
          //错误处理 比如出现一个蒙层显示网络错误
          console.log(response);
        });
    },
    myAwards() {
      var vm = this;
      /* 查看我的所有的奖品 */
      /* ！！ */
      this.$http
        .get(
          "https://www.ipareto.com/zeissSjb/getAwardRecords?openid="+vm.openid,
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
            vm.$(".myawardlist")[0].addEventListener("click", function() {
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
      vm.$(".duijiang")[0].addEventListener("click", function() {
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
      
      window.location.href =  this.mapurl[this.index];

    },
    __init() {
      /* 初始化获得奖品的index */
     /*  this.index = this.$route.params.award; */
  /*  debugger; */
      this.id = this.$route.params.id;
      this.openid = this.$route.params.openid;
      this.refresh = false
        this.$nextTick(() => {
        this.refresh = true
        })
    },
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
#zhu{
      text-align: center;
      position: absolute;
    font-size: 12pt;
    width: 100%;
    bottom: 6px;
    left: 3px;
}
.luckyDraw {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: white;
  background-size: 100%;
  background-repeat: no-repeat;
  .draw {
    .myaward {
      @include dpr(width, 152px);
      @include dpr(height, 70px);
      @include dpr(margin-top, 158px);
      @include dpr(margin-left, 122px);
      background-size: contain;
    }
    .duihuan {
      @include dpr(width, 84px);
      @include dpr(height, 34px);
      @include dpr(margin-top, 11px);
      @include dpr(margin-left, 149px);
      background-image: url("../../static/images/draw/btn/duihuan.png");
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .toolbar {
    @include dpr(margin-top, -95px);
    display: inline-block;
    width: 22px;
    .item {
      @include dpr(width, 88px);
      @include dpr(height, 33px);
      @include dpr(margin-left, 287px);
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
  .myawardlist {
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
      table {
        border-collapse: separate;
        border-spacing: 3px;
      }
      tr {
        color: white;
      }
      & tr:first-child {
        color: yellow;
      }
    }
  }
  .duijiang {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: none;
    background: rgba(0, 0, 0, 0.7);
    font-size: 11pt;
    line-height: 13pt;
    color: white;

    hr + div {
      color: yellow;
    }
    .duijiang__wrapper {
      padding: 0 17px;
      @include dpr(width, 300px);
      @include dpr(height, 300px);
      margin: 0 auto;
      margin-top: 50%;
      background: #2d3565;

      box-sizing: border-box;
      position: relative;
      div:first-child {
        font-size: 18pt;
        text-align: center;
        padding-top: 13px;
        padding-bottom: 40px;
      }
      div:nth-child(n + 2) {
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