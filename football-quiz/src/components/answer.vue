<template>
  <div class="answer">
    <div class="item" my-index="a" v-on:click="$emit('chooseans','a')">
        <div>A</div>
        <div>{{option[0]}}</div>
    </div>
    <div class="item" my-index="b" v-on:click="$emit('chooseans','b')">        
        <div>B</div>
        <div>{{option[1]}}</div>
    </div>
    <div class="item" my-index="c" v-on:click="$emit('chooseans','c')">       
         <div>C</div>
        <div>{{option[2]}}</div>
    </div>
    <div class="item" my-index="d" v-on:click="$emit('chooseans','d')">       
         <div>D</div>
        <div>{{option[3]}}</div>
    </div>
  </div>
</template>
<script>

  export default {
        props: {
            option: {
                type: Array,
                default: []
            },
        },
        mounted() {
            this.__init();
        },
        methods:{
            __init(){
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
  }
</script>
<style scoped lang="scss" >
.answer{
    position :absolute;
    /* top: rem(546);
    left:rem(30); */
        top: 75%;
    left: 5%;
    height :rem(150);
    width :rem(750);
    .item{
        width :rem(75);
        height :rem(75);
        display: inline-block;
        background-size: cover;
            vertical-align: top;
            & div:first-child{
                 @include dpr(margin-left, 36px);
                  @include dpr(margin-top, 33px);

            color: transparent;
            vertical-align: baseline;
            font-size: 14pt;
            }
            & div:nth-child(2){
                color:white;
                font-size: 14pt;
                 @include dpr(margin-top, 46px);
                text-align: center;
            }
    }
    & .item:nth-child(1){
        background-image : url('../../static/images/btn/1B.png');
    }
    & .item:nth-child(2){
        background-image : url('../../static/images/btn/2B.png');
    }
    & .item:nth-child(3){
        background-image : url('../../static/images/btn/3B.png');
    }
    & .item:nth-child(4){
        background-image : url('../../static/images/btn/4B.png');
    }
        
}

</style>