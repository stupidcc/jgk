<!-- 律所网校列表-->
<template>
    <ul class="lvsuoList">

        <li class="wxItem" v-for="item in lvsuoList">
          <router-link :to="'/lvsuoDetail/'+item.id">
            <div class="top">
                <img class="logo fl" :src="item.banner">
                <span class="schoolName forlve">{{item.bottom}}</span>
            </div>
            <img  class="lvsuoFJ":src="item.wxImageFj" alt="">
            <div class="bottom">
                <div class="wbook">
                    <span class="fl"></span>{{item.courseNum}}
                </div>
                <div class="wperson">
                    <span class="fl"></span>{{item.stuNum}}
                </div>
                <div class="wpraise">
                    <span class="fl"></span>{{item.likeNum}}
                </div>
                <div class="wmessage">
                    <span class="fl"></span>{{item.commentNum}}
                </div>
            </div>
          </router-link>
        </li>

    </ul>
</template>
<script>
    export default{
        props:['lvsuoList']
    }
</script>
<style scoped>
  /*.lvsuoList{width:100%;overflow: auto}*/
  .lvsuoList li{width:100%;height:4.32rem;margin-bottom:0.267rem;position:relative;}
  .lvsuoList li > img{display:block;width:100%;height:100%;}
  .lvsuoList li .top{width:100%;height:1.2rem;position:absolute;top:0;left:0;padding:0.267rem 0 0 0.267rem;}
  .lvsuoList li .top img{width:0.89rem;height:0.89rem;border-radius: 50%}
  .lvsuoList li .top .schoolName{display:block;overflow:hidden;height:0.8rem;line-height:0.8rem;padding-left:10px;font-size:0.43rem;color:#fff}
  .lvsuoList li .bottom{display:flex;justify-content:space-between;width:100%;height:90px;position:absolute;bottom:0;left:0;padding:20px 20px 0 20px;color:#fff}
  .lvsuoList li .bottom>div{line-height:68px;font-size:20px;height:100%;font-family:'fzlantingheis-r-gbregular';font-size:0.3rem}
  .lvsuoList li .bottom>div span{display:block;width:30px;height:30px;background:url("../assets/imgs/icons.png") no-repeat center center;margin-right:5px;margin-top:20px;}
  .lvsuoList li .bottom .wbook span{background-position: -3px -93px;}
  .lvsuoList li .bottom .wperson span{background-position: -46px -95px;}
  .lvsuoList li .bottom .wpraise span{background-position: -5px -135px;}
  .lvsuoList li .bottom .wmessage span{background-position: -46px -132px;}
  .lvsuoFJ{width:100%}
</style>
