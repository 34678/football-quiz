<template>
  <div class="wrapper">
    <div class="main">
      <div id="time"><img :src="images[current]"></div>
      <div class="ques" id="ques">{{question}}</div>
      <answer :option="option"></answer>
    </div>
    <!-- 测试问题变化 -->
    <!-- <button>clickme</button> -->
  </div>
</template>

<script>
import Answer from '../components/answer'
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
      current:2,
    }
  },
  components: {
    Answer
  },
  mounted() {
    this.__init();
  },
  methods:{
    __init() {
      var vm = this;
      /* document.getElementsByTagName('button')[0].addEventListener('touchend',function(){
          vm.question = "大力神杯是由谁颁给世界杯冠军？";
      }) */
      // 初始化问题的位置
      var ele = document.getElementById('ques');
      var height = 0 - ele.clientHeight/2;
      var width = 7 - ele.clientWidth/2;
      
      ele.style.marginLeft = width + 'px';
      ele.style.marginTop = height + 'px';
      //获取问题数据
        this.$http.get('https://www.ipareto.com/zeissSjb/getTimus', {
          params: {
          }
          })
          .then(function (response) {
            console.log(response)
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
      var height = 0 - ele.clientHeight/2;
      var width = 7 - ele.clientWidth/2;
      
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
    width: 51%;
 
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
</style>
