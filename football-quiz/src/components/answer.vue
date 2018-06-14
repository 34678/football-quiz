<template>
  <div class="answer">
    <div class="item" ref="a" v-on:click="$emit('chooseans','a')">
        <div >A</div>
        <div class="caisi">{{option[0]}}</div>
    </div>
    <div class="item" ref="b" v-on:click="$emit('chooseans','b')">        
        <div>B</div>
        <div>{{option[1]}}</div>
    </div>
    <div class="item" ref="c" v-on:click="$emit('chooseans','c')">       
         <div>C</div>
        <div >{{option[2]}}</div>
    </div>
    <div class="item" ref="d" v-on:click="$emit('chooseans','d');">       
         <div>D</div>
        <div>{{option[3]}}</div>
    </div>
  </div>
</template>
<script>
import a from "../../static/images/btn/1.png";
import b from "../../static/images/btn/2.png";
import c from "../../static/images/btn/3.png";
import d from "../../static/images/btn/4.png";
export default {
  data() {
    return {
      map: {
        a: require("../../static/images/btn/1.png"),
        b: require("../../static/images/btn/2.png"),
        c: require("../../static/images/btn/3.png"),
        d: require("../../static/images/btn/4.png")
      } 
    };
  },
  props: {
    option: {
      type: Array,
      default: []
    }
  },
  
  mounted() {
    this.__init();
  },
  methods: {
    biaohong(val,current) {
      /*     console.log(this.$refs[val]) */

      /*  this.$refs[val].style.backgroundImage = this.map[val] */
      this.$refs[val].style.backgroundImage = "url(" + this.map[val] + ")";
      /* if(current ===3){
        
          this.$('.caisi')[0].style.color = "red"
      } */
      /*  this.$refs[val].style.background = "black" */
      /*  console.log(this.map[val]) */
    },
    biaohongcaisi(){
      this.$('.caisi')[0].style.color = "red"
    },
    biaohei(val) {
      this.$refs[val].style.backgroundImage = "";
    },
    __init() {
      var vm = this;
      // 注册点击事件
      /*  var arr = Array.from(vm.$('.item'));
                arr.forEach(ele => {
                    ele.click(function(){
                        var index  = ele.attr('my-index');
                        $emit('chooseans',index);
                    })
                }); */
    }
  }
};
</script>
<style scoped lang="scss" >
.answer {
  position: absolute;
  /* top: rem(546);
    left:rem(30); */
  top: 75%;
  left: 5%;
  height: rem(150);
  width: rem(750);
  .item {
    width: rem(75);
    height: rem(75);
    display: inline-block;
    background-size: cover;
    vertical-align: top;
    & div:first-child {
      @include dpr(margin-left, 36px);
      @include dpr(margin-top, 33px);

      color: transparent;
      vertical-align: baseline;
      font-size: 14pt;
    }
    & div:nth-child(2) {
      color: white;
      font-size: 14pt;
      @include dpr(margin-top, 35px);
      text-align: center;
    }
  }
  & .item:nth-child(1) {
    background-image: url("../../static/images/btn/1B.png");
  }
  & .item:nth-child(2) {
    background-image: url("../../static/images/btn/2B.png");
  }
  & .item:nth-child(3) {
    background-image: url("../../static/images/btn/3B.png");
  }
  & .item:nth-child(4) {
    background-image: url("../../static/images/btn/4B.png");
  }
}
</style>