<template>
  <div>
    <div class="formContainer" v-show="!ifSubmited">
      <h5>想听什么课？您点课！</h5>
      <div class="formDiv">
        <form novalidate>
          <div class="inputGroup">
            <input placeholder="课程主要内容是什么"  name="content" v-model="formData.content" @input="handleContent"/>
            <span class="errorMsg" v-if="results.content" v-cloak>{{results.content}}</span>
          </div>
          <div class="inputGroup">
             <input placeholder="您期望的老师" name="teacher"  v-model="formData.teacher" @input="handleTeacher"/>
            <span class="errorMsg" v-if="results.teacher">{{results.teacher}}</span>
          </div>
          <div class="inputGroup">
            <input placeholder="您的姓名"  name="username" v-model="formData.realName"  @input="handleUsername"/>
            <span class="errorMsg" v-if="results.realName">{{results.realName}}</span>
          </div>
          <div class="inputGroup">
             <input placeholder="您的手机号"  name="mobile" v-model="formData.mobile"  @input="handleMobile"/>
            <span class="errorMsg" v-if="results.mobile" v-cloak>{{results.mobile}}</span>
          </div>
          <div class="inputGroup">
             <input placeholder="您的单位和职务" name="position" v-model="formData.note"  @input="handlePosition"/>
            <span class="errorMsg" v-if="results.note" v-cloak>{{results.note}}</span>
          </div>
          <div class="inputGroup">
            <button class="submitBtn" @click.prevent="submitForm" :disabled="!valid" >提交</button>
          </div>
        </form>
      </div>
    </div>
    <div class="afterSubmited" v-show="ifSubmited">
      <img src="../assets/imgs/success.png" alt="">
      <p class="subInfo">提交成功</p>
      <router-link class="backBtnLink" to="/">返回首页</router-link>
    </div>
  </div>
</template>


<script>
  var mobileReg=/^1[3|4|5|7|8]\d{9}$/
  export default{
    data(){
      return {
        results:{
          content:false,
          teacher:false,
          realName:false,
          mobile:false,
          note:false
        },
        formData:{
          title:"sssss",
          content:"",
          teacher:"",
          realName:"",
          mobile:"",
          note:""
        },
        ifSubmited:false
      }
    },
    computed:{
      valid:function(){
        var results=this.results;
        for(let key in results){
            if(results[key]){
                return false
            }
        }
        return true
      }
    },
    methods:{
      submitForm:function(){
        var ctx=this;
        if(ctx.valid){
          for(var key in ctx.formData){
            if(ctx.formData[key]==""){
              alert("请补全表单内容")
              return
            }
          }

          ctx.$http.jsonp("http://base.zfwx.com/wydk.do",{
            params:ctx.formData,
            jsonp:'jsonpCallback'
          }).then(function(res){
            if(res.body.status=="success"){
              ctx.ifSubmited=true
            }

          },function(){
          });
        }

      },
      handleContent:function(e){
        var ctx=this;
        if(ctx.formData.content.trim()==""){
          ctx.results.content="请输入想听的课程"
        }else{
          ctx.results.content=false
        }
      },
      handleTeacher:function(e){
        var ctx=this;
        if(ctx.formData.teacher.trim()==""){
          ctx.results.teacher="请输入老师的姓名"
        }else{
          ctx.results.teacher=false
        }
      },
      handleUsername:function(e){
        var ctx=this;
        if(ctx.formData.realName.trim()==""){
          ctx.results.realName="请输入您的姓名"
        }else{
          ctx.results.realName=false
        }
      },
      handleMobile:function(e){
        var ctx=this;
        if(ctx.formData.mobile.trim()==""){
          ctx.results.mobile="请输入您的手机号"
        }else{
            if(!mobileReg.test(ctx.formData.mobile)){
              ctx.results.mobile="手机号格式不正确"
            }else{
              ctx.results.mobile=false
            }

        }
      },
      handlePosition:function(e){
        var ctx=this;
        if(ctx.formData.note.trim()==""){
          ctx.results.note="请输入您的单位和职务"
        }else{
            ctx.results.note=false
          }

        }
    },
    mounted:function(){

    }
  }
</script>
<style scoped>
  .formContainer .formDiv .inputGroup .errorMsg {
    display: block;
    position: absolute;
    top: 0.65rem;
    right: 0.2rem;
    font-size: 0.4rem;
    color: red;
  }


  /*我要点课 表单*/
  .formContainer{width:10rem;margin:0 auto;background-color: #fff;overflow: auto}
  .formContainer h5{font-size:0.48rem;color:#141414;margin:0.933rem 0 0.8rem 0;text-align:center}
  .formContainer .formDiv{width:10rem;padding:0 0.52rem;}
  .formContainer .formDiv .inputGroup{width:100%;height:1.533rem;padding-bottom:0.493rem;position:relative}
  .formContainer .formDiv .inputGroup input{width:100%;padding-left:0.24rem;height:1.04rem;background-color: #eef3f9;line-height:1.04rem;color:#949ba5;font-size:0.4rem;outline: none;border:none;border-radius:10px;}
  .formContainer .formDiv .inputGroup .submitBtn{width:100%;height:1.24rem;background-color: #53ddff;line-height:1.24rem;text-align:center;color:#fff;font-size:0.373rem;outline: none;border:none;border-radius:10px;}
  .formContainer .formDiv .inputGroup .submitBtn:disabled{background-color: #eee}
  .formContainer .formDiv .inputGroup .errorMsg{display:block;position:absolute;top:0.6rem;right:0.2rem;font-size:0.4rem;color:red}
  .afterSubmited{overflow: auto;width:100%;background-color: #fff}
  .afterSubmited img{display:block;width:1.867rem;height:1.7rem;margin:1.96rem auto 0.36rem auto;}
  .afterSubmited .subInfo{margin-bottom:1.16rem;text-align:center;font-size:0.4rem;color:#333}
  .afterSubmited .backBtnLink{display:block;width:9.2rem;height:1.2rem;margin:0 auto;line-height:1.2rem;text-align:center;color:#fff;font-size:0.373rem;background-color: #53ddff;border-radius: 10px;}


</style>
