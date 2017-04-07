<!--未完成-->

<template>
  <div class="view">
    <top-fixed v-on:closetop="closeTopFixed"></top-fixed>
    <div id="content">
      <section data-group="2">
        <div class="container">
          <div class="latestWebCourse">
            <div class="categoryList">
              <div class="categories fl">
                <a @click="showAllCategory">我的网课 <span class="networkIcon fr"></span></a>
                <a>正听</a>
                <a>未听</a>
                <a>已听</a>
                <a>进度 <span class="progressIcon fr"></span></a>
              </div>
            </div>
            <tentrance v-on:clickpointqun="showPointQun"></tentrance>
            <div class="contentView">
              <course-list></course-list>
            </div>
          </div>
        </div>
      </section>
    </div>
    <footer-fixed :footer-index="footerIndex"></footer-fixed>

    <div class="fixed-background"v-show="ifPointQunClicked" @click="closeWindow"></div>
    <div class="pointqun" v-if="ifPointQunClicked">
      <div class="windowInfo">
        <p>请下载App体验更多功能与服务！</p>
      </div>
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.dj.zfwx.client.activity">立即下载App</a>
    </div>
  </div>
</template>


<script>
  import TopFixed from '../components/TopFixed.vue'
  import SlideBanner from '../components/SlideBanner.vue'
  import Tentrance from '../components/Tentrance.vue'
  import CourseList from '../components/CourseList.vue'
  import LvsuoList from '../components/LvsuoList.vue'
  import Rank from '../components/Rank.vue'
  import MshowCourseList from '../components/MshowCourseList.vue'
  import DynamicList from '../components/DynamicList.vue'
  import FooterFixed from '../components/FooterFixed.vue'
  export default{
      data(){
          return {
            url:"http://dev.zfwx.com/findcs.json?domain=0&csType=1",
            pageSize:7,
            loading: false,
            pageNo:1,
            footerHeight:"85",
            ifLoading:true,
            ifShowAllCategory:false,
            ifPointQunClicked:false,
            topShow:false,
            footerIndex:1,
            index:0
          }
      },
    methods:{
      showPointQun:function(){
        this.ifPointQunClicked=true
      },
      closeWindow:function(){
        this.ifPointQunClicked=false
      },
      showAllCategory:function(){
        this.ifShowAllCategory= !this.ifShowAllCategory;
        var tentrance=$(".tentrance")[0];
        var clientWidth=document.documentElement.clientWidth;
        var remUnit=clientWidth/10
        var height=4.25*remUnit


        if( this.ifShowAllCategory){
          $(tentrance).animate({height:height+"px"})
        }else{
          $(tentrance).animate({height:"0px"})
        }

      }

    },
    created:function(){

    },
    mounted:function(){

      var ctx=this;
      var $contentView=$(".contentView");
      var clientWidth=document.documentElement.clientWidth;
      var remUnit=clientWidth/10
      var clientHeight=document.documentElement.clientHeight/remUnit;
      var minHeight=clientHeight-1-0.267-1.34;
      $contentView.css({"height":minHeight+"rem"})
    }
  }
</script>
<style scoped>
  body{max-width:1242px;min-width: 320px;margin:0 auto;font-family: "微软雅黑", "宋体", Arial, sans-serif}
  .view{width:10rem;overflow: auto;position: relative;margin:0 auto}
  #content{position: relative;width:100%;margin-bottom:1.33rem;}
  #content>section>div{position: relative;width:100%;overflow: hidden}
  .contentView{width:100%;padding:0.333rem 0.267rem;overflow: auto}
  .page-infinite-loading {
    width: 100%;
    height: 1rem;
    background-color: #fff;
  }
  .page-infinite-loading .loadingCon {
    width: 50%;
    height: 1rem;
    margin: 0 auto;
  }
</style>
