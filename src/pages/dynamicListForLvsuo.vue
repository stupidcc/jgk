<template>
  <div class="view">
    <div id="content">
      <section data-group="2">
        <lvsuo-top :lvsuo="lvsuoObj"></lvsuo-top>
        <div class="container">
          <div class="latestWebCourse">
            <div class="categoryList">
              <div class="categories fl">
                <a :class="{current:navIndex==0}" @click="changeNav(0)">全部</a>
                <a :class="{current:navIndex==1}" @click="changeNav(1)">点睛</a>
                <a :class="{current:navIndex==2}" @click="changeNav(2)">律协</a>
                <a :class="{current:navIndex==3}" @click="changeNav(3)">律所</a>
              </div>
              <div class="filter" @click="filterData">
                <span class="filterIcon fr"></span>
                <span class="info fr">过滤</span>
              </div>
            </div>
            <div class="filterDiv" v-show="ifFilter">
              <span class="triangle"></span>
              <div class="filterInfo">
                <p @click="doFilter('popular')">人气最高<span class="popularIcon fr"></span></p>
                <p  @click="doFilter('newest')">最新发布<span class="newestIcon fr"></span></p>
              </div>
            </div>
            <div class="contentView page-infinite-wrapper">
              <dynamic-list :dynamic-list="dynamicList"
                            entry="lvsuo"
                            :lvsuoId="lvsuoObj.id"
                            v-infinite-scroll="loadMore"
                            infinite-scroll-disabled="loading"
                            :infinite-scroll-distance="footerHeight"
              ></dynamic-list>
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
  import DynamicList from '../components/DynamicList.vue'
  import FooterFixed from '../components/FooterFixed.vue'
  import LvsuoTop from '../components/LvsuoTop.vue'


  export default{
    data(){
      return {
        loading: false,
        dynamicList:[],
        navIndex:0,
        ifFilter:false,
        ifShow:"block",
        index:0,
        footerIndex:1,
        hasResult:false,
        searchText:"",
        ifSearched:false,
        ifLoading:true,
        orderType:"",//排序方式
        url:URL+"/getDjLXNotices.json?domain=0",//记录请求的接口
        pageNo:1,
        footerHeight:"85",
        pageSize:7,
        lvsuoObj:"",
        orgid:""
      }
    },
    components:{
      FooterFixed,
      LvsuoTop,
      DynamicList
    },
    methods:{
      changeNav:function(index){
        var ctx=this;
        ctx.pageNo=1;
        ctx.ifLoading=true;
        ctx.navIndex=index;
        ctx.url=URL+"/getDjLXNotices.json?domain=0&pageSize="+ctx.pageSize+"&type="+ctx.navIndex+"&orgId="+ctx.orgid
        if(ctx.navIndex==0){
          ctx.url=URL+"/getDjLXNotices.json?domain=0&pageSize="+ctx.pageSize+"&orgId="+ctx.orgid
        }

        ctx.$http.get(ctx.url).then(response=>{
          ctx.dynamicList=response.body.result.data;
      },response=>{})
      },
      filterData:function () {
        var ctx=this;
        ctx.ifFilter=true;
      },
      doFilter:function(flag){
        var ctx=this;
        ctx.pageNo=1;//初始化数据
        ctx.ifLoading=true,//初始化数据
          ctx.orderType=flag;
        ctx.ifFilter=false;//隐藏过滤弹窗

        if(flag=="popular"){//人气最高
          if(ctx.url.indexOf("browse")>0){
          }else{
            ctx.url=ctx.url+"&browse=1";
          }
        }else{//最新发布
          if(ctx.url.indexOf("browse")>0){
            var array=ctx.url.split("&browse=1")
            ctx.url=array[0]+array[1]
          }
        }
        ctx.$http.get(ctx.url).then(response=>{
          ctx.dynamicList=response.body.result.data;
      },response=>{})
      },

      loadMore() {
        var ctx=this;
        var resultList=[];
        if(ctx.ifLoading){
          ctx.pageNo++;
          ctx.loading = true;
          ctx.$http.get(ctx.url+"&pageNo="+ctx.pageNo+"&orgId="+ctx.orgid).then(response=>{
            resultList=response.body.result.data;
          if(resultList.length<ctx.pageSize){
            ctx.ifLoading=false;
          }
          setTimeout(function(){
            for(let i=0;i<resultList.length;i++){
              ctx.dynamicList.push(resultList[i])
            }
            ctx.loading = false;
          },2500)

        },response=>{})
        }
      }
    },
    mounted:function(){
      /* global $ */
      var ctx=this;
       ctx.$http.get(URL+"/getlawyerfirm.json?id="+this.$route.params.id).then(response=>{
          ctx.lvsuoObj=response.body;
          ctx.orgid=response.body.orgid;
          ctx.url=ctx.url+"&pageSize="+ctx.pageSize+"&orgId="+ctx.orgid
          ctx.$http.get(ctx.url).then(response=>{
               ctx.dynamicList=response.body.result.data;
          },response=>{})
       },response=>{})
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
    }
  }
</script>
<style scoped>
  body{max-width:1242px;min-width: 320px;margin:0 auto;font-family: "微软雅黑", "宋体", Arial, sans-serif}
  .view{width:10rem;overflow: auto;position: relative;margin:0 auto}
  #content{position: relative;width:100%;margin-bottom:1.33rem;}
  #content>section>div{position: relative;width:100%;overflow: hidden}
  .latestWebCourse{position:relative}
  .latestWebCourse .filterDiv{position:absolute;height:2.454rem;width:3.373rem;overflow: hidden;right:0.18rem;top:0.89rem;z-index:1;}
  .latestWebCourse .filterDiv .triangle{display:block;position:absolute;right:0.7rem;height:0;width:0;border-left:0.08rem solid transparent;border-right: 0.08rem solid transparent;border-bottom:0.08rem solid #000 }
  .latestWebCourse .filterDiv .filterInfo{display:block;position:absolute;top:0.08rem;height:2.374rem;width:100%;padding:0.32rem 0 0.133rem 0;background-color: rgba(0,0,0,.6);border-radius: 5px;}
  .latestWebCourse .filterDiv .filterInfo p{width:100%;padding-left:0.4rem;height:0.947rem;line-height:0.947rem;font-size:0.373rem;color:#fff;}
  .latestWebCourse .filterDiv .filterInfo p span{display:block;width:0.427rem;height:100%;margin-right:0.5rem}
  .latestWebCourse .filterDiv .filterInfo p span.popularIcon{background: url("../assets/imgs/sort.png") no-repeat center center;background-size: contain}
  .latestWebCourse .filterDiv .filterInfo p span.newestIcon{background: url("../assets/imgs/newest.png") no-repeat center center;background-size: contain}
  .categoryList .filter{overflow: hidden;height:1rem;line-height:1rem;color:#acacac;font-size:0.373rem;}
  .filterIcon{display:block;height:1rem;width:0.387rem;margin-left:0.13rem;background: url("../assets/imgs/funnel.png") no-repeat center center;background-size: contain}
  .contentView{width:100%;padding:0.333rem 0.267rem;overflow: auto}
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
