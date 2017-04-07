<template>
    <div class="tbanner">
        <div class="slide-banner" id="slideBannner">
            <ul>
                <li v-for="img in sliderImgs"><a :href="img.adUrl"><img :src="'http://image.zfwx.com'+img.adImg"></a></li>
            </ul>
        </div>
        <div class="circleIcon">
            <ul>
                <li class="fl" :class="{currentCircle:slideIndex==$index}" v-for="(img,$index) in sliderImgs"><span></span></li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
      data(){
            return {
               sliderImgs:[],
              slideIndex:0,
            }
      },
      mounted:function(){
          var ctx=this;
        var $slideBannner=$("#slideBannner");
        var clientWidth=document.documentElement.clientWidth;
        ctx.$http.get(URL+"/findAdvertising.json?position=9&domain=0").then(response=>{
          ctx.sliderImgs=response.body;
        },response=>{})
        setInterval(function(){
          ++ctx.slideIndex;
          if(ctx.slideIndex==ctx.sliderImgs.length){
            ctx.slideIndex=0
          }
          $slideBannner.css("transform","translate3d(-"+10*ctx.slideIndex+"rem, 0px, 0px)")
        },5000)
      }
    }
</script>
<style scoped>
   div.tbanner{position: relative;width:100%;height:3.52rem;overflow: hidden}
  .slide-banner{height:100%;width:100000px;position: absolute;transition: transform ease-in 0.5s }
  .slide-banner ul{height:100%;width:100%;position: relative}
  .slide-banner ul li{display:block;height:100%;width:10rem;float:left}
  .slide-banner ul li a{display:block;height:100%;width:100%;vertical-align: middle;overflow: hidden}
  .slide-banner ul li a img{display:block;height:100%;width:100%;}
   .circleIcon{position: absolute;right:10px;bottom:0;height:20px;}
   .circleIcon ul li{width:24px;height:20px;}
   .circleIcon ul li span{display:block;width:10px;height:10px;border-radius: 50%;background-color: #fff}
   .circleIcon ul li.currentCircle span{display:block;width:10px;height:10px;border-radius: 50%;border:1px solid #fff;background-color: transparent}
</style>
