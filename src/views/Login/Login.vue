<template>
  <div class="text-center">
  <el-form :model="loginForm"  label-width="100px" class="login-box">
    <img class="mb-4" src="../../assets/img/饿了么外卖-圆形.png" alt="" width="72" height="72">
    <h1 class="login-title">登录</h1>
    <el-form-item label="身份" prop="type">
      <el-select v-model="loginForm.type" placeholder="请选择验证身份" style="width: 200px">
        <el-option label="顾客" value="guest"></el-option>
        <el-option label="商家" value="store"></el-option>
        <el-option label="骑手" value="deliver"></el-option>
        <el-option label="管理员" value="admin"></el-option>
    </el-select>
  </el-form-item>

    <el-form-item label="用户" prop="name">
      <el-input type="text" v-model="loginForm.name" style="width: 200px" placeholder="请输入用户名"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" style="width: 200px" placeholder="请输入密码"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="LogForm();" style="position: relative;right: 35px">登录</el-button>
      <el-button @click="toRegister" style="position: relative;right: 35px">注册</el-button>
    </el-form-item>
    <p class="mt-5 mb-3 text-muted">© 2020-2021</p>
    <a class="btn btn-sm">中文</a>
    <a class="btn btn-sm">English</a>
  </el-form>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
    data() {
      return {
        loginForm: {
          type: 'guest',
          name: 'userforguest',
          password: '2022337'
        },
        err: '',
        dialogVisible: false
      };
    },
    methods: {
      LogForm() {
        var tokenName = localStorage.getItem('tokenName');  /*从本地存储中取出tokenName的值*/
        var tokenValue = localStorage.getItem('tokenValue'); /*从本地存储中取出tokenValue的值*/
        var header = {
          "content-type": "application/x-www-form-urlencoded"
        };
        if(tokenName !== undefined && tokenName !== ''){
          header[tokenName] = tokenValue
        }
        this.axios({
          method: 'get',
          url:'http://localhost:8081/user/login/'+this.loginForm.type+ '/'+this.loginForm.name+'/'+this.loginForm.password,
          headers: header
        }).then((response)=>{
          console.log(response);
            if (response.data.code===0){
              localStorage.setItem('tokenName',response.data.data.tokenName);  /*将后端发送过来的tokenName存储到本地*/
              localStorage.setItem('tokenValue',response.data.data.tokenValue);  /*将后端发送过来的tokenValue存储到本地*/
              this.$store.commit('setid',response.data.data.targetId) /*将state中id更改为登录用户id*/
              this.$store.commit('setname',this.loginForm.name)    /*将state中name更改为登录用户名*/
              this.$store.commit('settype',this.loginForm.type)    /*将state中type更改为登录用户类型*/
              this.$router.push("/main");
              this.logsuccess();
            }
            else {
              if(response.data.msg==='密码错误'){
                this.passErr();
              }
              else{
                this.nameErr();
              }
            }
          })
          .catch((error)=>{
            console.log(error);   /*抓错*/
          });
      },
      toRegister(){
        this.$router.push('/GuestRegister');
      },
      nameErr(){
        this.$message({
          showClose: true,
          message: '用户名不存在',
          type: 'error'
        });
      },
      passErr(){
        this.$message({
          showClose: true,
          message: '密码错误',
          type: 'error'
        });
      },
      logsuccess(){
        this.$message({
          showClose: true,
          message: '登录成功',
          type: 'success',
          duration: 1000
        });
      }
    }
}
</script>

<style scoped>
.login-box {
  width: 380px;
  margin-left: 600px;
  margin-top: 100px;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
