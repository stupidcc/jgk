<template>
    <div class="top-fixed" v-show="topShow">
        <span class="close fl" @click="closeTop"></span>
        <span class="dianjingLogo fl"  @click="closeTop"></span>
        <span class="info fl">体验更多功能与服务</span>
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.dj.zfwx.client.activity" class="fr">请下载App</a>
    </div>
</template>
<script>
    export default{
       data(){
           return {
           topShow:false,
       }
       },
        methods:{
          closeTop:function(){
            this.topShow=false
            sessionStorage.setItem("topShow",false)
           this.$emit('closetop')
          }
        },
      created:function(){
        var seeeionShow=sessionStorage.getItem("topShow")
        if(null==seeeionShow||seeeionShow=="true"){
            this.topShow=true
        }else{
          this.topShow=false
        }
      },
      mounted:function(){
    }
    }
</script>
<style scoped>
  .top-fixed{position:fixed;top:0;left:0;width:100%;height:100px;background-color:#53ddff;padding:0 16px;z-index:2;}
  .top-fixed .close{display:block;width:0.4rem;height:100%;background: url(../assets/imgs/close.png) no-repeat center center;cursor: pointer}
  .top-fixed .dianjingLogo{display:block;width:65px;height:65px;margin:20px 9px 0 9px;background: url(../assets/imgs/logo.png) no-repeat center center;background-size: 100%}
  .top-fixed span.info{display:inline-block;line-height:100px;color:#fff;font-size:30px;}
  .top-fixed a{display:inline-block;width:150px;height:60px;line-height:60px;margin-top:23px;background-color: #fff;text-align:center;font-size:24px;color:#53ddff;border-radius: 5px;}
</style>
