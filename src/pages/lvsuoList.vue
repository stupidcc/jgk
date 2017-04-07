<template>
  <div class="view">
    <top-fixed v-on:closetop="closeTopFixed"></top-fixed>
    <div id="content">
      <section data-group="1">
        <slide-banner></slide-banner>
        <div class="line3"></div>
        <div class="container">
          <div class="lvsuoWx">
            <div class="lvsuoCategories">
              <div class="categoryLeft fl">
                <a href="javascript:void(0)" class="all" :class="{current:navIndex=='all'}" @click="changeNav('all')">全部</a>
                <a href="javascript:void(0)" class="latest" :class="{current:navIndex=='latest'}"  @click="changeNav('latest')">最新</a>
                <a href="javascript:void(0)" class="popular" :class="{current:navIndex=='popular'}"  @click="changeNav('popular')">最热</a>
              </div>
              <div class="conditionRight fl">
                <a href="javascript:void(0)" :class="{current:ifLetterCondition}" @click="letterCondition"><span class="fl" >首字母</span>  <span class="conditionIcon fl"></span></a>
                <a href="javascript:void(0)" :class="{current:ifPlaceCondition}" @click="placeCondition"><span class="fl">地区</span>   <span class="conditionIcon fr"></span></a>
              </div>
            </div>
            <div class="allLetter">
              <ul>
                <li v-for="letter in letters" class="letterItem fl" @click="chooseLetter(letter)">{{letter}}</li>
              </ul>
            </div>
            <div class="allPlace">
              <ul>
                <li class="placeContainer" v-for="letterList in places">
                  <p class="placeLetter" v-cloak>{{letterList.letter}}</p>
                  <ul>
                    <li class="placeItem fl" v-for="placeItem in letterList.list" @click="choosePlace(placeItem.link)" v-cloak>{{placeItem.fullname}}</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="contentView page-infinite-wrapper">
              <lvsuo-list :lvsuo-list="lvsuoList"
                          v-infinite-scroll="loadMore"
                          infinite-scroll-disabled="loading"
                          :infinite-scroll-distance="footerHeight"
              ></lvsuo-list>
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
  import TopFixed from '../components/TopFixed.vue'
  import SlideBanner from '../components/SlideBanner.vue'
  import LvsuoList from '../components/LvsuoList.vue'
  import FooterFixed from '../components/FooterFixed.vue'

  export default{
    data(){
      return {
        url:URL+"/findlawyerfirm.json?domain=0",
        pageSize:7,
        loading: false,
        pageNo:1,
        footerHeight:"85",
        ifLoading:true,
        navIndex:"all",
        lvsuoList:[],
        places:[
          {"letter":"A",list:["北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特","北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特"]},
          {"letter":"B",list:["北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特","北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特"]},
          {"letter":"C",list:["北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特","北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特"]},
          {"letter":"D",list:["北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特","北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特"]},
          {"letter":"E",list:["北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特","北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特"]},
          {"letter":"F",list:["北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特","北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特"]},
          {"letter":"G",list:["北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特","北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特"]},
          {"letter":"H",list:["北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特","北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特"]},
          {"letter":"I",list:["北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特","北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特"]},
          {"letter":"J",list:["北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特","北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特"]},
          {"letter":"K",list:["北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特","北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特"]},
          {"letter":"L",list:["北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特","北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特"]},
          {"letter":"M",list:["北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特","北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特"]},
          {"letter":"N",list:["北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特","北京","上海","重庆","杭州","深圳","广州","广东","广西","西安","黑龙江","齐齐哈尔","呼和浩特"]}
        ],
        letters:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        ifLetterCondition:false,
        ifPlaceCondition:false,
        footerIndex:1,
        index:1
      }
    },
    components:{
      TopFixed,
      SlideBanner,
      FooterFixed,
      LvsuoList
    },
    methods:{
      loadMore() {
        var ctx=this;
        var resultList=[];
        if(ctx.ifLoading){
          ctx.pageNo++;
          ctx.loading = true;
          ctx.$http.get(ctx.url+"&pageNo="+ctx.pageNo).then(response=>{
            resultList=response.body.result.data;
          if(resultList.length<ctx.pageSize){
            ctx.ifLoading=false;
          }
          setTimeout(function(){
            for(let i=0;i<resultList.length;i++){
              ctx.lvsuoList.push(resultList[i])
            }
            ctx.loading = false;
          },2500)

        },response=>{})
        }
      },
      changeNav:function(navIndex){
          var ctx=this;
        ctx.pageNo=1;
        ctx.ifLoading=true;
          ctx.navIndex=navIndex;
          if(ctx.navIndex=="all"||ctx.navIndex=="latest"){
              ctx.url=URL+"/findlawyerfirm.json?domain=0&pageSize="+ctx.pageSize+"&orderBy='id'"
          }else{
             ctx.url=URL+"/findlawyerfirm.json?domain=0&pageSize="+ctx.pageSize+"&orderBy='wx_browse_num'"
          }
          ctx.$http.get(ctx.url).then(response=>{
            ctx.lvsuoList=response.body.result.data;
          },response=>{})
      },
      letterCondition:function(){
        /* global $ */
        this.ifLetterCondition= !this.ifLetterCondition;
        this.ifPlaceCondition=false;
        var $allLetter=$(".allLetter");
        var $placeContain=$(".allPlace");
        if(this.ifLetterCondition){
          $allLetter.animate({height:"4.89rem",padding:"0.347rem 0 0 0.44rem"})
          $placeContain.animate({height:"0",padding:"0"})
        }else{
          $allLetter.animate({height:"0",padding:"0"})
        }

      },
      chooseLetter:function(letter){
        /* global $ */
        var ctx=this;
        this.ifLetterCondition= !this.ifLetterCondition;
        this.ifPlaceCondition=false;
        var $allLetter=$(".allLetter");
        $allLetter.animate({height:"0",padding:"0"})
        ctx.$http.get(URL+"/findlawyerfirm.json?domain=0&pageNo=1&pageSize=10&searchPy="+letter).then(response=>{
           if(response.body.result.data){
              ctx.lvsuoList=response.body.result.data;
            }else{
              ctx.lvsuoList=[];
              }
          },response=>{})
          },
      placeCondition:function(){
        /* global $ */
        this.ifPlaceCondition=!this.ifPlaceCondition;
        this.ifLetterCondition=false;
        var $placeContain=$(".allPlace");
        var $allLetter=$(".allLetter");
        if(this.ifPlaceCondition){
          $placeContain.animate({height:"9rem",padding:"0.347rem 0 0 0.44rem"})
          $allLetter.animate({height:"0",padding:"0"})
        }else{
          $placeContain.animate({height:"0",padding:"0"})
        }
      },
      closeTopFixed:function(){
        /* global $ */
        var $content=$("#content")
        $content.css("marginTop","0")
      },
      choosePlace:function(link){
        /* global $ */
        var ctx=this;
        ctx.ifPlaceCondition= !ctx.ifPlaceCondition;
        ctx.ifLetterCondition=false;
        var $placeContain=$(".allPlace");
        $placeContain.animate({height:"0",padding:"0"})
        ctx.$http.get(URL+"/findlawyerfirm.json?domain=0&pageNo=1&pageSize=10&orderBy='id'&orgPid="+link).then(response=>{
          ctx.lvsuoList=response.body.result.data;
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
      ctx.url=ctx.url+"&pageSize="+ctx.pageSize+"&orderBy='id'";
      $contentView.css({"height":minHeight+"rem"})
      ctx.$http.get(ctx.url).then(response=>{
        ctx.lvsuoList=response.body.result.data;
    },response=>{})
      /*地区 kt 1开通 0 未开通 */
      ctx.$http.get(URL+"/findProvinceToMenu.json?type=1&kt=1").then(response=>{
        ctx.places=response.body.datas;
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

  /*机构网校*/
  .lvsuoWx .lvsuoCategories{margin-top:0.267rem;width:10rem;height:0.96rem;background-color: #fff}
  .lvsuoWx .lvsuoCategories>div{height:100%;}
  .lvsuoWx .lvsuoCategories>div.categoryLeft{width:6rem;display:flex}
  .lvsuoWx .lvsuoCategories>div.categoryLeft a{display:block;height:100%;line-height:0.96rem;padding:0 0.46rem;color:#acacac;font-size:0.373rem;}
  .lvsuoWx .lvsuoCategories>div.categoryLeft a.current{color:#4fc1e9;}
  .lvsuoWx .lvsuoCategories>div.categoryLeft a.popular{flex:1;}

  .lvsuoWx .lvsuoCategories>div.conditionRight{width:4rem;display:flex}
  .lvsuoWx .lvsuoCategories>div.conditionRight a{display:block;height:100%;line-height:0.96rem;color:#acacac;font-size:0.373rem;}
  .lvsuoWx .lvsuoCategories>div.conditionRight a.current{color:#4fc1e9}
  .lvsuoWx .lvsuoCategories>div.conditionRight a:first-of-type{flex:1}
  .lvsuoWx .lvsuoCategories>div.conditionRight a span.conditionIcon{display:block;width:0.35rem;margin:0 0.33rem 0 0.2rem;height:100%;background: url("../assets/imgs/wxAll.png") no-repeat center center;background-size: contain}
  .lvsuoWx .lvsuoCategories>div.conditionRight a.current span.conditionIcon{background: url("../assets/imgs/currentCondition.png") no-repeat center center;background-size: contain}
  .lvsuoWx .allLetter{position:fixed;width:10rem;top:4.747rem;height:0;overflow:hidden;background-color:rgba(255,255,255,0.88);z-index:2}
  .lvsuoWx .allLetter .letterItem{width:0.86rem;height:0.84rem;margin:0 0.33rem 0.267rem 0;line-height:0.84rem;text-align:center;font-size: 0.35rem;color:#5a5a5a;background-color:#fff;border:1px solid #c8c8c8}
  .lvsuoWx .allPlace{position:fixed;width:10rem;top:4.747rem;height:0;overflow:scroll;-webkit-overflow-scrolling:touch;-moz-overflow-scrolling:touch;-o-overflow-scrolling:touch;background-color:rgba(255,255,255,0.88);z-index:2}
  .lvsuoWx .allPlace .placeLetter{font-size:0.353rem;margin:0.1rem 0;color:#5a5a5a;}
  .lvsuoWx .allPlace .placeItem{height:0.83rem;line-height:0.83rem;padding:0 0.36rem;margin:0 0.5rem 0.24rem 0 ;font-size:0.35rem;color:#5a5a5a;border:1px solid #c8c8c8;background-color: #fff}
  .lvsuoWx .allPlace .placeContainer{overflow: auto}
  /*加载*/
  .page-infinite-wrapper{overflow: scroll;-webkit-overflow-scrolling:touch;-moz-overflow-scrolling:touch;-o-overflow-scrolling:touch;}
  .page-infinite-loading{width:100%;height:1rem;background-color: #fff}
  .page-infinite-loading .loadingCon{width:50%;height:1rem;margin:0 auto}
  .page-infinite-loading span{display:block;height:1rem;line-height:1rem;font-size:0.4rem;}
  .page-infinite-loading .loadingIcon{width:1rem;background: url("../assets/imgs/loading.gif") no-repeat center center;background-size: 50%}


</style>
