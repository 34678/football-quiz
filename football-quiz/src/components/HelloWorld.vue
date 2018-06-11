<template>
  <div class="wrapper">
    <div class="main">
      <div id="time"><img :src="images[current]"></div>
      <div class="ques" id="ques">{{question}}</div>
      <answer ref="answer" v-on:chooseans="choose($event)" :option="option"></answer>
      
    </div>
    <right class="right" id="right"></right>
    <wrong class="wrong" id="wrong"></wrong>
    <result v-on:draw="draw()" :correctTotal="correctTotal"></result>
    <lucky-draw></lucky-draw>
    <guide v-on:back="back()" ></guide>
    <draw></draw>
    <!-- 测试问题变化 -->
    <!-- <button>clickme</button> -->
  </div>
</template>

<script>
import Answer from '../components/answer'
import Right from '../components/rightmask'
import Wrong from '../components/wrongmask'
import Result from '../components/result'
import luckyDraw from '../components/luckyDraw'
import Guide from '../components/guide'
import Draw from '../components/draw'
import A from "../../static/images/time/1.png";
import B from "../../static/images/time/2.png";
import C from "../../static/images/time/3.png";
import D from "../../static/images/time/4.png";
export default {
  name: 'HelloWorld',
  data () {
    return {
      question: ' 2014 年巴西世界杯的吉祥物是什么？',
      option:[1,2,3,4],
      images:[A,B,C,D],
      current:0,
      // 存储问题的数据
      questmp:{},
      answer:'',
      /* 答对总题目 */
      correctTotal:0,
      RAFId:undefined,
      stop:false,
      openid:'https://docs.qq.com/doc/BqsXiL09UcT82GaYdI0TUkDi3gUSyP3VViow0IQmKC2Cjyb92sN59Q2dfqWC4WIxnx1dNh9Q3'
    }
  },
  components: {
    Answer,
    Right,
    Wrong,
    Result,
    luckyDraw,
    Guide ,
    Draw
  },
  mounted() {
    this.__init();
  },
  methods:{
    back(){
       this.$('.guide')[0].style.display = "none"
    },
    draw(){
      /* 显示抽奖页面 */
      /* alert('显示抽奖页面') */
      /* 先隐藏掉动画效果 */
      var vm = this;
      window.cancelAnimationFrame(vm.RAFId);
      vm.RAFId = undefined;
      vm.stop = true;
      vm.$('canvas').remove();
      /* 进入抽奖组件 */
     
    },
    choose(val){
      // 判断答案是否正确
      var vm = this;
      if(val == this.answer){
        /* alert('正确') */
        this.$('#right')[0].style.display = "block";
        setTimeout(function(){
           vm.$('#right')[0].style.display = "none";
           /* 红色球的颜色要弄回去 */
           vm.$refs.answer.biaohei(vm.answer);
           vm.newQuestion();
        },200);
        vm.correctTotal++;
        console.log('答对题目数量',vm.correctTotal)
      }else{
        /* alert('错误') */
        
        this.$('#wrong')[0].style.display = "block";
        setTimeout(function(){
           vm.$('#wrong')[0].style.display = "none";
           vm.$refs.answer.biaohei(vm.answer);
           vm.newQuestion();
           
        },200);
      }
      this.$refs.answer.biaohong(this.answer,this.current);
 
    },
    /* 请求下一道题目 */
    newQuestion(){
      var vm = this;
      var tmp = ++vm.current;
      if(tmp>3){
        //答题完毕 出
        /* alert('答题完毕 出结果') */
         vm.$('.result')[0].style.display = "block";
         vm.__animation();
      }else {
        // 显示下一道题目
        var res = [];
        res.push(vm.questmp[vm.current].a);
        res.push(vm.questmp[vm.current].b);
        res.push(vm.questmp[vm.current].c);
        res.push(vm.questmp[vm.current].d);
      
        vm.option = res;
        vm.question = vm.questmp[vm.current].title;
        vm.answer = vm.questmp[vm.current].correct;
      }
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
      var ele = document.getElementById('ques');
      var height = -20 - ele.clientHeight/2;
      var width = 0 - ele.clientWidth/2;
      
      ele.style.marginLeft = width + 'px';
      ele.style.marginTop = height + 'px';
      //获取问题数据
        this.$http.get('https://www.ipareto.com/zeissSjb/getTimus', {
          params: {
          }
          })
          .then(function (response) {
            console.log(response);
            if(response.data.msg =='ok'){
              vm.questmp = response.data.data;
              if(vm.current > 3){
                // 显示蔡司题

              }else{
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
            }else{
              alert('请求问题数据错误')
            }
          })
          .catch(function (response) {
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

        vm.RAFId =  requestAnimationFrame(this.render);
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

          
          if(vm.stop){
              window.cancelAnimationFrame(vm.RAFId);
              vm.RAFId = undefined;
          }else{
            vm.RAFId =  requestAnimationFrame(this.render);
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

      var start =  function() {
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
      } ;
      start();
    }
  },
  watch: {
    question:function(val){
      var ele = document.getElementById('ques');
      var height = -20 - ele.clientHeight/2;
      var width = 0 - ele.clientWidth/2;
      
      ele.style.marginLeft = width + 'px';
      ele.style.marginTop = height + 'px';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .wrapper,.main{
   height: 100%;
    width: 100%;
 }
 .ques{
    position: absolute;
    top: 50%;
    left: 50%;
    color: white;
    width: 55%;
 
    font-size: 16pt;
    line-height: 16pt;
    text-align: center;
 }
</style>
<style scoped lang="scss" >
  #time{ 
    img{
      width:rem(165);
      height: rem(50);
      /* @include dpr(width, 36px);
      @include dpr(height, 50px); */
      display: block;
      margin: 0 auto;
      padding-top:rem(21);
     /*  @include dpr(padding-top, 21px); */
    }
  }
  .right{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: none;
  }
    .wrong{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: none;
  }
  .result{
    position: absolute;
        top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
     display: none;
  }
  .luckyDraw{
        position: absolute;
        top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
  }
  .guide{
            position: absolute;
        top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: none;
  }
  .draw{
                position: absolute;
        top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    /* display: none; */
  }
</style>
