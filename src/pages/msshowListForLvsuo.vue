<template>
  <div class="container">
    <div id="content">
      <lvsuo-top :lvsuo="lvsuoObj"></lvsuo-top>
      <div class="latestWebCourse">
        <div class="categoryList">
          <div class="categories fl">
            <a class="point" v-for="(item,index) in msTabsNames" @click="msTabsListClick(item, index)" :class="{'current':item.active}">
              <span class="fl">{{item.select}}</span>
              <span v-show="item.ticon" class="networkIcon fl"></span>
            </a>
          </div>
        </div>
        <div class="taball" v-show="tabShow">
          <ul class="taball-ul clearfix">
            <li><a href="javascript:void(0);" class="tab-icon01" @click="msTabs2ListClick(0)">
              <img src="../assets/imgs/icon-ms01.png"><p>点睛</p>
            </a></li>
            <li><a href="javascript:void(0);" class="tab-icon02" @click="msTabs2ListClick(1)">
              <img src="../assets/imgs/icon-ms02.png"><p>律协</p>
            </a></li>
            <li><a href="javascript:void(0);" class="tab-icon03" @click="msTabs2ListClick(3)">
              <img src="../assets/imgs/icon-ms03.png"><p>律所</p>
            </a></li>
          </ul>
          <div class="taball-tab2" style="display:none">
            <ul>
              <li><a href="javascript:void(0);">班级</a></li>
              <li><a href="javascript:void(0);">班级</a></li>
              <li><a href="javascript:void(0);">班级</a></li>
            </ul>
          </div>
        </div>
        <div class="contentView  page-infinite-wrapper">
          <div :msstatusF='msdata' :is='msView' v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" :infinite-scroll-distance="footerHeight"></div>
          <div  v-show="loading" class="page-infinite-loading">
            <div class="loadingCon">
              <span  class="loadingIcon fl"></span>
              <span class="fl">加载中...</span>
            </div>
          </div>

        </div>
      </div>
      <footer-fixed :footer-index="footerIndex"></footer-fixed>
    </div>

  </div>
</template>
<style scoped>
  /*@import '../assets/css/msModule.css';*/
  .container{width:10rem;margin:0 auto}
  .latestWebCourse{padding:0 0 1.34rem 0;}
  .categoryList{width:100%;height:1rem;margin-top:0.267rem;padding:0 0.267rem;background-color: #fff}
  .categoryList{margin-top:0; }
  .categoryList .categories{width:8rem;height:1rem;display:flex;justify-content: space-around}
  .categoryList .categories a{display:block;position:relative;height:1rem;line-height:1rem;padding:0 0.1rem;color:#acacac;font-size:0.373rem;}
  .categoryList .categories a.current{color:#53ddff}
  .categoryList .categories a span.point{position:absolute;right:0.1rem;top:0.3rem;height:10px;width:10px;border-radius: 50%;background-color: #4fc1e9}
  .categoryList .categories a span.networkIcon{height:100%;width:0.373rem;margin:0 10px;background: url(../assets/imgs/wxAll.png) no-repeat center center;background-size: contain}
  .categoryList .categories a.current span.networkIcon{background: url("../assets/imgs/currentCondition.png") no-repeat center center;background-size: contain}
  .categoryList .categories a span.progressIcon{height:100%;width:0.373rem;margin:0 10px;background: url(../assets/imgs/progress.png) no-repeat center center;background-size: contain}
  .categoryList .forcategory{width:2.4rem;height:1rem;line-height:1rem;text-align:right;padding-right:0.2rem;color:#5c5c5c;font-size:0.373rem;background: url("../assets/imgs/pointfor.png") no-repeat center right}
  .categoryList .categories a span{float: left;}
  /*加载*/
  .page-infinite-wrapper{overflow: scroll;-webkit-overflow-scrolling:touch;-moz-overflow-scrolling:touch;-o-overflow-scrolling:touch;}
  .page-infinite-loading{width:100%;height:1rem;background-color: #fff}
  .page-infinite-loading .loadingCon{width:50%;height:1rem;margin:0 auto}
  .page-infinite-loading span{display:block;height:1rem;line-height:1rem;font-size:0.4rem;}
  .page-infinite-loading .loadingIcon{width:1rem;background: url("../assets/imgs/loading.gif") no-repeat center center;background-size: 50%}
  /* 点击全部 */
  .taball{background: #fff;}
  .taball-ul{margin: 0 auto;font-size: 0.373rem;padding:0.2rem 0;border-top: 1px solid #dcdcdc;}
  .taball-ul li{width: 33%;float: left;}
  .taball-ul li a{display: block;text-align: center;}
  .taball-tab2{background: #4b5257;}
  .taball-tab2 ul{color: #acacac;font-size: 0.267rem}
  .taball-tab2 ul li{}
  .taball-tab2 ul li a{color: #acacac;}
</style>
<script>
  import Vue from 'vue'
  import MshowCourseList from '../components/MshowCourseList2.vue';
  import FooterFixed from '../components/FooterFixed.vue'
  import LvsuoTop from '../components/LvsuoTop.vue'
  export default {
    data() {
      return {
        msView:MshowCourseList,
        msType:'',
        msstatus:'',
        orgtype:"",
        msdata:[],
        current:false,
        footerIndex:100,
        msTabsNames:[
          {select:'全部',status:'',ticon:true},
          {select:'报名中',status:'0',active:true},
          {select:'教学中',status:'1'},
          {select:'已结业',status:'2'}
        ],
        tabShow:false,
        slideIndex:0,
        imgs:[],
        url:URL+"/getFacetofaces.json",
        pageSize:10,
        loading: false,
        pageNo:1,
        ifLoading:true,
        footerHeight:"85",
        lvsuoObj:"",
        orgid:""
      }
    },
    components: {
      MshowCourseList,
      LvsuoTop,
      FooterFixed
    },
    methods: {
      //切换tab
      msTabsListClick:function(item,index){
        var _self=this;
        _self.msstatus=item.status;
        if(item.select!="全部"){
          _self.msView=MshowCourseList;
          _self.msGetData();
        }else{
          if(_self.tabShow){
            _self.tabShow=false;
            _self.orgtype="";
          }else{
            _self.tabShow=true;
          }
        }
        _self.$nextTick(function(){
          _self.msTabsNames.forEach(function(item){
            Vue.set(item,'active',false);
          })
          Vue.set(item,'active',true);
        });

      },
      msTabs2ListClick:function(orgtypes){
        var _self=this;
        _self.orgtype=orgtypes;
        _self.msView=MshowCourseList;
        _self.msGetData();
      },
      //切换数据加载
      msGetData:function(){
        var ctx=this;
        ctx.loading = true;
        ctx.pageNo=1;
        ctx.msdata=[]
        ctx.$http.get(ctx.url+"?pageSize="+ctx.pageSize+"&pageNo="+ctx.pageNo+"&status="+ctx.msstatus+"&orgType="+ctx.orgtype+"&orgId="+ctx.orgid).then(response=>{
          ctx.msdata=response.body.result.data;
        console.info(ctx.msdata);
        ctx.loading = false;
      },response=>{})
      },
      //下拉加载
      loadMore:function(){
        var ctx=this;
        var itemList=[];
        if(ctx.ifLoading){
          ctx.pageNo++;
          ctx.loading = true;
          ctx.$http.get(ctx.url+"?pageSize="+ctx.pageSize+"&pageNo="+ctx.pageNo+"&status="+ctx.msstatus+"&orgType="+ctx.orgtype+"&orgId="+ctx.orgid).then(response=>{
            console.info(response.body.result.data);
          itemList=response.body.result.data;
          if(itemList.length<ctx.pageSize){
            ctx.ifLoading=false;
          }
          setTimeout(function(){
            for(let i=0;i<itemList.length;i++){
              ctx.msdata.push(itemList[i])
            }
            ctx.loading = false;
          },2500)
        },response=>{})
        }
      }
    },
    //初始化
    mounted(){
      /* global $ */
      var ctx=this;
      ctx.$http.get(URL+"/getlawyerfirm.json?id="+this.$route.params.id).then(response=>{
          ctx.lvsuoObj=response.body;
          ctx.orgid=response.body.orgid;
          ctx.msGetData()
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
      $contentView.css({"height":minHeight+"rem"});

    }
  }
</script>


