<template>
 <!-- 引导页 -->
  <div class="guide" v-on:click="hide()">
      <div class="back" v-on:click="$emit('back')"> <返回</div>
      <!-- 这里需要改成一个箭头的符号 -->
      <img src="../../static/images/share.png">
      <div class="share">分享到朋友圈多一次抽奖机会</div>
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
    hide(){
      this.$('.guide')[0].style.display = "none";
    },
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

  img {
    margin-right: 10px;
    margin-top: 13px;
    width: 50px;
    float: right;
  }
  .share{
    font-size: 13pt;
    color: white;
    text-align: right;
    padding-right: 35px;
    margin-top: 37px;
    font-family: SimHei;
    font-weight: bold;
  }
  .back {
    color: white;
    font-size: 15px;
    margin-left: 25px;
    display: inline;
  }
}
</style>