<template>
  <div class="countDown" v-show="ifShow" >
    <span class="alarmLabel fl"></span>
    <p>还剩<span class="days">{{days}}</span>天</p>
    <p>{{hour}}:{{min}}:{{seconds}}</p>
  </div>
</template>
<script>
  export default{
      props:['datetime'],
      data(){
          return {
            ifShow:true,
              time:this.datetime,
              days:"0",
              hour:"00",
              min:"00",
              seconds:"00",
          }
      },
    mounted:function(){
      var ctx=this;
      setInterval(function(){
        var nowtime=(new Date()).getTime()
        var timeLong=ctx.time-nowtime;
        if(timeLong<=0){
            ctx.ifShow=false;
        }else{
          ctx.days=parseInt(timeLong/1000/60/60/24,10);
          ctx.hour=parseInt(timeLong/1000/60/60%24,10)>=10?parseInt(timeLong/1000/60/60%24,10):("0"+parseInt(timeLong/1000/60/60%24,10));
          ctx.min=parseInt(timeLong/1000/60%60,10)>=10?parseInt(timeLong/1000/60%60,10):("0"+parseInt(timeLong/1000/60%60,10));
          ctx.seconds=parseInt(timeLong/1000%60,10)>=10?parseInt(timeLong/1000%60,10):("0"+parseInt(timeLong/1000%60,10));
        }

      },1000)
    }
  }
</script>
<style scoped>
  p{margin:0}
  .countDown{height:0.803rem;color:#a8a8a8}
  .countDown .days{display:inline-block;margin:0 10px;font-size:0.3rem;}
  .alarmLabel{display:block;width:0.63rem;margin-right:0.2rem;height:0.67rem;background: url("../assets/imgs/alarmclock.png") no-repeat center center;background-size: contain;}
</style>
