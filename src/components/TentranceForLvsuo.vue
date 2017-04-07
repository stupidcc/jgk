<template>
  <div class="tentrance">
    <div class="horizontal-view">
      <div class="tranceItemCon">
        <router-link :to="'/pointViewListForLvsuo/'+id">
          <div class="tranceItem"><div class="tranceImg dianshi"></div><div class="tranceName">点视</div></div>
        </router-link>
      </div>
      <div class="tranceItemCon">
        <a :href="'http://dt.zfwx.com/dianting/col/1'">
          <div class="tranceItem"><div class="tranceImg dianting"></div><div class="tranceName">点听</div></div>
        </a>
      </div>
      <div class="tranceItemCon">
        <router-link :to="'/pointReadListForLvsuo/'+id">
          <div class="tranceItem"><div class="tranceImg diandu"></div><div class="tranceName">点读</div></div>
        </router-link>
      </div>
      <div class="tranceItemCon">
        <router-link :to="'/msshowListForLvsuo/'+id">
          <div class="tranceItem"><div class="tranceImg mianshow"></div><div class="tranceName">面授</div></div>
        </router-link>
      </div>
      <div class="tranceItemCon">
        <a :href="'http://m.zfwx.com/facetoface/diantongbao.html'">
          <div class="tranceItem"><div class="tranceImg diantong"></div><div class="tranceName">点同</div></div>
        </a>
      </div>
    </div>
    <div class="horizontal-view">
      <div class="tranceItemCon">
        <router-link :to="'/dynamicListForLvsuo/'+id">
          <div class="tranceItem"><div class="tranceImg dongtai"></div><div class="tranceName">动态</div></div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props:['id'],
    mounted:function(){
        console.log(this.id)
    }
  }
</script>
<style scoped>
  .tentrance{width:10rem;height:4.594rem;display: flex;flex-direction: column;background-color: #fbfdff}
  .tentrance .horizontal-view{line-height:0;margin-left:0.359rem;width:9.641rem;height:2.125rem;display:flex;flex-direction: row}
  .tentrance .horizontal-view .tranceItemCon{line-height:0;margin-left:0.047rem;width:1.813rem;height:2.125rem;position: relative}
  .tentrance .horizontal-view .tranceItemCon .tranceItem{line-height: 0;margin-left: 0.047rem;width: 1.625rem;height: 2.125rem;position: absolute;}
  .horizontal-view .tranceItemCon .tranceItem .tranceImg{line-height: 0;margin-top: 0.313rem;width: 1.625rem;height: 1.141rem;background-size: contain;background-position: 50% 50%;background-repeat: no-repeat;}
  .horizontal-view .tranceItemCon .tranceItem .tranceImg.dianshi{background-image: url("../assets/imgs/dianshi.png");}
  .horizontal-view .tranceItemCon .tranceItem .tranceImg.dianting{background-image: url("../assets/imgs/dianting.png");}
  .horizontal-view .tranceItemCon .tranceItem .tranceImg.diandu{background-image: url("../assets/imgs/diandu.png");}
  .horizontal-view .tranceItemCon .tranceItem .tranceImg.dianbo{background-image: url("../assets/imgs/dianbo.png");}
  .horizontal-view .tranceItemCon .tranceItem .tranceImg.mianshow{background-image: url("../assets/imgs/mianshow.png");}
  .horizontal-view .tranceItemCon .tranceItem .tranceImg.dianda{background-image: url("../assets/imgs/dianda.png");}
  .horizontal-view .tranceItemCon .tranceItem .tranceImg.diantong{background-image: url("../assets/imgs/diantong.png");}
  .horizontal-view .tranceItemCon .tranceItem .tranceImg.dianqun{background-image: url("../assets/imgs/dianqun.png");}
  .horizontal-view .tranceItemCon .tranceItem .tranceImg.dongtai{background-image: url("../assets/imgs/dongtai.png");}
  .horizontal-view .tranceItemCon .tranceItem .tranceName{line-height: 0.688rem;text-align: center;font-size: 24px;color: rgb(102, 102, 102);background-color: transparent;width: 1.625rem;height: 0.688rem;}

</style>
