<template>
 <!-- 引导页 -->
  <div class="guide">
      <div class="back" v-on:click="$emit('back')"> <返回</div>
      <!-- 这里需要改成一个箭头的符号 -->
      <img src="../../static/images/time/1.png">
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.__init();
  },
  methods: {
    __init() {
        var vm = this;
 
   
    }
  }
};
</script>
<style scoped lang="scss" >
.guide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
 
    img{
        height:100px;
        width:100px;
        float: right;
    }
  .back {
      color:white;
          font-size: 16pt;
    display: inline;
  }
}
</style>