<template>
  <div class="view">

    <div id="content" :style="{display:ifShow}">
      <section data-group="2">
        <lvsuo-top :lvsuo="lvsuoObj"></lvsuo-top>
        <div class="container">
          <div class="latestWebCourse">
            <div class="categoryList">
              <div class="categories fl">
                <a :class="{current:navIndex=='all'}" class="fl" @click="changeNav('all')">点睛</a>
                <a :class="{current:navIndex==lvsuoObj.extOne}" class="fl" @click="changeNav(lvsuoObj.extOne)">{{lvsuoObj.extOne}}讲师</a>
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
    <footer-fixed :footer-index="footerIndex"></footer-fixed>

  </div>
</template>
<script>
  import LvsuoTop from '../components/LvsuoTop.vue'
  import CourseList from '../components/CourseList.vue'
  import FooterFixed from '../components/FooterFixed.vue'

  export default{
    data(){
      return{
        url:URL+"/findcs.json?domain=0&csType=1",
        pageSize:7,
        loading: false,
        pageNo:1,
        footerHeight:"85",
        ifLoading:true,
        ifShow:"block",
        index:0,
        resultList:[],//搜索结果
        hasResult:false,
        ifIndex:false,//是否首页
        searchText:"",
        ifSearched:false,
        footerIndex:100,
        categories:[],
        navIndex:"all",
        latestCourse:[],
        lvsuoObj:"",
        orgid:""
      }
    },
    components:{
      LvsuoTop,
      FooterFixed,
      CourseList

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
              ctx.latestCourse.push(itemList[i])
            }
            ctx.loading = false;
          },2500)

        },response=>{})
        }
      },
      changeNav:function(index){
        var ctx=this;
        ctx.pageNo=1;
        ctx.ifLoading=true;
        ctx.navIndex=index;
        if(index=="all"){
          ctx.url=URL+"/findCsByTchPlace.json?domain=0&csType=1&isFirm=1&pageSize="+ctx.pageSize+"&orgId="+ctx.orgid
        }else{
          ctx.url=URL+"/findCsByTchPlace.json?domain=0&csType=1&isFirm=1&pageSize="+ctx.pageSize+"&searchkey="+index+"&orgId="+ctx.orgid
        }
        ctx.$http.get(ctx.url).then(response=>{
          ctx.latestCourse=response.body.list;
      },response=>{})
      }
    },
    mounted:function(){
      /* global $ */
      var ctx=this;
      ctx.$http.get(URL+"/getlawyerfirm.json?id="+this.$route.params.id).then(response=>{
        ctx.lvsuoObj=response.body;
        ctx.orgid=response.body.orgid;

        ctx.url=ctx.url+"&pageSize="+ctx.pageSize+"&orgId="+ctx.orgid
      /*最新网课*/
        ctx.$http.get(ctx.url).then(response=>{
            ctx.latestCourse=response.body.list;
        },response=>{})
    },response=>{})
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
      $contentView.css({"height":minHeight+"rem"})
      $contentViews.css({"height":minHeight2+"rem"})
      ctx.footerHeight=1.34*remUnit+10


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
  /*分类搜索*/
  .categories{overflow: auto;width:100%}
  .categories ul{overflow: auto;width:7rem;margin:0 auto;}
  .categories ul li{width:50%;height:1.2rem;}
  .categories ul li p{overflow: hidden;font-size:0.4rem;color:#000;line-height:1.2rem;}

  /*加载*/
  .page-infinite-wrapper{overflow: scroll;-webkit-overflow-scrolling:touch;-moz-overflow-scrolling:touch;-o-overflow-scrolling:touch;}
  .page-infinite-loading{width:100%;height:1rem;background-color: #fff}
  .page-infinite-loading .loadingCon{width:50%;height:1rem;margin:0 auto}
  .page-infinite-loading span{display:block;height:1rem;line-height:1rem;font-size:0.4rem;}
  .page-infinite-loading .loadingIcon{width:1rem;background: url("../assets/imgs/loading.gif") no-repeat center center;background-size: 50%}


</style>
