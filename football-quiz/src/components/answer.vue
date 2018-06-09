<template>
  <div class="answer">
    <div class="item">
        <div>A</div>
        <div>{{option[0]}}</div>
    </div>
    <div class="item">        
        <div>B</div>
        <div>{{option[1]}}</div>
    </div>
    <div class="item">       
         <div>C</div>
        <div>{{option[2]}}</div>
    </div>
    <div class="item">       
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
        background-image : url('../../src/assets/images/football.png');
        background-size: cover;
            & div:first-child{
                 @include dpr(margin-left, 36px);
                  @include dpr(margin-top, 33px);

            color: white;
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
        
}

</style>