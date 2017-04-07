<template>
  <div class="footer-fixed" id="footer-fixed">
    <router-link class="home" :class="{current:footerIndex==0}" to="/"><span class="icon-footer"></span><p>发现</p></router-link>
    <router-link class="dredge" :class="{current:footerIndex==1}" to="/lvsuo"><span class="icon-footer"></span><p>律所</p></router-link>
    <a class="listen" :class="{current:footerIndex==2}" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.dj.zfwx.client.activity">
      <!--<span class="msgInfo">9+</span>-->
      <span class="icon-footer"></span>
      <p>听课</p>
    </a>
    <a class="me"  :class="{current:footerIndex==3}"  href="http://a.app.qq.com/o/simple.jsp?pkgname=com.dj.zfwx.client.activity"><span class="icon-footer"></span><p>我</p></a>
  </div>
</template>
<script>
  export default{
      props:['footerIndex'],
      data(){
          return {

          }
      }
  }
</script>
<style scoped>

  .footer-fixed{position: fixed;width:100%;height:1.34rem;padding-top:0.2rem;bottom:0;left:0;border-top:1px solid #bdbdbd;background-color: #fff;display:flex;justify-content: space-around;z-index:1}
  .footer-fixed>a{display:block;position:relative;height:100%;font-size:0.267rem;color:#898989;padding:0 0.9rem;}
  .footer-fixed>a.current{border-bottom: 3px solid #53ddff;color:#53ddff}
  .footer-fixed>a span.icon-footer{display:block;width:0.44rem;height:0.5rem;}
  .footer-fixed>a.home span.icon-footer{background: url("../assets/imgs/home.png") no-repeat center center}
  .footer-fixed>a.home.current span.icon-footer{background: url("../assets/imgs/home_current.png") no-repeat center center}
  .footer-fixed>a.dredge span.icon-footer{background: url("../assets/imgs/dredge.png") no-repeat center center}
  .footer-fixed>a.dredge.current span.icon-footer{background: url("../assets/imgs/dredge_current.png") no-repeat center center}
  .footer-fixed>a.listen span.icon-footer{background: url("../assets/imgs/listen.png") no-repeat center center}
  .footer-fixed>a.listen.current span.icon-footer{background: url("../assets/imgs/listen_current.png") no-repeat center center}
  .footer-fixed>a.me span.icon-footer{background: url("../assets/imgs/me.png") no-repeat center center}
  .footer-fixed>a.me.current span.icon-footer{background: url("../assets/imgs/me_current.png") no-repeat center center}
  .footer-fixed>a p{margin-top:0.1rem;text-align:center}
  .footer-fixed>a span.msgInfo{display:block;position:absolute;width:0.4rem;height:0.4rem;right:0.7rem;top:-0.1rem;line-height:0.4rem;text-align:center;font-size:0.21rem;border-radius: 50%;background-color: #4fc1e9;color:#fff;z-index:1}


</style>
