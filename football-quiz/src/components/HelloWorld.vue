<template>
  <div class="wrapper" >
    <div class="main">
      <div id="time"><img :src="images[current]"></div>
      <div class="ques" id="ques">{{question}}</div>
      <answer ref="answer" v-on:chooseans="choose($event)" :option="option"></answer>
      
    </div>
    <right class="right" id="right"></right>
    <wrong class="wrong" id="wrong"></wrong>
    <result v-on:draw="draw()" :correctTotal="correctTotal"></result>
    <guide v-on:back="back()" ></guide> 
   <!--  <audio id="bgMusic" src="http://testpublic-1252461635.cosgz.myqcloud.com/zuiyoujie/%E8%94%A1%E5%8F%B8%E4%B8%96%E7%95%8C%E6%9D%AF%E6%96%87%E4%BB%B6/bg.m4a" loop="loop" preload=”auto”></audio> -->
     <audio id="right1" src="http://testpublic-1252461635.cosgz.myqcloud.com/zuiyoujie/%E8%94%A1%E5%8F%B8%E4%B8%96%E7%95%8C%E6%9D%AF%E6%96%87%E4%BB%B6/right.m4a"   loop="loop" preload=”auto”></audio>
      <audio id="wrong1" src="http://testpublic-1252461635.cosgz.myqcloud.com/zuiyoujie/%E8%94%A1%E5%8F%B8%E4%B8%96%E7%95%8C%E6%9D%AF%E6%96%87%E4%BB%B6/wrong.mp3"   loop="loop" preload=”auto”></audio>
    <!-- 测试问题变化 -->
    <!-- <button>clickme</button> -->
  </div>
</template>

<script>
import Answer from "../components/answer";
import Right from "../components/rightmask";
import Wrong from "../components/wrongmask";
import Result from "../components/result";

import Guide from "../components/guide";
import A from "../../static/images/time/1.png";
import B from "../../static/images/time/2.png";
import C from "../../static/images/time/3.png";
import D from "../../static/images/time/4.png";
export default {
  name: "HelloWorld",
  data() {
    return {
      hasshare: false,
      question: " 2014 年巴西世界杯的吉祥物是什么？",
      option: [1, 2, 3, 4],
      images: [A, B, C, D],
      current: 0,
      // 存储问题的数据
      questmp: {},
      answer: "",
      /* 答对总题目 */
      correctTotal: 0,
      RAFId: undefined,
      stop: false,
      openid: "oYkYa03gpCorQzWW3GCM-uw10aCo",
      // 答题id
      id: 0
    };
  },
  components: {
    Answer,
    Right,
    Wrong,
    Result,

    Guide
  },
  mounted() {
    // 背景音乐无法播放的问题
    var vm = this;
    /* document.documentElement.style.width = window.innerWidth-3 + 'px'; */
    this.__init();
    //  微信初始化
    this.openid = this.$route.params.openid;
    /*       debugger; */
    this.wechatshare();
    /*  debugger; */

    /* this.$('#bgMusic')[0].play(); */
  },
  methods: {
    wechatshare() {
      /*          debugger; */
      var vm = this;

      this.$http
        .get(
          "https://www.ipareto.com/zeissSjb/wechatjs/init?openid=" + vm.openid,
          {
            params: {}
          }
        )
        .then(function(response) {
          var rsp = response;
          if (rsp.data.code == 0) {
            var data = rsp.data.data;
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.appId, // 必填，公众号的唯一标识
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.nonceStr, // 必填，生成签名的随机串
              signature: data.signature, // 必填，签名
              jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
            });
            wx.ready(function() {
              alert("微信js初始化成功");

              wx.onMenuShareTimeline({
                title: "答世界杯题，免费赢取电影票", // 分享标题
                link:
                  "https://www.ipareto.com/zeissSjb/wechat/authorize?returnUrl=https://www.ipareto.com/dist/index.html", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl:
                  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528789842537&di=c9aae9e15fdf1890e37fae56fbd7a478&imgtype=0&src=http%3A%2F%2Fimg2.fengniao.com%2Fproduct%2F95%2F746%2FceZckZsl6oBUA.jpg", // 分享图标
                success: function() {
                  // 用户点击了分享后执行的回调函数
                  window.localStorage.setItem("hasshare", true);
                  alert("分享了" + window.localStorage["hasshare"]);
                  vm.hasshare = true;
                },
                cancel: function() {}
              });
            //新增
						wx.hideMenuItems({
							menuList: ["menuItem:copyUrl", "menuItem:openWithQQBrowser"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
						});
						wx.onMenuShareAppMessage({
							title: '答世界杯题，免费赢取电影票', // 分享标题
							desc: '答世界杯题，免费赢取电影票', // 分享描述
							link: 'https://www.ipareto.com/zeissSjb/wechat/authorize?returnUrl=https://www.ipareto.com/dist/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528789842537&di=c9aae9e15fdf1890e37fae56fbd7a478&imgtype=0&src=http%3A%2F%2Fimg2.fengniao.com%2Fproduct%2F95%2F746%2FceZckZsl6oBUA.jpg', // 分享图标
							success: function() {
								// 用户点击了分享后执行的回调函数
                alert('已分享朋友圈');
                 // 用户点击了分享后执行的回调函数
                  window.localStorage.setItem("hasshare", true);
                  alert("分享了" + window.localStorage["hasshare"]);
                  vm.hasshare = true;
							},
							cancel: function() {
								alert('分享朋友圈被取消');
							}
						});
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            });
            wx.error(function(res) {
              alert("微信js初始化失败：" + res);
              // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
          } else {
            alert("wxshares" + rsp.msg);
          }
        })
        .catch(function(response) {
          //错误处理 比如出现一个蒙层显示网络错误
          alert(response);
        });
    },
    back() {
      this.$(".guide")[0].style.display = "none";
    },
    draw() {
      /* 显示抽奖页面 */
      /* alert('显示抽奖页面') */
      /* 先隐藏掉动画效果 */
      var vm = this;
      window.cancelAnimationFrame(vm.RAFId);
      vm.RAFId = undefined;
      vm.stop = true;
      vm.$("canvas").remove();
      /* 进入抽奖组件 */
      /*   debugger; */
      this.$("#bgMusic")[0].pause();
      vm.$router.push({
        name: "luckyDraw",
        params: {
          id: vm.id,
          openid: vm.openid,
          hasshare: vm.hasshare
        }
      });
    },
    choose(val) {
      // 判断答案是否正确
      var vm = this;
      /* debugger; */
      if (val == this.answer) {
        // 播放音乐
        vm.$("#right1")[0].play();
        /* alert('正确') */
        this.$("#right")[0].style.display = "block";
        setTimeout(function() {
          // 停止音乐
          vm.$("#right1")[0].pause();
          vm.$("#right")[0].style.display = "none";
          /* 红色球的颜色要弄回去 */
          vm.$refs.answer.biaohei(vm.answer);
          vm.newQuestion();
        }, 200);
        vm.correctTotal++;
        console.log("答对题目数量", vm.correctTotal);
      } else {
        /* alert('错误') */
        vm.$("#wrong1")[0].play();
        // 播放音乐
        this.$("#wrong")[0].style.display = "block";
        setTimeout(function() {
          // 停止音乐
          vm.$("#wrong1")[0].pause();
          vm.$("#wrong")[0].style.display = "none";
          vm.$refs.answer.biaohei(vm.answer);
          vm.newQuestion();
        }, 200);
      }
      this.$refs.answer.biaohong(this.answer, this.current);
    },
    /* 请求下一道题目 */
    newQuestion() {
      var vm = this;
      var tmp = ++vm.current;
      if (tmp > 3) {
        //答题完毕 出
        /* alert('答题完毕 出结果') */
        vm.$(".result")[0].style.display = "block";
        vm.__animation();
        //提交分数
        vm.submitScore();
      } else {
        // 显示下一道题目
        var res = [];
        res.push(vm.questmp[vm.current].a);
        res.push(vm.questmp[vm.current].b);
        res.push(vm.questmp[vm.current].c);
        res.push(vm.questmp[vm.current].d);

        vm.option = res;
        vm.question = vm.questmp[vm.current].title;
        vm.answer = vm.questmp[vm.current].correct;

        if (vm.current == 3) {
          vm.$refs.answer.biaohongcaisi();
        }
      }
    },
    submitScore() {
      var vm = this;
      alert("submitScoreopenid", vm.openid);
      vm.$.post(
        "https://www.ipareto.com/zeissSjb/submitScore",
        {
          openid: vm.openid,
          score: vm.correctTotal
        },
        function(result) {
          /* console.log(result); */

          var response = result;

          if (response.msg == "ok") {
            /* console.log(response.data); */
            vm.id = response.data.id;
            /*  vm.id =  "715282859960308"; */
          } else {
            alert("请求问题数据错误");
          }
        }
      );
    },
    __init() {
      var vm = this;
      //测试是否有点透 目前mask出来没有
      /*  vm.$('.main').click(function(){
        console.log(1);
      }) */
      /* document.getElementsByTagName('button')[0].addEventListener('touchend',function(){
          vm.question = "大力神杯是由谁颁给世界杯冠军？";
      }) */
      // 初始化问题的位置
      // var ele = document.getElementById("ques");
      // var height = -20 - ele.clientHeight / 2;
      // var width = 0 - ele.clientWidth / 2;

      // ele.style.marginLeft = width + "px";
      // ele.style.marginTop = height + "px";
      //获取问题数据
      this.$http
        .get("https://www.ipareto.com/zeissSjb/getTimus", {
          params: {}
        })
        .then(function(response) {
          console.log(response);
          if (response.data.msg == "ok") {
            vm.questmp = response.data.data;
            if (vm.current > 3) {
              // 显示蔡司题
            } else {
              // 按顺序显示题目
              var res = [];
              res.push(vm.questmp[vm.current].a);
              res.push(vm.questmp[vm.current].b);
              res.push(vm.questmp[vm.current].c);
              res.push(vm.questmp[vm.current].d);

              vm.option = res;
              vm.question = vm.questmp[vm.current].title;
              vm.answer = vm.questmp[vm.current].correct;
            }
          } else {
            alert("请求问题数据错误");
          }
        })
        .catch(function(response) {
          //错误处理 比如出现一个蒙层显示网络错误
          console.log(response);
        });
    },
    /* 纸屑动画 */
    __animation() {
      var vm = this;
      /* 五彩动画逻辑 */
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Progress = (function() {
        function Progress() {
          var param =
            arguments.length <= 0 || arguments[0] === undefined
              ? {}
              : arguments[0];

          _classCallCheck(this, Progress);

          this.timestamp = null;
          this.duration = param.duration || Progress.CONST.DURATION;
          this.progress = 0;
          this.delta = 0;
          this.progress = 0;
          this.isLoop = !!param.isLoop;

          this.reset();
        }

        Progress.prototype.reset = function reset() {
          this.timestamp = null;
        };

        Progress.prototype.start = function start(now) {
          this.timestamp = now;
        };

        Progress.prototype.tick = function tick(now) {
          if (this.timestamp) {
            this.delta = now - this.timestamp;
            this.progress = Math.min(this.delta / this.duration, 1);

            if (this.progress >= 1 && this.isLoop) {
              this.start(now);
            }

            return this.progress;
          } else {
            return 0;
          }
        };

        _createClass(Progress, null, [
          {
            key: "CONST",
            get: function get() {
              return {
                DURATION: 1000
              };
            }
          }
        ]);

        return Progress;
      })();

      var Confetti = (function() {
        function Confetti(param) {
          _classCallCheck(this, Confetti);

          this.parent = param.elm || document.body;
          this.canvas = document.createElement("canvas");
          this.ctx = this.canvas.getContext("2d");
          this.width = param.width || this.parent.offsetWidth;
          this.height = param.height || this.parent.offsetHeight;
          this.length = param.length || Confetti.CONST.PAPER_LENGTH;
          this.yRange = param.yRange || this.height * 2;
          this.progress = new Progress({
            duration: param.duration,
            isLoop: true
          });
          this.rotationRange =
            typeof param.rotationLength === "number" ? param.rotationRange : 10;
          this.speedRange =
            typeof param.speedRange === "number" ? param.speedRange : 10;
          this.sprites = [];

          this.canvas.style.cssText = [
            "display: block",
            "position: absolute",
            "top: 0",
            "left: 0",
            "pointer-events: none"
          ].join(";");

          this.render = this.render.bind(this);

          this.build();

          this.parent.append(this.canvas);
          this.progress.start(performance.now());

          vm.RAFId = requestAnimationFrame(this.render);
        }

        Confetti.prototype.build = function build() {
          for (var i = 0; i < this.length; ++i) {
            var canvas = document.createElement("canvas"),
              ctx = canvas.getContext("2d");

            canvas.width = Confetti.CONST.SPRITE_WIDTH;
            canvas.height = Confetti.CONST.SPRITE_HEIGHT;

            canvas.position = {
              initX: Math.random() * this.width,
              initY: -canvas.height - Math.random() * this.yRange
            };

            canvas.rotation =
              this.rotationRange / 2 - Math.random() * this.rotationRange;
            canvas.speed =
              this.speedRange / 2 + Math.random() * (this.speedRange / 2);

            ctx.save();
            ctx.fillStyle =
              Confetti.CONST.COLORS[
                (Math.random() * Confetti.CONST.COLORS.length) | 0
              ];
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();

            this.sprites.push(canvas);
          }
        };

        Confetti.prototype.render = function render(now) {
          var progress = this.progress.tick(now);

          this.canvas.width = this.width;
          this.canvas.height = this.height;

          for (var i = 0; i < this.length; ++i) {
            this.ctx.save();
            this.ctx.translate(
              this.sprites[i].position.initX +
                this.sprites[i].rotation *
                  Confetti.CONST.ROTATION_RATE *
                  progress,
              this.sprites[i].position.initY +
                progress * (this.height + this.yRange)
            );
            this.ctx.rotate(this.sprites[i].rotation);
            this.ctx.drawImage(
              this.sprites[i],
              -Confetti.CONST.SPRITE_WIDTH *
                Math.abs(
                  Math.sin(progress * Math.PI * 2 * this.sprites[i].speed)
                ) /
                2,
              -Confetti.CONST.SPRITE_HEIGHT / 2,
              Confetti.CONST.SPRITE_WIDTH *
                Math.abs(
                  Math.sin(progress * Math.PI * 2 * this.sprites[i].speed)
                ),
              Confetti.CONST.SPRITE_HEIGHT
            );
            this.ctx.restore();
          }

          if (vm.stop) {
            window.cancelAnimationFrame(vm.RAFId);
            vm.RAFId = undefined;
          } else {
            vm.RAFId = requestAnimationFrame(this.render);
          }
        };

        _createClass(Confetti, null, [
          {
            key: "CONST",
            get: function get() {
              return {
                SPRITE_WIDTH: 9,
                SPRITE_HEIGHT: 16,
                PAPER_LENGTH: 100,
                DURATION: 8000,
                ROTATION_RATE: 50,
                COLORS: [
                  "#EF5350",
                  "#EC407A",
                  "#AB47BC",
                  "#7E57C2",
                  "#5C6BC0",
                  "#42A5F5",
                  "#29B6F6",
                  "#26C6DA",
                  "#26A69A",
                  "#66BB6A",
                  "#9CCC65",
                  "#D4E157",
                  "#FFEE58",
                  "#FFCA28",
                  "#FFA726",
                  "#FF7043",
                  "#8D6E63",
                  "#BDBDBD",
                  "#78909C"
                ]
              };
            }
          }
        ]);

        return Confetti;
      })();

      var start = function() {
        var DURATION = 8000,
          LENGTH = 120;

        new Confetti({
          width: window.innerWidth,
          height: window.innerHeight,
          length: LENGTH,
          duration: DURATION
        });

        setTimeout(function() {
          new Confetti({
            width: window.innerWidth,
            height: window.innerHeight,
            length: LENGTH,
            duration: DURATION
          });
        }, DURATION / 2);
      };
      start();
    }
  },
  watch: {
    question: function(val) {
      /*     var ele = document.getElementById("ques");
      var height = -20 - ele.clientHeight / 2;
      var width = 0 - ele.clientWidth / 2;

      ele.style.marginLeft = width + "px";
      ele.style.marginTop = height + "px";
        if(val.indexOf('头球破门')!==-1){
            this.$('.ques')[0].style.marginLeft = '-103px';
            this.$('.ques')[0].style.marginTop =  '-38px';
        } */
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper,
.main {
  height: 100%;
  width: 100%;
}
.ques {
  /* position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  width: 55%;
 font-family: caisiBold;
  font-size: 16pt;
  line-height: 16pt;
  text-align: center; */
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  /* width: 55%; */
  font-family: caisiBold;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  width: 170px;
  height: 65px;
  margin: -32.5px 0 0 -85px;
}
</style>
<style scoped lang="scss" >
#time {
  img {
    width: rem(165);
    height: rem(50);
    /* @include dpr(width, 36px);
      @include dpr(height, 50px); */
    display: block;
    margin: 0 auto;
    padding-top: rem(21);
    /*  @include dpr(padding-top, 21px); */
  }
}
.right {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
}
.wrong {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
}
.result {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: none;
}
.luckyDraw {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
}
.guide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
}
</style>
