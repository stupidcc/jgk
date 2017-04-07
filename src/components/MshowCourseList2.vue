<!-- 面授课程标签-->
<template>
        <ul class="noticeLists">
            <li v-for="item in msstatusF">
            <a class="noticett"  v-bind:href="'http://m.zfwx.com/facetoface/face_detailed.json?id='+item.activityId">
                <div class="noticeTop bottomLine">
                    <span class="lottery">有奖</span>
                    <div class="noticett">
                        <span class="noticeLabel fl">律师</span>
                        <p class="noticeTitle forlve">{{item.activityName}}</p>
                    </div>
                    <p class="subtt forlve">{{item.generalSituation}}</p>
                </div>
                <div class="noticeSub clearfix">
                    <div class="fl subLeft">
                        <span class="clockA fl"></span>
                        <p class="linedown">{{item.beginTime|time}}</p>
                        <p class="location"><span class="locationLabel fl"></span><span class="locationInfo forlve fl">{{item.addrName}}</span></p>
                    </div>
                    <div class="subRight">
                        <count-down :datetime="item.beginTime"></count-down>
                        <div class="toRegist">
                          <a class="msbm fr" v-if="item.status==0"  v-bind:href="'http://m.zfwx.com/facetoface/face_detailed.json?id='+item.activityId">
                            <span class="plus fl">+</span>
                            <span class="regist fl">报  名</span>
                          </a>
                          <a class="msbm msbmh fr"  v-if="item.status==1"  v-bind:href="'http://m.zfwx.com/facetoface/face_detailed.json?id='+item.activityId">
                            <span class="plus fl">+</span>
                            <span class="regist fl">教学中</span>
                          </a>
                          <a class="msbm msbmh fr" v-if="item.status==2" v-bind:href="'http://m.zfwx.com/facetoface/face_detailed.json?id='+item.activityId">
                            <span class="plus fl">+</span>
                            <span class="regist fl">已结束</span>
                          </a>
                        </div>
                    </div>
                </div>
                </a>
            </li>
        </ul>
</template>
<script>
  import Vue from 'vue'
  import CountDown from "./count-down.vue"
    export default{
        data() {
            return {
            }
        },
        components:{
          CountDown
        },
        props: ['msstatusF'],
        methods: {

        },
    }
</script>
<style scoped>
.noticeLists{}
.noticeLists li{width:100%;height:3.283rem;margin-bottom: 0.267rem;background-color: #fff}
.noticeLists li .noticeTop{position:relative;padding:0.267rem 4% 0.14rem;}
.noticeLists li .noticeTop .lottery{position:absolute;right:0.4rem;top:-5px;width:0.73rem;height:0.73rem;line-height:0.73rem;color:#fff;text-align:center;background: url("../assets/imgs/lottery.png") no-repeat center center;background-size: contain;z-index:1;font-size: 0.267rem}
.noticeLists li .noticeTop .noticeLabel{display:block;height:0.4rem;margin:0.08rem 10px 0 0;line-height:0.4rem;padding:0 10px;font-size:0.267rem;color:#fff;border-left:4px solid #f06eaa;background-color:#acacac}
.noticeLists li .noticeTop .noticeTitle{height:0.6rem;line-height:0.6rem;width:6rem;font-size:0.373rem;color:#7d7d7d}
.noticeLists li .noticeTop .subtt{height:0.467rem;line-height:0.467rem;width:100%;font-size:0.267rem;color:#acacac}
.noticeLists li .noticeSub{position:relative;height:1.77rem;padding:0.267rem 4% 0.14rem;}
.noticeLists li .noticeSub .subLeft{width:75%;padding-top:0.293rem;position:relative}
.noticeLists li .noticeSub .subLeft .clockA{display:block;position: absolute;top:0;left:0;width:0.333rem;height:0.333rem;background: url("../assets/imgs/clock.png") no-repeat center center;background-size:contain}
.noticeLists li .noticeSub .subLeft .linedown{position: absolute;top:0;left:0.4rem;height:0.333rem;line-height:0.333rem;font-size:0.3rem;font-family:'fzlantingheis-r-gbregular';color:#acacac}
.noticeLists li .noticeSub .subLeft .lineup{position: absolute;top:0.4rem;left:0.4rem;height:0.333rem;line-height:0.333rem;font-size:0.24rem;color:#acacac}
.noticeLists li .noticeSub .subLeft .location{height:0.7rem;margin-top:0.16rem;width:100%}
.noticeLists li .noticeSub .subLeft .location span.locationLabel{display:block;width:0.333rem;height:100%;background: url("../assets/imgs/location.png") no-repeat center center;background-size:90%}
.noticeLists li .noticeSub .subLeft .location span.locationInfo{display:block;height:0.7rem;line-height:0.7rem;padding-left:5px;color:#acacac;font-size:0.267rem;}
.noticeLists li .noticeSub .subRight{overflow: hidden}
.noticeLists li .noticeSub .subRight .alarmLabel{display:block;width:0.60rem;height:0.62rem;background: url("../assets/imgs/alarmclock.png") no-repeat center center;background-size: contain;}
.alarmLabel{display:block;width:0.63rem;height:0.67rem;background: url("../assets/imgs/alarmclock.png") no-repeat center center;background-size: contain;}
.noticeLists li .noticeSub .subRight .countDown{color:#a8a8a8;font-size: 0.266rem}
.noticeLists li .noticeSub .subRight .countDown p{font-size: 0.266rem}
.noticeLists li .noticeSub .subRight .countDown .days{display:inline-block;margin:0 10px;font-size:0.267rem;}
.countDown .days{display:inline-block;margin:0 10px;font-size:0.3rem;}

.toRegist{position:absolute;bottom:0.11rem;right:0.2rem;}
.toRegist> a.msbm{display:block;color:#fff;width:2.5rem;padding:0 0 0 0.6rem;height:0.6rem;
  line-height:0.6rem;margin-top:0.1rem;text-align:center;font-size:0.36rem;background-color: #53ddff}
.toRegist> a.msbmh{background-color:#acacac}
 .toRegist > a span{display:block;}
 .toRegist span.plus{margin-right:0.2rem;font-size:0.4rem;font-weight: bold}

</style>
