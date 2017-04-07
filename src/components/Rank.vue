<!-- 律所网校列表-->
<template>
    <div class="rank">
        <div class="ranimg">
            <img src="../assets/imgs/topStar.png">
        </div>
        <div class="top3 bottomLine">
            <div class="item topTo" v-for="(item,index) in rankList" v-show="index==1">
              <router-link :to="'/lvsuoDetail/'+item.id">
                <img :src=item.banner>
                <span class="num">2</span>
                <p>{{item.extOne}}</p>
                <span class="psers">{{item.wxBrowseNum}}</span>
              </router-link>
            </div>
            <div class="item topOne" v-for="(item,index) in rankList" v-show="index==0">
              <router-link :to="'/lvsuoDetail/'+item.id">
                <img :src="item.banner">
                <span class="num">1</span>
                <p>{{item.extOne}}</p>
                <span class="psers">{{item.wxBrowseNum}}</span>
              </router-link>
            </div>
            <div class="item topThree" v-for="(item,index) in rankList" v-show="index==2">
              <router-link :to="'/lvsuoDetail/'+item.id">
                <img :src="item.banner">
                <span class="num">3</span>
                <p>{{item.extOne}}</p>
                <span class="psers">{{item.wxBrowseNum}}</span>
              </router-link>
            </div>
        </div>
        <div class="rankList">
            <ul>
                <li v-for="(item,index) in rankList" v-show="index>2">
                  <router-link :to="'/lvsuoDetail/'+item.id">
                      <span class="fl ranking">{{index+1}}</span><p class="fl forlve">{{item.bottom}}</p>
                      <span class="fr viewCount"><span class="fl number">{{item.wxBrowseNum}}</span><span class="fl">次</span></span>
                  </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
        props:['rankList']
    }
</script>
<style scoped>
  .rank{width:100%;overflow: auto}
  .rank .ranimg{width:100%;height:1.63rem}
  .rank .ranimg img{width:100%;height:1.63rem}
  .rank .top3{width:100%;height:4.23rem;background-color: #fff;display: flex;justify-content: space-around}
  .rank .top3 div.topTo img,.rank .top3 div.topThree img{height:1.1rem;}
  .rank .top3 div.topTo,.rank .top3 div.topThree{padding-top:0.9rem;text-align: center}
  .rank .top3 div.topOne{padding-top:0.53rem;text-align: center}
  .rank .top3 div.topOne img{height:1.83rem;}
  .rank .top3 div span.num{display:block;width:0.6rem;text-align:center;margin:10px auto;color:#FFF;border-radius: 10px;font-size:0.3rem;font-family:'fzlantingheis-r-gbregular';}
  .rank .top3 div.topOne span.num{background-color:#44c3b1 }
  .rank .top3 div.topTo span.num{background-color:#5262ff}
  .rank .top3 div.topThree span.num{background-color:#b18f6a}
  .rank .top3 div.item p{font-size:0.37rem;color:#333}
  .rank .top3 div.item span.psers{font-size:0.4rem;font-family:'fzlantingheis-r-gbregular';color:#898989;}
  .rank .rankList{overflow: auto;background-color: #fff;padding:0.4rem 0;}
  .rank .rankList li{height:0.84rem;width:100%;padding-left:0.267rem;}
  .rank .rankList li .ranking{display: block;width:0.8rem;height:0.84rem;line-height:0.84rem;text-align:center;font-size:0.4rem; color:#53ddff;}
  .rank .rankList li p{height:0.84rem;width:6rem;line-height:0.84rem;color:#333;font-size:0.38rem;}
  .rank .rankList li .viewCount{display: block;width:2.3rem;height:0.84rem;line-height:0.84rem;text-align:center;font-size:0.3rem;font-family:'fzlantingheis-r-gbregular';color:#999;}
  .rank .rankList li .viewCount span{display: block;}
  .rank .rankList li .viewCount .number{font-size:0.4rem;margin-right:0.1rem}
</style>
