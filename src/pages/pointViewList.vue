<template>
  <div class="view">
    <top-fixed v-on:closetop="closeTopFixed"></top-fixed>
    <div id="content" :style="{display:ifShow}">
      <section data-group="2">
        <slide-banner></slide-banner>
        <div class="container">
          <div class="latestWebCourse">
            <div class="categoryList">
              <div class="categories fl">
                <a :class="{current:navIndex==5}" @click="changeNav(5)">全部</a>
                <a :class="{current:navIndex==2}" @click="changeNav(2)">最新</a>
                <a :class="{current:navIndex==4}" @click="changeNav(4)">特价</a>
                <a :class="{current:navIndex=='cs_studynum'}" @click="changeNav('cs_studynum')">排行</a>
                <a :class="{current:navIndex==3}" @click="changeNav(3)"><span class="point"></span>周热课</a>
              </div>
              <div class="forcategory fl" @click="showCategories">
                分类
              </div>
            </div>
            <div class="contentView page-infinite-wrapper">
              <course-list :course-list="latestCourse" :if-index="ifIndex"
                           :if-point-url="'read'"
                           v-infinite-scroll="loadMore"
                           infinite-scroll-disabled="loading"
                           :infinite-scroll-distance="footerHeight"
              ></course-list>
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
    <div id="category" :style="{display:ifShow}">
      <div class="categoryTitle">
        <span class="closeIcon fl" @click="closeCategories"></span>
        课程分类
      </div>
      <div class="searchBox" @click="showSearchBox">请输入要查找的课程或者讲师</div>
      <div class="categories">
        <ul>
          <li class="categoryItem fl bottomSix" v-for="(item,index) in categories" v-bind:class="{right:index%2==1,bottomBold:(index+2)%8==0||(index+1)%8==0}"
              @click="searchCategory(item.cgId,item.cgName)">
            <span class="cateIcon fl" :style="{background:'url('+'http://image.zfwx.com'+item.cgIcon+') no-repeat center center'}"></span>
            <p v-cloak>{{item.cgName}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div id="searchPage">
      <div class="searchDiv">
        <span class="closeSearchIcon fl" @click="closeSearchPage"></span>
        <input type="text" class="searchText fl" id="searchInput" v-model="searchText" placeholder="请输入要查找的课程或讲师">
        <span class="searchBtn fl" @click="searchCourses">搜索</span>
      </div>
      <div class="searchResult" v-show="ifSearched">
        <p class="resultTT" v-show="hasResult">为您找到以下课程</p>
        <div class="contentViews page-infinite-wrapper">
          <course-list v-show="hasResult" :course-list="resultList" :if-index="ifIndex"
                       :if-point-url="'read'"
                       v-infinite-scroll="loadMoreCg"
                       infinite-scroll-disabled="loadingCg"
                       infinite-scroll-distance="10"
          ></course-list>
          <div  v-show="loadingCg" class="page-infinite-loading">
            <div class="loadingCon">
              <span  class="loadingIcon fl"></span>
              <span class="fl">加载中...</span>
            </div>
          </div>

          <div class="noResultContainer" v-show="!hasResult">
            <img src="../assets/imgs/noResult.png" class="noResult">
            <router-link class="chooseLessonBtn" to="/chooseCourseForm">我要点课</router-link>
          </div>
        </div>
      </div>
    </div>

    <footer-fixed :footer-index="footerIndex"></footer-fixed>
  </div>
</template>


<script>
  import TopFixed from '../components/TopFixed.vue'
  import SlideBanner from '../components/SlideBanner.vue'
  import CourseList from '../components/CourseList.vue'
  import FooterFixed from '../components/FooterFixed.vue'

  export default{
      data(){
          return {
            url:URL+"/findcs.json?domain=0&type=5&csType=0&isFirm=1",
            pageSize:7,
            loading: false,
            pageNo:1,
            ifLoadingCg:true,
            pageNoCg:1,
            urlCg:"",
            loadingCg:false,
            footerHeight:"85",
            ifLoading:true,
            navIndex:"5",//导航
            ifIndex:false,//是否首页
            latestCourse:[],//最新网课
            categories:[],
            resultList:[],//搜索结果
            ifShow:"block",
            index:0,
            footerIndex:100,
            hasResult:false,
            searchText:"",
            ifSearched:false,
          }
      },
    components:{
      TopFixed,
      SlideBanner,
      FooterFixed,
      CourseList
    },
    methods:{
      closeTopFixed:function(){
        /* global $ */
        var $content=$("#content")
        $content.css("marginTop","0")
      },
      searchCategory:function(cgId,cgName){
        /* global $ */
        var $body = $('body');
        document.title = cgName;
        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        $iframe.on('load',function() {
          setTimeout(function() {
            $iframe.off('load').remove();
          }, 0);
        }).appendTo($body);
        var ctx=this;
        var $searchPage=$("#searchPage");
        var clientHeight=document.documentElement.clientHeight;
        $searchPage.animate({height:clientHeight+"px"})
        this.ifShow="none"
        ctx.pageNoCg=1;
        ctx.ifLoadingCg=true;
        ctx.ifSearched=true;
        ctx.urlCg=URL+"/findcs.json?domain=0&csType=0&isFirm=1&pageSize="+ctx.pageSize+"&type="+cgId
        ctx.$http.get(ctx.urlCg).then(response=>{
          ctx.resultList=response.body.list;
        if(ctx.resultList.length<ctx.pageSize){
          ctx.ifLoadingCg=false;
        }
        if(ctx.resultList.length>0){
          ctx.hasResult=true;
        }else{
          ctx.hasResult=false;
        }

      },response=>{})

      },
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
              ctx.latestCourse.push(itemList[i])
            }
            ctx.loading = false;
          },2500)

        },response=>{})
        }
      },
      loadMoreCg:function(){
        var ctx=this;
        var itemList=[];
        if(ctx.urlCg==""){
          return
        }else{
          if(ctx.ifLoadingCg){
            ctx.pageNoCg++;
            ctx.loadingCg = true;
            ctx.$http.get(ctx.urlCg+"&pageNo="+ctx.pageNoCg).then(response=>{
              itemList=response.body.list;
            if(itemList.length<ctx.pageSize){
              ctx.ifLoadingCg=false;
            }
            setTimeout(function(){
              for(let i=0;i<itemList.length;i++){
                ctx.resultList.push(itemList[i])
              }
              ctx.loadingCg = false;
            },2500)
          },response=>{})
          }
        }

      },
      showCategories:function(){
        /* global $ */
        var ctx=this;
        ctx.$http.get(URL+"/findcg.json").then(response=>{
          ctx.categories=response.body;
      },response=>{})


        var $category=$("#category");
        var clientHeight=document.documentElement.clientHeight;
        $category.animate({height:clientHeight+"px"})

      },
      closeCategories:function(){
        /* global $ */
        var $category=$("#category");
        $category.animate({height:"0px"})
        var $body = $('body');
        document.title = '律所网校';
        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        $iframe.on('load',function() {
          setTimeout(function() {
            $iframe.off('load').remove();
          }, 0);
        }).appendTo($body);
      },
      showSearchBox:function(){
        /* global $ */
        var $searchPage=$("#searchPage");
        var clientHeight=document.documentElement.clientHeight;
        $searchPage.animate({height:clientHeight+"px"})
        this.ifShow="none"
      },
      closeSearchPage:function(){
        /* global $ */
        var $searchPage=$("#searchPage");
        $searchPage.animate({height:"0"})
        this.ifShow="block"
      },
      searchCourses:function(){
        var ctx=this;
        ctx.ifSearched=true;
        ctx.$http.get(URL+"/findcs.json?searchkey="+ctx.searchText+"&pageSize=20").then(response=>{
             ctx.resultList=response.body.list;
            if(ctx.resultList.length>0){
              ctx.hasResult=true;
            }else{
              ctx.hasResult=false;
            }

      },response=>{})




      },
      changeNav:function(index){
        var ctx=this;
        ctx.pageNo=1;
        ctx.ifLoading=true;
          ctx.navIndex=index;
            if(index=="cs_studynum"){
                ctx.url=URL+"/findcs.json?domain=0&csType=0&isFirm=1&pageSize="+ctx.pageSize+"&orderby="+index
            }else{
                ctx.url=URL+"/findcs.json?domain=0&csType=0&isFirm=1&pageSize="+ctx.pageSize+"&type="+index
            }
        ctx.$http.get(ctx.url).then(response=>{
          ctx.latestCourse=response.body.list;
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
      var $contentViews=$(".contentViews");
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
      var minHeight2=clientHeight-2.2
      ctx.footerHeight=1.34*remUnit+10
      $contentView.css({"height":minHeight+"rem"})
      $contentViews.css({"height":minHeight2+"rem"})
      ctx.url=ctx.url+"&pageSize="+ctx.pageSize;
      /*最新网课*/
      ctx.$http.get(ctx.url).then(response=>{
        ctx.latestCourse=response.body.list;
    },response=>{})

    }
  }
</script>
<style scoped>
  body{max-width:1242px;min-width: 320px;margin:0 auto;font-family: "微软雅黑", "宋体", Arial, sans-serif}
  .view{width:10rem;overflow: auto;position: relative;margin:0 auto}
  #content{position: relative;width:100%;margin-bottom:1.33rem;}
  #content>section>div{position: relative;width:100%;overflow: hidden}
  .contentView{width:100%;padding:0.333rem 0.267rem;overflow: auto}
  /*点视列表*/
  .categoryList{width:100%;height:1rem;margin-top:0.267rem;padding:0 0.267rem;background-color: #fff}
  .categoryList .categories{width:7rem;height:1rem;display:flex;justify-content: space-around}
  .categoryList .categories a{display:block;position:relative;height:1rem;line-height:1rem;padding:0 0.267rem;color:#acacac;font-size:0.373rem;}
  .categoryList .categories a.current{color:#53ddff}
  .categoryList .categories a span.point{display:block;position:absolute;right:0.1rem;top:0.3rem;height:10px;width:10px;border-radius: 50%;background-color: #4fc1e9}
  .categoryList .categories a span.networkIcon{display:block;height:100%;width:0.373rem;margin:0 10px;background: url(../assets/imgs/wxAll.png) no-repeat center center;background-size: contain}
  .categoryList .categories a span.progressIcon{display:block;height:100%;width:0.373rem;margin:0 10px;background: url(../assets/imgs/progress.png) no-repeat center center;background-size: contain}
  .categoryList .forcategory{width:2.4rem;height:1rem;line-height:1rem;text-align:right;padding-right:0.2rem;color:#5c5c5c;font-size:0.373rem;background: url("../assets/imgs/pointfor.png") no-repeat center right}
  /*分类搜索*/
  #category{position: fixed;bottom:0;width:10rem;background-color:#fff;z-index:3;height:0;overflow: scroll}
  .categoryTitle{width:100%;height:1.07rem;font-size:0.4rem;color:#333;line-height:1.07rem;text-align:center}
  .categoryTitle .closeIcon{display:block;width:0.4rem;height:100%;background: url("../assets/imgs/close.jpg") no-repeat center center;background-size: contain;margin-left:0.4rem;}
  .searchBox{width:8rem;height:0.893rem;border-radius: 5px;margin:0.227rem auto 0.373rem auto;font-size:0.347rem;background-color: #f5f5f5;line-height:0.893rem;text-align:center;color:#cecece}
  .categories{overflow: auto;width:100%}
  .categories ul{overflow: auto;width:10rem;margin:0 auto;background-color:#f7f7f7}
  .categories ul li{width:50%;padding-left:1.5rem;height:1.2rem;background-color: #fff}
  .categories ul li.right{padding-left:0.84rem;}
  .bottomSix{border-bottom:6px solid #f7f7f7}
  .bottomBold{margin-bottom: 6px}
  .categories ul li span.cateIcon{width:0.933rem;height:1.2rem;}
  .categories ul li p{overflow: hidden;font-size:0.4rem;color:#000;line-height:1.2rem;}

  .view>#searchPage{position:fixed;bottom:0;overflow: scroll;width:10rem;height:0px;background-color: #f7f7f7;z-index:4}
  .view>#searchPage .searchDiv{overflow: auto;width:100%;height:1.53rem;padding:0.253rem 0.227rem;background-color: #fff}
  .view>#searchPage .searchDiv .closeSearchIcon{display:block;width:0.373rem;height:100%;margin-right:0.24rem;background: url("../assets/imgs/searchClose.png") no-repeat center center;background-size: contain}
  .view>#searchPage .searchDiv .searchText{display:block;width:7.3rem;height:1.04rem;padding-left:0.46rem;margin-right:0.16rem;background-color:#f2f2f2;color: #999;font-size:0.373rem;border-radius:10px;outline: none;border:none}
  .view>#searchPage .searchDiv .searchBtn{display:block;width:1.3rem;height:1.04rem;line-height:1.04rem;text-align:center;font-size:0.43rem;border-radius: 10px;color:#fff;background-color: #53ddff;}
  #searchPage .searchResult{width:100%;}
  #searchPage .searchResult .resultTT{width:100%;height:0.9rem;line-height:1rem;color:#999;font-size:0.373rem;padding-left:0.36rem;}
  #searchPage .searchResult .noResultContainer{width:100%;overflow: auto}
  #searchPage .searchResult img.noResult{display:block;width:5.6rem;height:4.4rem;margin:2.5rem auto 0.5rem auto}
  #searchPage .searchResult .chooseLessonBtn{display:block;width:3.57rem;height:1.05rem;margin:0 auto;line-height:1.07rem;text-align:center;color:#fff;font-size:0.35rem;background-color: #53ddff;border-radius:5px;}
  /*加载*/
  .page-infinite-wrapper{overflow: scroll;-webkit-overflow-scrolling:touch;-moz-overflow-scrolling:touch;-o-overflow-scrolling:touch;}
  .page-infinite-loading{width:100%;height:1rem;background-color: #fff}
  .page-infinite-loading .loadingCon{width:50%;height:1rem;margin:0 auto}
  .page-infinite-loading span{display:block;height:1rem;line-height:1rem;font-size:0.4rem;}
  .page-infinite-loading .loadingIcon{width:1rem;background: url("../assets/imgs/loading.gif") no-repeat center center;background-size: 50%}
</style>
