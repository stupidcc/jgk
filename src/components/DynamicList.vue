<!-- 动态列表-->
<template>
    <ul class="trainList">
        <li v-for="item in dynamicList">
          <router-link :to="'/dynamicDetail/'+item.id" v-if="entry=='home'">
            <img :src="'http://image.zfwx.com'+item.img" class="fl">
            <div class="trainInfo">
                <p class="trainTT forlve">{{item.title}}</p>
                <div class="trainInfolist">
                    <div class="date">{{item.createTime|time('YYYY-MM-DD hh:mm:ss')}}</div>
                    <div class="eye"><span class="eyeIcon fl"></span><span class="eyeNum fl">{{item.browse}}</span></div>
                    <div class="star"><span class="starIcon fl"></span><span class="starNum fl">{{item.collectNum}}</span></div>
                    <div class="message"><span class="messageIcon fl"></span><span class="messageNum fl">{{item.commentNum}}</span></div>
                </div>
            </div>
          </router-link>
          <router-link :to="'/dynamicDetailForLvsuo/'+item.id+'/'+lvsuoId" v-if="entry=='lvsuo'">
            <img :src="'http://image.zfwx.com'+item.img" class="fl">
            <div class="trainInfo">
              <p class="trainTT forlve">{{item.title}}</p>
              <div class="trainInfolist">
                <div class="date">{{item.createTime|time('YYYY-MM-DD hh:mm:ss')}}</div>
                <div class="eye"><span class="eyeIcon fl"></span><span class="eyeNum fl">{{item.browse}}</span></div>
                <div class="star"><span class="starIcon fl"></span><span class="starNum fl">{{item.collectNum}}</span></div>
                <div class="message"><span class="messageIcon fl"></span><span class="messageNum fl">{{item.commentNum}}</span></div>
              </div>
            </div>
          </router-link>
        </li>
    </ul>
</template>
<script>
    export default{
        props:['dynamicList','entry','lvsuoId'],
      data(){return {

      }},
      mounted(){

      }
    }
</script>
<style scoped>
  .trainList{background-color: #fff}
  .trainList li{height:1.64rem;width:100%;padding:0.2rem;}
  .trainList li img{height:1.24rem;width:1.73rem;}
  .trainList li .trainInfo{overflow: hidden;height:100%;padding:0 0 0 0.32rem;}
  .trainList li .trainInfo .trainTT{height:0.56rem;line-height:0.56rem;font-size:0.4rem;color:#7d7d7d;margin-bottom:0.07rem;}
  .trainList li .trainInfo .trainInfolist{height:0.6rem;width:100%;display:flex;justify-content: space-between;font-size:0.3rem;font-family:'fzlantingheis-r-gbregular'}
  .trainList li .trainInfo .trainInfolist .date{flex:1;height:0.6rem;line-height:0.6rem;color:#acacac;}
  .trainList li .trainInfo .trainInfolist .eye span.eyeIcon{display:block;width:0.373rem;height:0.6rem;background: url("../assets/imgs/eye.png") no-repeat center center;background-size: contain}
  .trainList li .trainInfo .trainInfolist .star span.starIcon{display:block;width:0.28rem;height:0.6rem;background: url("../assets/imgs/star.png") no-repeat center center;background-size: contain}
  .trainList li .trainInfo .trainInfolist .message span.messageIcon{display:block;width:0.24rem;height:0.6rem;background: url("../assets/imgs/comment.png") no-repeat center center;background-size: contain}
  .trainInfolist .eye span.eyeNum, .trainInfolist .star span.starNum,
  .trainInfolist .message span.messageNum{display:block;height:0.6rem;line-height:0.6rem;color:#acacac;padding:0 0.1333rem;}

</style>
