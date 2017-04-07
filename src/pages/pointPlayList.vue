<template>
  <div class="view">
    <top-fixed v-on:closetop="closeTopFixed"></top-fixed>
    <div id="content">
      <section data-group="2">
        <slide-banner></slide-banner>
        <div class="container">
          <div class="latestWebCourse">
            <div class="categoryList">
              <div class="categories fl">
                <a :class="{current:navIndex=='all'}" @click="changeNav('all')">全部</a>
                <a :class="{current:navIndex==0}" @click="changeNav(0)">将开始</a>
                <a :class="{current:navIndex==1}" @click="changeNav(1)">在直播</a>
                <a :class="{current:navIndex==2}" @click="changeNav(2)">看往期</a>
              </div>
            </div>
            <div class="contentView">
              <view-course-list :view-list="viewList"
                                v-on:showdwonapp="showDownApp"
                                v-infinite-scroll="loadMore"
                                infinite-scroll-disabled="loading"
                                :infinite-scroll-distance="footerHeight"
              ></view-course-list>
              <div  v-show="loading" class="page-infinite-loading">
                <div class="loadingCon">
                  <span  class="loadingIcon fl"></span>
                  <span class="fl">加载中...</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
    <footer-fixed :footer-index="footerIndex"></footer-fixed>

    <div class="fixed-background"v-show="ifDownApp" @click="closeWindow"></div>
    <div class="pointqun" v-show="ifDownApp">
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
  import ViewCourseList from '../components/ViewCourseList.vue'
  import FooterFixed from '../components/FooterFixed.vue'

  export default{
      data(){
          return {
            url:URL+"/findcs.json?domain=0&csType=3",
            pageSize:7,
            loading: false,
            pageNo:1,
            footerHeight:"85",
            ifLoading:true,
            navIndex:"all",//导航
            index:0,
            ifDownApp:false,
            footerIndex:100,
            viewList:[],
          }
      },
      components:{
      TopFixed,
      SlideBanner,
        FooterFixed,
      ViewCourseList
    },
      methods:{
        loadMore() {
          var ctx=this;
          var itemList=[];
          if(ctx.ifLoading){
            ctx.pageNo++;
            ctx.loading = true;
            ctx.$http.get(ctx.url+"&pageNo="+ctx.pageNo).then(response=>{
               itemList=response.body.list;
            if(itemList.length<ctx.pageSize){
              ctx.ifLoading=false;
            }
            setTimeout(function(){
              for(let i=0;i<itemList.length;i++){
                 ctx.viewList.push(itemList[i])
              }
              ctx.loading = false;
            },2500)
          },response=>{})
          }
        },
        showDownApp:function(){
            this.ifDownApp=true
        },
        closeTopFixed:function(){
          /* global $ */
          var $content=$("#content")
          $content.css("marginTop","0")
        },
        changeNav:function(index){
          var ctx=this;
          ctx.pageNo=1;
          ctx.ifLoading=true;
          ctx.navIndex=index;
          if(index=="all"){
            ctx.url=URL+"/findcs.json?domain=0&csType=3&pageSize="+ctx.pageSize
          }else{
            ctx.url=URL+"/findcs.json?domain=0&csType=3&pageSize="+ctx.pageSize+"&csLiveStatus="+index
          }
          ctx.$http.get(ctx.url).then(response=>{
            ctx.viewList=response.body.list;
        },response=>{})
        }
    },
      mounted:function(){
        /* global $ */
        var $content=$("#content")
        var topShow=sessionStorage.getItem("topShow")
        if(null==topShow||topShow=="true"){
          $content.css("marginTop","100px")
        }
         var ctx=this;
         var $contentView=$(".contentView");
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
         var clientHeight=document.documentElement.clientHeight/remUnit;
         var minHeight=clientHeight-3.52-1-0.267-1.34
         ctx.footerHeight=1.34*remUnit+10
         $contentView.css({"height":minHeight+"rem"})
         ctx.url=ctx.url+"&pageSize="+ctx.pageSize;
           ctx.$http.get(ctx.url).then(response=>{
               ctx.viewList=response.body.list;
           },response=>{})
       }
  }
</script>
<style scoped>
  body{max-width:1242px;min-width: 320px;margin:0 auto;font-family: "微软雅黑", "宋体", Arial, sans-serif}
  .view{width:10rem;overflow: auto;position: relative;margin:0 auto}
  #content{position: relative;width:100%;margin-bottom:1.33rem;}
  #content>section>div{position: relative;width:100%;overflow: hidden}
  .contentView{width:100%;padding:0.333rem 0.267rem;overflow: auto;}
  .categoryList{width: 100%;height: 1rem;margin-top: .267rem;padding: 0 .267rem;background-color: #fff;}
  .categoryList .categories{width: 7rem;height: 1rem;display: flex;justify-content: space-around;}
  .categoryList .categories a.current{color: #53ddff;}
  .categoryList .categories a{display: block;position: relative;height: 1rem;line-height: 1rem;padding: 0 .267rem;color: #acacac;font-size: .373rem;}

  /*加载*/
  .page-infinite-wrapper{overflow: scroll;-webkit-overflow-scrolling:touch;-moz-overflow-scrolling:touch;-o-overflow-scrolling:touch;}
  .page-infinite-loading{width:100%;height:1rem;background-color: #fff}
  .page-infinite-loading .loadingCon{width:50%;height:1rem;margin:0 auto}
  .page-infinite-loading span{display:block;height:1rem;line-height:1rem;font-size:0.4rem;}
  .page-infinite-loading .loadingIcon{width:1rem;background: url("../assets/imgs/loading.gif") no-repeat center center;background-size: 50%}


</style>
