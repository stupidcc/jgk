<template>
  <div class="lvsuoTop">
    <div class="fengjing" :style="{background:'url('+lvsuo.wxImageFj+') no-repeat center center / 100% 100%'}">
      <p class="lvsuoName">{{lvsuo.bottom}}</p>
    </div>
    <div class="lvsuoInfo">
      <div class="listDiv">
        <div class="item fl"><p class="num">{{lvsuo.courseNum}}</p><p class="label">课程</p></div>
        <div class="item fl"><p class="num">{{lvsuo.likeNum}}</p><p class="label">好评</p></div>
        <div class="item fl last"><p class="num">{{lvsuo.stuNum}}</p><p class="label">学员</p></div>
      </div>
    </div>
    <div class="logo" :style="{background:'url('+lvsuo.banner+') no-repeat center center/100% 100% #fff'}"></div>
  </div>
</template>
<script>
  export default{
      props:['lvsuo'],
      data(){
          return {

          }
      },
    mounted:function(){
        console.log(this.lvsuo.bottom)
    }
  }
</script>
<style scoped>
  .lvsuoTop{width:10rem;height:4rem;position: relative}
  .lvsuoTop .logo{width:2.1rem;height:2.1rem;position:absolute;bottom:0.2rem;left:0.3rem;border:2px solid #d2d2d2}
  .lvsuoTop .fengjing{width:10rem;height:2.853rem;position: relative;background-size:100% 100%}
  .lvsuoTop .fengjing .lvsuoName{position:absolute;bottom:0.4rem;left:2.75rem;font-size:0.43rem;font-family:方正黑体简体;color:#fff;}
  .lvsuoTop .lvsuoInfo{width:10rem;height:1.147rem;padding:0.13rem 0 0.2rem 0;background-color: #f4f4f4 }
  .lvsuoTop .lvsuoInfo .listDiv{width:7.6rem;margin-left:2.4rem;height:100%;}
  .lvsuoTop .lvsuoInfo .listDiv .item{width:2.53rem;height:100%;}
  .lvsuoTop .lvsuoInfo .listDiv .item:not(:last-child){border-right:2px solid #dfdfdf}
  .listDiv .item p{width:100%;text-align:center;}
  .listDiv .item p.num{height:0.44rem;line-height:0.44rem;font-size:0.373rem;font-family: 方正黑体简体;color:#000;font-weight: bold}
  .listDiv .item p.label{height:0.4rem;line-height:0.4rem;font-size:0.267rem;color:#999;font-family: 方正黑体简体;}
</style>
