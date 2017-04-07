<template>
  <div class="view">
    <div class="content" id="content">
      <p class="courseTT">{{dynamicItem.title}}</p>
      <p class="subTT"><span class="time fl">{{dynamicItem.createTime|time('YYYY-MM-DD hh:mm:ss')}}</span><span class="info fl">点睛网</span></p>
      <img :src="dynamicItem.img" class="dynamicPhoto">
      <div v-html="dynamicItem.content">
        {{dynamicItem.content}}
      </div>

    </div>
    <web-school :lvsuo="lvsuoObj"></web-school>
  </div>
</template>
<script>
  import LvsuoTop from '../components/LvsuoTop.vue'
  import WebSchool from '../components/WebSchool.vue'
  export default{
    components:{
      LvsuoTop,
      WebSchool
    },
    data(){
      return{
        dynamicItem:{},
        lvsuoObj:""
      }
    },
    methods:{

    },
    mounted:function () {
      /* global $ */
      var ctx=this;
      ctx.$http.get(URL+"/getlawyerfirm.json?id="+this.$route.params.lvsuoId).then(response=>{
         ctx.lvsuoObj=response.body;
      },response=>{})
      ctx.$http.get(URL+"/getNoticeDetail.do?noticeId="+this.$route.params.id).then(response=>{
        ctx.dynamicItem=response.body.result;
        console.info(response.body.result)
      },response=>{})

      var $contentView=$(".content");
      var clientWidth=document.documentElement.clientWidth;
      var remUnit=clientWidth/10
      if(clientWidth/devicePixelRatio<=414){
        remUnit = clientWidth / 10
      }else if(document.documentElement.clientWidth>=1136&&document.documentElement.clientWidth<=2208){//5s 6s横屏
        remUnit =108
      }else if(document.documentElement.clientWidth>2208){
        remUnit =54
      }else{
        remUnit = clientWidth / 10
      }
      var clientHeight=document.documentElement.clientHeight/remUnit-4.053;
     $contentView.css({"min-height":clientHeight+"rem"})
    }
  }
</script>
<style scoped>
body{max-width:1242px;min-width: 320px;margin:0 auto;font-family: "微软雅黑", "宋体", Arial, sans-serif}
.view{width:10rem;overflow: auto;position: relative;margin:0 auto;background-color: #ececec}
#content{position: relative;width:100%;}
#content>section>div{position: relative;width:100%;overflow: hidden}
.content{width:100%;padding:0 0.4rem;overflow:hidden;background-color: #fff}
.courseTT{font-size:0.64rem;color:#000;margin-top:20px;}
.subTT{width:100%;height:0.96rem;line-height:0.96rem;}
.subTT span.time{display:block;height:0.96rem;line-height:0.96rem;color:#808080;font-size:0.4rem;margin-right:0.8rem;}
.subTT span.info{display:block;height:0.96rem;line-height:0.96rem;color:#4fc1e9;font-size:0.427rem;}
.dynamicPhoto{width:100%;height:5.65rem;margin:10px 0;}
.webSchool{width:10rem;height:3.36rem;background-color: #fff;margin:0.24rem 0 0.453rem 0;padding-left:0.24rem}
.webSchool .webSchoolTop{width:100%;height:0.893rem;border-bottom:1px solid #f4f4f4}
.webSchool .webSchoolTop .webSchoolIcon{display:block;width:0.48rem;height:0.893rem;background: url(../assets/imgs/dynamic-logo.png) no-repeat center center;background-size: contain}
.webSchool .webSchoolTop .webSchoolLabel{display:block;width:1.13rem;height:0.893rem;line-height:0.893rem;text-align:center;font-size:0.373rem;color:#333;}
.webSchool .webSchoolInfo{width:100%;height:1.71rem;border-top:1px solid #ececec;border-bottom:1px solid #ececec;padding-top:0.2rem;}
.webSchool .webSchoolInfo .schoolLogo{width:1.28rem;height:1.28rem;margin-right:0.24rem;border-radius: 50%;background: url(http://image.zfwx.com/upload/1488953657867.jpg) no-repeat center center;background-color: #e6e6e6;}
.webSchool .webSchoolInfo .schoolIntro{overflow:hidden;height:1.28rem;}
.webSchool .webSchoolInfo .schoolIntro .name{height:0.627rem;line-height:0.627rem;font-size:0.4rem;color:#7d7d7d}
.webSchool .webSchoolInfo .schoolIntro .subInfo{width:7.3rem; font-size:0.28rem;color:#acacac;overflow:hidden;text-overflow: ellipsis;white-space: nowrap}
.webSchool .webSchoolListLabel{height:0.733rem;width:100%;padding:0.213rem 0;}
.webSchool .webSchoolListLabel .labelItem{width:25%;height:0.307rem}
.webSchool .webSchoolListLabel .labelItem:not(:last-child){border-right:2px solid #efefef}
.webSchool .webSchoolListLabel .labelItem span{display:block;}
.webSchool .webSchoolListLabel .labelItem span.no{color:#acacac;font-size:0.267rem}
.webSchool .webSchoolListLabel .labelItem span.resourceIncon{width:0.293rem;height:100%;line-height:0.307rem;margin:0 .1rem 0 0.6rem;background: url(../assets/imgs/dynamic-resource.png) no-repeat center center}
.webSchool .webSchoolListLabel .labelItem span.userIncon{width:0.31rem;height:100%;line-height:0.307rem;margin:0 .1rem 0 0.6rem;background: url(../assets/imgs/dynamic-user.png) no-repeat center center}
.webSchool .webSchoolListLabel .labelItem span.praiseIncon{width:0.31rem;height:100%;line-height:0.307rem;margin:0 .1rem 0 0.6rem;background: url(../assets/imgs/dynamic-praise.png) no-repeat center center}
.webSchool .webSchoolListLabel .labelItem span.messageIncon{width:0.35rem;height:100%;line-height:0.307rem;margin:0 .1rem 0 0.6rem;background: url(../assets/imgs/dynamic-message.png) no-repeat center center}





















</style>
