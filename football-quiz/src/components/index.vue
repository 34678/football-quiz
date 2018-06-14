/* 首页 */
<template>
 <!--  二维码和游戏名称的组件  -->
  <div class="index">
      <img src="../../static/images/bigbg.png">
      <div class="start" v-on:click="start()">
          <img src="../../static/images/start.png">
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      openid:0,
    }
  },
  mounted() {
    // 去掉滚动条
    window.localStorage.setItem("hasshare",false);
    alert("分享了"+window.localStorage['hasshare']);
   /*  document.documentElement.style.width = window.innerWidth + 'px'; */
    /* alert(window.location.href); */
    var str = window.location.href;
    console.log(str);
    var num = str.indexOf("openid");
    if (num != -1) {
      if (str.indexOf("&") != -1) {
        //  还有其他参数
        var num2 = str.indexOf("&");
        var openid = str.substring(num + 7, num2);
        /* http://localhost/#/?openid=111&aa=1 */
      } else {
        var openid = str.substring(num + 7,str.length-2);
        
      }
    }
    /*  alert(openid); */

    if (openid == "" || !openid) {
      /* alert("无openid"); */
    } else {
      /* alert("有openid"+openid); */
      this.openid = openid;
    }
  },
  methods: {
start(){
  debugger;
  this.$('#bgMusic')[0].play();
  /* let audio = new Audio();
  audio.src = "http://testpublic-1252461635.cosgz.myqcloud.com/zuiyoujie/%E8%94%A1%E5%8F%B8%E4%B8%96%E7%95%8C%E6%9D%AF%E6%96%87%E4%BB%B6/bg.m4a";
  audio.play(); */
  this.$router.push({name:'HelloWorld',params:{'openid':this.openid}});
  
}
  }
};
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