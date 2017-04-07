<!-- 点视课程标签-->
<template>
    <ul class="viewCourseList">
        <li v-for="item in viewList" @click="showDownApp">
            <div class="courseName bottomLine">
                <h5>{{item.csName}}</h5>
                <p class="subtt">{{item.csSummary}}</p>
            </div>
            <div class="courseMoreInfo bottomLine">
                <div class="courseLabel">
                    <span class="fl spanLabel">标签：</span>
                    <label class="labelContent">
                        <span class="fl">理论依据</span>
                        <span class="fl">核心争议</span>
                        <span class="fl">法律分析</span>
                        <span class="fl">制度改进</span>
                    </label>
                </div>
                <div class="firstLine">
                    <span class="timeLong">时间：{{item.transcribeTime|time}}</span>
                    <div class="alarmClock">
                      <count-down :datetime="item.transcribeTime"></count-down>
                    </div>
                </div>
                <div class="secondLine">
                    <div class="person"><span class="fl icons"></span>{{item.csStudynum}}</div>
                    <div class="praise"><span class="fl icons"></span>{{item.csLike}}</div>
                    <div class="message"><span class="fl icons"></span>{{item.csCommentnum}}</div>
                    <div class="price"><span class="fl">&nbsp;&nbsp; </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                </div>
            </div>
            <div class="authorInfo" v-for="(teacher,index) in item.teacherSmpsList" v-if="item.teacherSmpsList.length>0">
                <div class="imgContainer fl">
                    <span class="info">i</span>
                    <img :src="teacher.tchPhoto">
                </div>
                <div class="authorLabel fl">
                    <p class="techName">{{teacher.tchName}} <span> {{teacher.tchSpedesc}}》</span></p>
                    <p class="subtt forlve">{{teacher.tchMajor}}</p>
                </div>
                <div class="toSee fr" v-if="index==(item.teacherSmpsList.length-1)">
                    <a :href="'http://m.zfwx.com/jgk/pointview.html?courseId='+item.courseId">+ 报名</a>
                </div>
            </div>
          <div class="authorInfo" v-if="item.teacherSmpsList.length==0">
            <div class="toSee fr">
              <a :href="'http://m.zfwx.com/jgk/pointview.html?courseId='+item.courseId">+ 报名</a>
            </div>
          </div>
        </li>
    </ul>
</template>
<script>
  import CountDown from "./count-down.vue"
    export default{
        props:['viewList'],
      components:{
        CountDown
      },
      methods:{
        showDownApp:function(){
            this.$emit('showdwonapp')
        }
      }
    }
</script>
<style scoped>
  .viewCourseList li{width:100%;background-color:#fff;margin-bottom:0.267rem}
  .viewCourseList li .courseMoreInfo{width:100%;height:1.8rem;}
  .viewCourseList li .courseMoreInfo .courseLabel{width:100%;height:0.5833rem;}
  .viewCourseList li .courseMoreInfo .courseLabel .spanLabel{display:block;width:0.86rem;height:0.5833rem;line-height:0.5833rem;}
  .viewCourseList li .courseMoreInfo .courseLabel label.labelContent{display:block;width:7.89rem;overflow:hidden}
  .viewCourseList li .courseMoreInfo .courseLabel label.labelContent span{display:block;height:0.5833rem;line-height:0.5833rem;margin:0 0.133rem;color:#4fc1e9}
  .viewCourseList li .courseMoreInfo .secondLine{height:0.70835rem;line-height:0.70835rem;}
  .viewCourseList li .courseMoreInfo .firstLine > span{display:block;height:0.50835rem;line-height:0.50835rem;text-align:left;padding-right:0.667rem;font-size:0.3rem;font-family:'fzlantingheis-r-gbregular';color:#acacac}
  .viewCourseList li .authorInfo .techName>span{font-size:0.267rem;display:inline-block;margin-left:0.4rem;}
  .viewCourseList li .courseName{width:100%;height:1.35rem;padding:0.173rem 0.347rem;}
  .viewCourseList li .courseName h5{font-size:0.4rem;height:0.613rem;line-height:0.613rem;color:#7d7d7d;overflow: hidden;white-space: nowrap;text-overflow: ellipsis}
  .viewCourseList li .courseName p.subtt{height:0.4rem;line-height:0.4rem;font-size:0.267rem;color:#acacac;overflow: hidden;white-space: nowrap;text-overflow: ellipsis}
  .viewCourseList li .courseMoreInfo>div{display:flex;justify-content:space-between;width:100%;height:0.60835rem;padding-left:0.347rem;}
  .viewCourseList li .courseMoreInfo .firstLine span.timedate{flex:1}
  .viewCourseList li .courseMoreInfo .firstLine span.pointIcon{font-size:0.32rem;}
  .viewCourseList li .courseMoreInfo .secondLine{padding-right:0.4rem}
  .viewCourseList li .courseMoreInfo .secondLine>div{line-height:55px;padding-right:20px;font-size:0.3rem;font-family:'fzlantingheis-r-gbregular';color:#acacac;}
  .viewCourseList li .courseMoreInfo .secondLine span.icons{display:block;width:30px;height:60px;background: url("../assets/imgs/icons.png") no-repeat center center;margin-right:10px;}
  .viewCourseList li .courseMoreInfo .secondLine .person span.icons{background-position:-50px 8px}
  .viewCourseList li .courseMoreInfo .secondLine .praise span.icons{background-position:0px -40px}
  .viewCourseList li .courseMoreInfo .secondLine .message span.icons{background-position:-48px -38px}
  .viewCourseList li .courseMoreInfo .secondLine .price{font-size:0.32rem}
  .viewCourseList li .authorInfo{width:100%;height:1.42rem;position: relative}
  .viewCourseList li .authorInfo .imgContainer{position: absolute;width: 1.68rem; height: 1.44rem;top: -2px;z-index: 1;background-color: #fff;padding-left:0.23rem}
  .viewCourseList li .authorInfo .imgContainer img{width:1.28rem;height:1.28rem;border-radius: 50%}
  .viewCourseList li .authorInfo .imgContainer span.info{position: absolute;width: 20px;height: 20px;line-height:20px;text-align:center;border-radius: 50%;background-color: #4fc1e9;color: #fff;top: 10px;left: 1.2rem;}
  .viewCourseList li .authorInfo .authorLabel{width:5.5rem;height:100%;margin-left:1.68rem;padding-top:10px;}
  .viewCourseList li .authorInfo .authorLabel{width:5.5rem;height:100%;padding-top:10px;color:#acacac}
  .viewCourseList li .authorInfo .techName{font-size:0.35rem}
  .viewCourseList li .authorInfo .subtt{font-size:0.267rem;}
  .viewCourseList li .authorInfo .toSee{width:2rem;height:100%;}
  .viewCourseList li .authorInfo .toSee a{display:block;padding:0 0.5rem;color:#fff;background-color: #53ddff;font-size:0.32rem;height:0.5rem;line-height:0.5rem;margin-top:0.46rem;}
  .viewCourseList li .courseMoreInfo .firstLine .alarmClock{width:2.3rem;position: relative}
.alarmLabel{position:absolute;display:block;width:0.63rem;height:0.67rem;background: url("../assets/imgs/alarmclock.png") no-repeat center center;background-size: contain;}




</style>
