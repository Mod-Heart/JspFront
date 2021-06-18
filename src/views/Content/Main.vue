<template>
<div>
  <el-container style="height: 100%;">
    <el-aside width="200px">
      <el-menu router>
        <div class="usernameBG"><span class="usernamePos">{{ this.$store.state.name }}</span></div>
        <el-menu-item index="OrderList"><em class="el-icon-tickets"></em>订单列表</el-menu-item>
        <el-submenu index="1">
          <template slot="title"><em class="el-icon-mobile"></em>我的</template>
          <el-menu-item index="Abnormal" v-show="this.$store.state.type!='admin'"><em class="el-icon-question"></em>异常报告</el-menu-item>
          <el-menu-item index="ReGuestMsg" v-show="this.$store.state.type==='guest'"><em class="el-icon-edit-outline"></em>更新信息</el-menu-item>
          <el-menu-item index="CreateNewOrder" v-show="this.$store.state.type==='guest'"><em class="el-icon-shopping-bag-1"></em>创建订单</el-menu-item>
          <el-menu-item index="ReStoreMsg" v-show="this.$store.state.type==='store'"><em class="el-icon-edit-outline"></em>更新信息</el-menu-item>
          <el-menu-item index="ReDeliverMsg" v-show="this.$store.state.type==='deliver'"><em class="el-icon-edit-outline"></em>更新信息</el-menu-item>
          <el-menu-item index="ListOfGoods" v-show="this.$store.state.type==='store'"><em class="el-icon-document"></em>商品列表</el-menu-item>
          <el-menu-item index="ManageGuest" v-show="this.$store.state.type==='admin'"><em class="el-icon-edit-outline"></em>管理顾客</el-menu-item>
          <el-menu-item index="ManageStore" v-show="this.$store.state.type==='admin'"><em class="el-icon-edit-outline"></em>管理商家</el-menu-item>
          <el-menu-item index="ManageDeliver" v-show="this.$store.state.type==='admin'"><em class="el-icon-edit-outline"></em>管理骑手</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span class="title">外卖订单管理系统</span>
        <div class="logout" @click="logout"><span class="logoutcontent">退出</span></div>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<style>
/*设置用户名所在块样式*/
.usernameBG{
  background: #111;
  height: 60px;
  color: white;
}
/*设置用户名所在块文字样式*/
.usernamePos{
  font-size: 18px;
  position: relative;
  top: 15px;
}
/*顶栏标题样式*/
.title{
  float: left;
  font-size: 25px;
  position: relative;
  top: 10px
}

.logout{
  background-color: #111;
  width: 90px;
  height: 60px;
  font-size: 18px;
  position: relative;
  left: 20px;
  float: right;
}

.logoutcontent{
  position: relative;
  top: 14px;
  right: 25px;
}
.el-header{
  background-color: #333;
  color: white;
  position: relative;
  right: 1px;
}
</style>

<script>

export default {
  name: '',
  methods: {
    abSuccess(){
      this.$message({
        showClose: true,
        message: '注销成功',
        type: 'success',
        duration: 1000
      });
    },

    logout() {
      const tokenName = localStorage.getItem('tokenName');  /*从本地存储中取出tokenName的值*/
      const tokenValue = localStorage.getItem('tokenValue'); /*从本地存储中取出tokenValue的值*/
      const header = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if(tokenName !== undefined && tokenName !== ''){
        header[tokenName] = tokenValue
      }
      this.g_id=this.$store.state.id;
      this.axios({
        method: 'get',
        url:'http://localhost:8081/user/logOut',
        headers: header,
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
         this.$router.push('/');
         this.abSuccess();
        }
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },
  }
};
</script>
