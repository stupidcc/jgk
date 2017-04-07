<!--/*注册组件 课程标签*/-->
<template>
  <ul class="infoCourseList">
    <li v-for="(course,index) in courseList" v-if="(ifIndex && index<2)||!ifIndex">
      <div class="courseName bottomLine">
        <h5>{{course.csName}}</h5>
        <p class="subtt">{{course.csSummary}}</p>
      </div>
      <div class="courseMoreInfo bottomLine">
        <div class="firstLine">
          <span class="timeLong">时长：{{course.csHour}}分钟</span>
          <span class="timedate">上传：{{course.csAddtime|time}}</span>
          <span class="pointIcon" v-if="course.payType==0||course.payType==2">{{course.csPrice}}点币</span>
        </div>
        <div class="secondLine">
          <div class="person" v-if="ifView"><span class="fl icons"></span>{{course.csStudynum}}</div>
          <div class="person" v-if="!ifView"><span class="fl icons"></span>{{course.browseNum}}</div>
          <div class="praise"><span class="fl icons"></span>{{course.csLike}}</div>
          <div class="message"><span class="fl icons"></span>{{course.csCommentnum}}</div>
          <div class="price" v-if="course.payType==1||course.payType==2"><span class="fl moneyIcon">¥</span><span class="fl num">{{course.csDiscountprice}}</span></div>
        </div>
      </div>
      <div class="authorInfo" v-for="(teacher,index) in course.teacherSmpsList" v-if="course.teacherSmpsList.length>0">
        <div class="imgContainer fl">
          <span class="info">i</span>
          <img :src="teacher.tchPhoto">
        </div>
        <div class="authorLabel fl">
          <p class="techName">{{teacher.tchName}}</p>
          <p class="subtt forlve">{{teacher.tchSpedesc}}</p>
        </div>
        <div class="toSee fr" v-if="index==(course.teacherSmpsList.length-1)">
          <a :href="url+course.courseId"><span class="plus fl">+</span><span class="skanInfo fl">查 看</span></a>
        </div>
      </div>
      <div class="authorInfo"  v-if="course.teacherSmpsList.length==0">
        <div class="toSee fr">
          <a :href="url+course.courseId"><span class="plus fl">+</span> <span class="skanInfo fl">查 看</span></a>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  export default{
      props:["courseList",'ifIndex','ifPointUrl'],
       data(){
          return {
              url:"",
            ifView:true,
          }
       },
    mounted:function(){
           var ctx=this;
           if(ctx.ifPointUrl=='view'){//点视
               ctx.url=URL+"/jgk/pointview.html?courseId="
               ctx.ifView=true
           }else if(ctx.ifPointUrl=='read'){
             ctx.url=URL+"/pointlisten/index.html?courseId="
             ctx.ifView=false
           }
    }
  }
</script>
<style scoped>
  .infoCourseList li{width:100%;overflow:auto;background-color: #fff;margin-bottom:0.267rem}
  .infoCourseList li .courseName{width:100%;height:1.35rem;padding:0.173rem 0.347rem;}
  .infoCourseList li .courseName h5{font-size:0.4rem;font-weight:normal;height:0.613rem;line-height:0.613rem;color:#7d7d7d;overflow: hidden;white-space: nowrap;text-overflow: ellipsis}
  .infoCourseList li .courseName p.subtt{height:0.4rem;line-height:0.4rem;font-size:0.267rem;color:#acacac;overflow: hidden;white-space: nowrap;text-overflow: ellipsis}
  .infoCourseList li .courseMoreInfo{width:100%;height:1.35rem;font-family:"宋体"}
  .infoCourseList li .courseMoreInfo>div{display:flex;justify-content:space-between;width:100%;height:0.60835rem;padding-left:0.347rem;}
  .infoCourseList li .courseMoreInfo .firstLine span{display:block;height:0.7835rem;line-height:0.7835rem;text-align:left;padding-right:0.667rem;font-size:0.3rem;color:#acacac;font-family:'fzlantingheis-r-gbregular'}

  .infoCourseList li .courseMoreInfo .firstLine span.timedate{flex:1}
  .infoCourseList li .courseMoreInfo .firstLine span.pointIcon{font-size:0.32rem;}
  .infoCourseList li .courseMoreInfo .secondLine{padding-right:0.4rem}
  .infoCourseList li .courseMoreInfo .secondLine>div{line-height:55px;padding-right:20px;font-size:0.3rem;color:#acacac;font-family:'fzlantingheis-r-gbregular'}
  .infoCourseList li .courseMoreInfo .secondLine span.icons{display:block;width:30px;height:60px;background: url("../assets/imgs/icons.png") no-repeat center center;margin-right:10px;}
  .infoCourseList li .courseMoreInfo .secondLine .person span.icons{background-position:-50px 8px}
  .infoCourseList li .courseMoreInfo .secondLine .praise span.icons{background-position:0px -40px}
  .infoCourseList li .courseMoreInfo .secondLine .message span.icons{background-position:-48px -38px}
  .infoCourseList li .courseMoreInfo .secondLine .price{font-size:0.423rem;}
  .infoCourseList li .courseMoreInfo .secondLine .price .moneyIcon{font-family: 黑体}
  .infoCourseList li .courseMoreInfo .secondLine .price .num{margin-left:5px;font-family:'fzlantingheis-r-gbregular'}
  .infoCourseList li .authorInfo{width:100%;height:1.42rem;position: relative}
  .infoCourseList li .authorInfo .imgContainer{position: absolute;width: 1.68rem; height: 1.44rem;top: -2px;z-index: 1;background-color: #fff;padding-left:0.23rem}
  .infoCourseList li .authorInfo .imgContainer img{width:1.28rem;height:1.28rem;border-radius: 50%}
  .infoCourseList li .authorInfo .imgContainer span.info{position: absolute;width: 20px;height: 20px;line-height:20px;text-align:center;border-radius: 50%;background-color: #4fc1e9;color: #fff;top: 10px;left: 1.2rem;}
  .infoCourseList li .authorInfo .authorLabel{width:5rem;height:100%;margin-left:1.68rem;padding-top:10px;padding-top:10px;color:#acacac}
  .infoCourseList li .authorInfo .techName{font-size:0.35rem}

  .infoCourseList li .authorInfo .subtt{font-size:0.267rem;}
  .infoCourseList li .authorInfo .toSee{width:2.5rem;height:100%;}
  .infoCourseList li .authorInfo .toSee a{display:block;padding:0 0 0 0.6rem;color:#fff;background-color: #53ddff;font-size:0.36rem;height:0.6rem;line-height:0.6rem;margin-top:0.46rem;}
  .infoCourseList li .authorInfo .toSee a span{display:block;}
  .infoCourseList li .authorInfo .toSee a span.plus{margin-right:0.2rem;font-size:0.4rem;font-weight: bold}


</style>
