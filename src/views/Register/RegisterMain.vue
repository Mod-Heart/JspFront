<template>
  <div class="text-center" style="position: relative;bottom: 50px">
    <el-form label-width="100px" class="login-box">
      <img class="mb-4" src="../../assets/img/饿了么外卖-圆形.png" alt="" width="50" height="50">
      <h2 class="login-title">注册</h2>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/GuestRegister">顾客</el-menu-item>
        <el-menu-item index="/StoreRegister">商家</el-menu-item>
        <el-menu-item index="/DeliverRegister">骑手</el-menu-item>
        <el-menu-item index="/AdminRegister">管理员</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </el-form>
</div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      dialogVisible: false,
      activeIndex: '/GuestRegister',
      p: ['鸡公煲','排骨煲','蹄花煲','肥牛煲'],
      q: [1,2,0,3],
      r: []
    };
  },
  methods: {

  }
}
</script>

<style scoped>
.login-box {
  border: 1px solid #DCDFE6;
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
