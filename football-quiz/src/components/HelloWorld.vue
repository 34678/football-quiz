<template>
  <div class="wrapper">
    <div class="main">
      <div id="time"><img :src="images[current]"></div>
      <div class="ques" id="ques">{{question}}</div>
      <answer v-on:chooseans="choose($event)" :option="option"></answer>
      
    </div>
    <right class="right" id="right"></right>
    <wrong class="wrong" id="wrong"></wrong>
    <result :correctTotal="correctTotal"></result>
    <!-- 测试问题变化 -->
    <!-- <button>clickme</button> -->
  </div>
</template>

<script>
import Answer from '../components/answer'
import Right from '../components/rightmask'
import Wrong from '../components/wrongmask'
import Result from '../components/result'
export default {
  name: 'HelloWorld',
  data () {
    return {
      question: ' 2014 年巴西世界杯的吉祥物是什么？',
      option:[1,2,3,4],
      images:['../../static/images/time/1.png',
              '../../static/images/time/2.png',
              '../../static/images/time/3.png',
              '../../static/images/time/4.png'],
      current:0,
      // 存储问题的数据
      questmp:{},
      answer:'',
      /* 答对总题目 */
      correctTotal:0
    }
  },
  components: {
    Answer,
    Right,
    Wrong,
    Result
  },
  mounted() {
    this.__init();
  },
  methods:{
    choose(val){
      // 判断答案是否正确
      var vm = this;
      if(val == this.answer){
        /* alert('正确') */
        this.$('#right')[0].style.display = "block";
        setTimeout(function(){
           vm.$('#right')[0].style.display = "none";
           vm.newQuestion();
        },200);
        vm.correctTotal++;
        console.log('答对题目数量',vm.correctTotal)
      }else{
        /* alert('错误') */
        
        this.$('#wrong')[0].style.display = "block";
        setTimeout(function(){
           vm.$('#wrong')[0].style.display = "none";
           vm.newQuestion();
        },200);
      }
    },
    /* 请求下一道题目 */
    newQuestion(){
      var vm = this;
      var tmp = ++vm.current;
      if(tmp>3){
        //答题完毕 出结果
        alert('答题完毕 出结果')
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
  }
</style>
