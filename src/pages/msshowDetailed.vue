<template>
    <div id="content">
        <section data-group="2" >
            <div class="container">
                  <ul class="noticeLists">
                    <li>
                        <div class="noticeTop bottomLine">
                            <span class="lottery">有奖</span>
                            <div class="noticett">
                                <span class="noticeLabel fl"></span>
                                <p class="noticeTitle forlve"></p>
                            </div>
                            <p class="subtt forlve"></p>
                        </div>
                        <div class="noticeSub clearfix">
                            <div class="fl subLeft">
                                <span class="clockA fl"></span>
                                <p class="linedown"></p>
                                <p class="location"><span class="locationLabel fl"></span><span class="locationInfo forlve fl"></span></p>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="latestWebCourse">
                    <div class="contentView"></div>
                    <div class="ms-detailed-clists">
                        <a v-for="(item,index) in msTabsNames" @click="msTabsListClick(item, index)" :class="{'current':item.active}">{{item.select}}</a>
                    </div>
                    <!--简介-->
                    <div class="ms-introduction">
                        <div class="ms-title"><code class="icons icon-tit01 fl"></code>概况</div>
                        <div class="ms-contents">
                            <p>在深层次意义上，《让子弹飞》是一个关于革命法制及其现代性的故事。在辛亥革命的历史背景下，影片由黄四郎、张麻子（张牧之）、鹅城县令等角色展开着激烈的“王/寇→革命→反革命”之多维悬念纷争。革命的缘起...</p>
                        </div>
                    </div>
                    <!--课程目录-->
                    <div class="ms-coursecatalog">
                        <div class="ms-title"><code class="icons icon-tit02 fl"></code>课程</div>
                        <div class="ms-contents">
                           <p>一、革命隐喻</p><p>二、革命话语</p><p>三、革命危机及其法治现代性延展</p>
                        </div>
                    </div>
                    <!--师资-->
                    <div class="ms-teacher">
                        <div class="ms-title"><code class="icons icon-tit03 fl"></code>师资</div>
                        <div class="ms-contents">
                                <ul class="teacher-u">
                                    <li>
                                        <div class="teacher-info clearfix">
                                            <div class="teacher-photo fl">
                                                <img src="http://image.zfwx.com/upload/1471918638898.jpg">
                                            </div>
                                            <div class="teacher-detail">
                                                <div class="attenContainer clearfix">
                                                    <h3 class="fl ng-binding">华雨</h3>
                                                    <span class="attention fr ng-scope">关注</span>
                                                </div>
                                                <p>律师事务所律师</p>
                                                <div class="articleAndFun">
                                                    <span class="fl ng-binding">文章：2</span>
                                                    <span class="fl ng-binding">粉丝：0</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p class="tchNote">华雨，法学硕士，四川明炬律师事务所刘力团队律师（实习），刑事辩护与研究中心成员，曾参与、协助办理多个...</p>
                                                <p class="tchNote">华雨，法学硕士，四川明炬律师事务所刘力团队律师（实习），刑事辩护与研究中心成员，曾参与、协助办理多个诉讼、非诉案件，发表学术文章多篇。</p>
                                                <code class="icons toggleTeacherNote downshow"></code>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                        </div>
                    </div>
                    <!--收费-->
                    <div class="ms-cost">
                        <div class="ms-title">收费</div>
                        <div class="ms-contents clearfix">
                            <div class="cost-w fl">
                                <p class="p01">费用详情敬请垂询本课班主任</p>
                                <p class="p02">
                                   <span>1.长按右侧二维码</span>
                                   <span>2.识别图中二维码</span>
                                </p>
                                <p class="p03">
                                    <span>手机：18600652589</span>
                                    <span>微信：dianjingren3</span>
                                </p>

                            </div>
                            <div class="cost-img fr"><img src="imgs/qrcode.png"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<style scoped>

.categoryList{margin-top:0; }
</style>
<script>
import Vue from 'vue'
export default {
  data() {
    return {
      msType:'',
      current:false,
      msTabsNames:[
        {select:'概况',active:true},
        {select:'课程'},
        {select:'师资'},
        {select:'收费'}
      ]
    }
  },
  components: {
      //MshowCourseList
  },
  mounted(){
    var _self=this;
    _self.msstatus=status;
    $.ajax({
        type: "post",
        url: URL+"/getFacetofaces.json",
        data:{"pageNo":1,"pageSize":10,"status":status},
        dataType: "json",
        cache:true,
        async:false,
        success: function(data){
            if(data.message=="操作成功"){
                _self.msdata=data.result
            }
        }
    });
  },
  methods: {
    msTabsListClick:function(item,index){
      this.$nextTick(function(){
          this.msTabsNames.forEach(function(item){
            Vue.set(item,'active',false);
          })
          Vue.set(item,'active',true);
      });
    }
  }
}
</script>
<style scoped>
.noticeLists{}
.noticeLists li{width:100%;margin-bottom: 0.267rem;background-color: #fff}
.noticeLists li .noticeTop{position:relative;padding:0.267rem 4% 0.14rem;}
.noticeLists li .noticeTop .lottery{position:absolute;right:0.4rem;top:-5px;width:0.73rem;height:0.73rem;line-height:0.73rem;color:#fff;text-align:center;background: url("../assets/imgs/lottery.png") no-repeat center center;background-size: contain;z-index:1;font-size: 0.267rem}
.noticeLists li .noticeTop .noticeLabel{display:block;height:0.4rem;margin:0.08rem 10px 0 0;line-height:0.4rem;padding:0 10px;font-size:0.267rem;color:#fff;border-left:4px solid #f06eaa;background-color:#acacac}
.noticeLists li .noticeTop .noticeTitle{height:0.6rem;line-height:0.6rem;width:6rem;font-size:0.373rem;color:#7d7d7d}
.noticeLists li .noticeTop .subtt{height:0.467rem;line-height:0.467rem;width:100%;font-size:0.267rem;color:#acacac}
.noticeLists li .noticeSub{position:relative;padding:0.267rem 4% 0.14rem;}
.noticeLists li .noticeSub .subLeft{width:70%;padding-top:0.293rem;position:relative}
.noticeLists li .noticeSub .subLeft .clockA{display:block;position: absolute;top:0;left:0;width:0.333rem;height:0.333rem;background: url("../assets/imgs/clock.png") no-repeat center center;background-size:contain}
.noticeLists li .noticeSub .subLeft .linedown{position: absolute;top:0;left:0.4rem;height:0.333rem;line-height:0.333rem;font-size:0.24rem;color:#acacac}
.noticeLists li .noticeSub .subLeft .lineup{position: absolute;top:0.4rem;left:0.4rem;height:0.333rem;line-height:0.333rem;font-size:0.24rem;color:#acacac}
.noticeLists li .noticeSub .subLeft .location{height:0.7rem;margin-top:0.16rem;width:100%}
.noticeLists li .noticeSub .subLeft .location span.locationLabel{display:block;width:0.333rem;height:100%;background: url("../assets/imgs/location.png") no-repeat center center;background-size:90%}
.noticeLists li .noticeSub .subLeft .location span.locationInfo{display:block;height:0.7rem;line-height:0.7rem;padding-left:5px;color:#acacac;font-size:0.267rem;}
.noticeLists li .noticeSub .subRight{overflow: hidden}
.noticeLists li .noticeSub .subRight .alarmLabel{display:block;width:0.60rem;height:0.62rem;background: url("../assets/imgs/alarmclock.png") no-repeat center center;background-size: contain;}
.alarmLabel{display:block;width:0.63rem;height:0.67rem;background: url("../assets/imgs/alarmclock.png") no-repeat center center;background-size: contain;}
.noticeLists li .noticeSub .subRight .countDown{margin-left:0.7rem;color:#a8a8a8;font-size: 0.266rem}
.noticeLists li .noticeSub .subRight .countDown p{font-size: 0.266rem}
.noticeLists li .noticeSub .subRight .countDown .days{display:inline-block;margin:0 10px;font-size:0.267rem;}
.countDown .days{display:inline-block;margin:0 10px;font-size:0.3rem;}
.noticeLists li .noticeSub .subRight .toRegist span{display:block;color:#fff;width:2.3rem;height:0.5rem;line-height:0.5rem;margin-top:0.1rem;text-align:center;font-size:0.32rem;background-color: #53ddff}
.trainList{overflow:auto;background-color: #fff}

.ms-detailed-clists{width:100%;height:0.96rem;box-sizing: border-box;display:flex;margin:0 0 0.2rem;background: #fff;}
.ms-detailed-clists a{display:block;flex:1;height:0.96rem;box-sizing: border-box;line-height:0.96rem;text-align:center;color:#999;font-size:0.32rem;}
.ms-detailed-clists a.current{border-bottom:0.08rem solid #4fc1e9;color:#333}
.ms-introduction,.ms-coursecatalog,.ms-teacher,.ms-cost{background: #fff;width: 100%;margin-top: 0.266rem;}
.ms-introduction{}
.ms-coursecatalog{}
.ms-teacher{}
.ms-cost{}
.ms-title{padding: 0.133rem 0.266rem;border-bottom: 1px solid #eee;font-size:0.373rem;line-height:0.8rem;position: relative;}
.icon-tit01,.icon-tit02,.icon-tit03{width:0.38rem;height:0.39rem;margin: 0.208rem 0.13rem 0 0;}
.icon-tit01{background:url("../assets/imgs/icon03.png") no-repeat right center;;}
.icon-tit02{background:url("../assets/imgs/icon04.png") no-repeat right center;}
.icon-tit03{background:url("../assets/imgs/icon05.png") no-repeat right center}
.ms-contents{padding: 0.133rem 0.266rem;line-height:0.54rem;font-size: 0.346rem;color: #666666;}
.teacher-u{}
.teacher-u li{}
.teacher-u li .teacher-info{padding:  0.133rem;border-bottom: 1px solid #f4f4f4;}
.teacher-u li .teacher-photo{width: 1.333rem;margin-right: 0.133rem;}
.teacher-u li .teacher-photo img{width:1.333rem;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius: 50%;}
.teacher-u li .teacher-detail{position:relative;overflow: hidden}
.teacher-u li .teacher-detail h3{margin:0 15px 0 0;font-size:0.373rem;line-height:0.54rem}
.teacher-u li .teacher-detail span{color:#c2c2c2;display:inline-block;line-height:44px;font-size:0.266rem }
.teacher-u li .teacher-detail p{margin:0;padding:0;color:#666;font-size: 0.266rem}
.teacher-u li .teacher-detail code{position:absolute;top:45px;right:0;width:13px;height:20px;background:url("../assets/imgs/icon-right.png") no-repeat center}
.teacher-u li .teacher-detail span.attention{display: block;background-color: #0069f8;color: #fff;border-radius: 5px;height: 30px;line-height: 30px;padding: 0 10px;margin-top: 4px;}
.teacher-u li .tchNote{font-size:0.32rem;font-family:PingFangSC-Regular, '微软雅黑', '宋体';color:#666}
.cost-w{width: 50%;}
.cost-w p{font-size: 0.32rem}
.cost-w p.p01{line-height: 0.74rem;font-weight: bolder}
.cost-w p.p02{line-height: 0.54rem;}
.cost-w p.p02 span{display: block;color: #acacac;}
.cost-w p.p03{line-height: 0.54rem;padding:0.15rem 0}
.cost-w p.p03 span{display: block;}
.cost-img{width:46%;padding:2% 0;}
.cost-img img{width: 100%;}
</style>


