<template>
  <div>
    <h2>异常报告</h2>
    <el-form :model="AbNormalFrom">
      <el-form-item label="订单号:">
        <el-input placeholder="请输入订单号" v-model="AbNormalFrom.o_id" clearable style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="异常原因:">
        <el-select v-model="AbNormalFrom.e_msg" placeholder="请选择异常原因">
          <el-option label="餐品撒漏" value="餐品撒漏"></el-option>
          <el-option label="商家配错订单商品" value="商家配错订单商品"></el-option>
          <el-option label="骑手送错订单" value="骑手送错订单"></el-option>
          <el-option label="配送时间太长" value="配送时间太长"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="AbnormalPostForm()">提交</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Abnarmol",
  data(){
    return{
      AbNormalFrom:{
        o_id: '',
        e_msg: ''
      }
    }
  },
  methods: {
    abSuccess(){
      this.$message({
        showClose: true,
        message: '提交成功',
        type: 'success',
        duration: 1000
      });
    },

    AbnormalPostForm(){
      const tokenName = localStorage.getItem('tokenName');  /*从本地存储中取出tokenName的值*/
      const tokenValue = localStorage.getItem('tokenValue'); /*从本地存储中取出tokenValue的值*/
      const header = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if(tokenName !== undefined && tokenName !== ''){
        header[tokenName] = tokenValue
      }
      this.axios({
        method: 'get',
        url:'http://localhost:8081/order/exception/'+this.AbNormalFrom.o_id+'/'+this.AbNormalFrom.e_msg,
        headers: header,
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
          this.abSuccess()
        }
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },
  }
}
</script>

<style scoped>
.el-button{
  position: relative;
  left: 80px;
}
</style>
