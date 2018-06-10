/* 首页 */
<template>
 <!--  二维码和游戏名称的组件  -->
  <div class="index">
      <img src="../../static/images/bigbg.png">
      <div class="start" v-on:click="$router.push('HelloWorld')">
          <img src="../../static/images/start.png">
      </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="scss" >
.index {
      height: 100%;
    width: 100%;
    background: white;
  img {
    width: 100%;
  }
  .start {
    img {
      @include dpr(width, 127px);
      @include dpr(height, 31px);
      display: block;
      margin: 0 auto;
      margin-top: -269px;
    }
  }
}
</style>