<template>
<div>
  <el-form :model="RegisterForm"  label-width="100px" class="login-box">
    <el-form-item label="用户名">
      <el-input type="text" v-model="RegisterForm.username" style="width: 200px" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="RegisterForm.password" style="width: 200px" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
    <el-input type="text" v-model="RegisterForm.name" style="width: 200px" placeholder="请输入真实姓名"></el-input>
    </el-form-item>
    <el-form-item label="收货地址">
      <el-input type="text" v-model="RegisterForm.address" style="width: 200px" placeholder="请输入收货地址"></el-input>
    </el-form-item>
    <el-form-item label="联系方式" prop="password">
      <el-input type="text" v-model="RegisterForm.telephone" style="width: 200px" placeholder="请输入联系方式"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="ToLogin()" style="position: relative;right: 35px">返回</el-button>
      <el-button @click="RegForm()" type="primary" style="position: relative;right: 35px">注册</el-button>
    </el-form-item>
  </el-form>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
   <h3>注册成功，是否返回登录页面？</h3>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false;ToLogin()">返回</el-button>
        </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "GuestRegister",
  data(){
    return{
      RegisterForm: {
        type: 'guest',
        username: '',
        name: '',
        password: '',
        address: '',
        telephone: ''
      },
      dialogVisible: false
    }
  },
  methods:{
    RegForm(){
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
        url:'http://localhost:8081/guest/enroll/'+this.RegisterForm.username+ '/'+this.RegisterForm.password+'/'
          +this.RegisterForm.name+'/'+this.RegisterForm.address+'/'+this.RegisterForm.telephone,
        headers: header
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
          this.dialogVisible=true;    /*显示对话框*/
          this.logsuccess();
        }
        else if(response.data.code===301){
          this.UsernameExist();
        }
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    ToLogin(){
      this.$router.push('/')
    },

    UsernameExist(){
      this.$message({
        showClose: true,
        message: '用户名已存在，无法注册',
        type: 'error',
        duration: 2000
      });
    },

    logsuccess(){
      this.$message({
        showClose: true,
        message: '登录成功',
        type: 'success',
        duration: 2000
      });
    }
  }

}
</script>

<style scoped>

</style>
