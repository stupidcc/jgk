<!-- 面授课程标签-->
<template>
    <ul class="noticeList">
        <li v-for="item in mshowList">
            <div class="noticeTop bottomLine">
                <span class="lottery">有奖</span>
                <div class="noticett">
                    <span class="noticeLabel fl">机构班</span>
                    <p class="noticeTitle forlve">{{item.activityName}}</p>
                </div>
                <p class="subtt forlve">{{item.generalSituation}}</p>
            </div>
            <div class="noticeSub">
                <div class="fl subLeft">
                    <span class="clockA fl"></span>
                    <p class="linedown">{{item.beginTime|time}}</p><br>
                    <!--<p class="lineup">2016-12-25(线上)</p>-->
                    <p class="location"><span class="locationLabel fl"></span><span class="locationInfo forlve fl">{{item.addrName}}</span></p>
                </div>
                <div class="subRight">
                      <count-down :datetime="item.beginTime"></count-down>
                    <div class="toRegist">
                      <a class="fr disabled" href="javascript:void(0)" v-if="item.status!=0">
                        <span class="plus fl">+</span><span class="regist fl">已结束</span>
                      </a>
                      <a class="fr"  v-if="item.status==0" v-bind:href="'http://m.zfwx.com/facetoface/face_detailed.json?id='+item.activityId">
                        <span class="plus fl">+</span><span class="regist fl">报 名</span>
                      </a>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>
<script>
  import CountDown from "./count-down.vue"
    export default{
        props:['mshowList'],
        components:{
          CountDown
        }
    }
</script>
<style scoped>

  .noticeList{overflow: auto}
  .noticeList li{height:3.283rem;width:100%;margin-bottom: 0.267rem;background-color: #fff}
  .noticeList li .noticeTop{height:1.4rem;width:100%;position:relative;padding:0.267rem 0 0 0.44rem}
  .noticeList li .noticeTop .lottery{position:absolute;right:0.4rem;top:-10px;width:0.73rem;height:0.73rem;line-height:0.73rem;color:#fff;text-align:center;background: url("../assets/imgs/lottery.png") no-repeat center center;background-size: contain;z-index:1;}
  .noticeList li .noticeTop .noticeLabel{display:block;height:0.333rem;margin:0.133rem 10px 0 0;line-height:0.333rem;padding:0 10px;font-size:0.267rem;color:#fff;border-left:4px solid #f06eaa;background-color:#acacac}
  .noticeList li .noticeTop .noticeTitle{height:0.6rem;line-height:0.6rem;width:6rem;font-size:0.373rem;color:#7d7d7d}
  .noticeList li .noticeTop .subtt{height:0.467rem;line-height:0.467rem;width:100%;font-size:0.267rem;color:#acacac}

  .noticeList li .noticeSub{height:1.77rem;width:100%;position:relative;padding:0.267rem 0 0 0.44rem}
  .noticeList li .noticeSub .subLeft{width:6.5rem;height:100%;padding-top:0.293rem;position:relative}
  .noticeList li .noticeSub .subLeft .clockA{display:block;position: absolute;top:0;left:0;width:0.333rem;height:0.5rem;background: url("../assets/imgs/clock.png") no-repeat center center;background-size:contain}
  .noticeList li .noticeSub .subLeft .linedown{position: absolute;top:0;left:0.4rem;height:0.5rem;line-height:0.5rem;font-size:0.3rem;font-family:'fzlantingheis-r-gbregular';color:#acacac}
  .noticeList li .noticeSub .subLeft .lineup{position: absolute;top:0.4rem;left:0.4rem;height:0.333rem;line-height:0.333rem;font-size:0.24rem;color:#acacac}
  .noticeList li .noticeSub .subLeft .location{height:0.7rem;width:100%}
  .noticeList li .noticeSub .subLeft .location span.locationLabel{display:block;width:0.333rem;height:100%;background: url("../assets/imgs/location.png") no-repeat center center;background-size:90%}
  .noticeList li .noticeSub .subLeft .location span.locationInfo{display:block;height:0.7rem;line-height:0.7rem;padding-left:5px;color:#acacac;font-size:0.267rem;}
  .noticeList li .noticeSub .subRight{overflow: hidden}

  .noticeList li .noticeSub .subRight .toRegist{position:absolute;bottom:0.11rem}
  .noticeList li .noticeSub .subRight .toRegist> a{display:block;color:#fff;width:2.5rem;padding:0 0 0 0.6rem;height:0.6rem;line-height:0.6rem;margin-top:0.1rem;text-align:center;font-size:0.36rem;background-color: #53ddff}
  .noticeList li .noticeSub .subRight .toRegist> a.disabled{background-color:#acacac}
  .noticeList li .noticeSub .subRight .toRegist > a span{display:block;}
  .noticeList li .noticeSub .subRight .toRegist span.plus{margin-right:0.2rem;font-size:0.4rem;font-weight: bold}

</style>
