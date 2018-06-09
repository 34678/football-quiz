/* 抽奖页面 */
<template>
  <div class="luckyDraw" v-bind:style="'backgroundImage:url(../../static/images/draw/'+currentDraw+'bg.png)'">
 
      <!-- 出礼品区 -->
      <div class="draw">
          <!-- 滚动礼品的组件 --> 
          <div></div>
          <div class="duihuan"></div>      
        </div>
        <!-- 功能按钮 -->
    <div class="toolbar">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
    </div>
    <footer></footer>
  </div>
</template>
<script>
import Footer from "../components/base/footer";
export default {
  data() {
    return {
      currentDraw: 1
    };
  },
  mounted() {
    this.__init();
  },
  components: {
    Footer
  },
  methods: {
    __init() {
      /* 自动进行抽奖 */
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
    @include dpr(margin-top, -57px);
    .item {
      @include dpr(width, 88px);
      @include dpr(height, 33px);
      @include dpr(margin-left, 270px);
      @include dpr(margin-bottom, 6px);
      background-size: contain;
      background-repeat: no-repeat;
    }
    & .item:nth-child(1) {
      background-image: url("../../static/images/draw/btn/awards.png");
    }
    & .item:nth-child(2) {
      background-image: url("../../static/images/draw/btn/my.png");
    }
    & .item:nth-child(3) {
      background-image: url("../../static/images/draw/btn/flow.png");
    }
  }
  img {
    width: 100%;
  }
}
</style>