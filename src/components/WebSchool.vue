<template>
  <div class="webSchool">
    <div class="webSchoolTop">
      <span class="webSchoolIcon fl"></span>
      <span class="webSchoolLabel fl">网校</span>
    </div>
    <div class="webSchoolInfo">
      <div class="schoolLogo fl"></div>
      <div class="schoolIntro fl">
        <p class="name">{{lvsuo.bottom}}</p>
        <p class="subInfo">{{lvsuo.extSix}}</p>
      </div>
    </div>
    <div class="webSchoolListLabel">
      <div class="labelItem fl"><span class="resourceIncon fl"></span><span class="no fl">{{lvsuo.courseNum}}</span></div>
      <div class="labelItem fl"><span class="userIncon fl"></span><span class="no fl">{{lvsuo.stuNum}}</span></div>
      <div class="labelItem fl"><span class="praiseIncon fl"></span><span class="no fl">{{lvsuo.likeNum}}</span></div>
      <div class="labelItem fl"><span class="messageIncon fl"></span><span class="no fl">{{lvsuo.commentNum}}</span></div>
    </div>
  </div>
</template>
<script>
   export default{
     data(){
         return {

         }
     },
     props:['lvsuo']
   }
</script>
<style scoped>
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
