<template>
  <div class="view">
    <top-fixed v-on:closetop="closeTopFixed"></top-fixed>
    <div class="content" id="content">
         <p class="courseTT">{{dynamicItem.title}}</p>
         <p class="subTT"><span class="time fl">{{dynamicItem.createTime|time('YYYY-MM-DD hh:mm:ss')}}</span><span class="info fl">点睛网</span></p>
          <img :src="dynamicItem.img" class="dynamicPhoto">
        <div v-html="dynamicItem.content">
          {{dynamicItem.content}}
        </div>
    </div>
  </div>
</template>
<script>
  import TopFixed from '../components/TopFixed.vue'
  export default{
      components:{
        TopFixed
      },
      data(){
          return{
            dynamicItem:{}
          }
      },
    methods:{
          closeTopFixed:function(){
            /* global $ */
            var $content=$("#content")
              $content.css("marginTop","0")
          }
    },
    mounted:function () {
      /* global $ */
      var $content=$("#content")
      var topShow=sessionStorage.getItem("topShow")
      if(null==topShow||topShow=="true"){
        $content.css("marginTop","100px")
      }
      var $contentView=$(".content");
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
      $contentView.css({"min-height":clientHeight+"rem"})
          var ctx=this;
          ctx.$http.get(URL+"/getNoticeDetail.do?noticeId="+this.$route.params.id).then(response=>{
             ctx.dynamicItem=response.body.result;
             console.info(response.body.result)
          },response=>{})
    }
  }
</script>
<style scoped>
  body{max-width:1242px;min-width: 320px;margin:0 auto;font-family: "微软雅黑", "宋体", Arial, sans-serif}
  .view{width:10rem;overflow: auto;position: relative;margin:0 auto}
  #content{position: relative;width:100%;margin-bottom:1.33rem;}
  #content>section>div{position: relative;width:100%;overflow: hidden}
.content{width:100%;padding:0 0.4rem;overflow:hidden;background-color: #ececec}
.courseTT{font-size:0.64rem;color:#000;margin-top:20px;}
.subTT{width:100%;height:0.96rem;line-height:0.96rem;}
.subTT span.time{display:block;height:0.96rem;line-height:0.96rem;color:#808080;font-size:0.4rem;margin-right:0.8rem;}
.subTT span.info{display:block;height:0.96rem;line-height:0.96rem;color:#4fc1e9;font-size:0.427rem;}
.dynamicPhoto{width:100%;height:5.65rem;margin:10px 0;}
  .contentView{width:100%;padding:0.333rem 0.267rem;overflow: auto}






















</style>
