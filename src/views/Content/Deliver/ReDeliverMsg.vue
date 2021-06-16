<template>
  <div>
    <h2>我的信息</h2>
    <div class="material">
      <div class="material-item">
        <span class="attribute">骑手号:</span>
        <span class="value">{{ d_id }}</span>
      </div>
      <div class="material-item">
        <span class="attribute">骑手名:</span>
        <span class="value">{{ d_name }}</span>
        <el-button type="info" @click="NameEdit">编辑</el-button>
      </div>
      <div class="material-item">
        <span class="attribute">联系方式:</span>
        <span class="value">{{ d_tel }}</span>
        <el-button type="info" @click="TelEdit">编辑</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReDeliverMsg",

  data(){
    return{
      d_id: '',
      d_name: '',
      d_tel: '',
    }
  },

  beforeRouteEnter(to,from,next){
    next(vm => {
      console.log(vm.d_id);
      vm.DeliverMsgForm();
    })
  },

  methods:{
    NameEdit(){
      this.d_name+='a';
      this.DeliverMsgEditForm();
    },

    TelEdit(){
      this.d_tel+='a';
      this.DeliverMsgEditForm();
    },

    EditSuccess(){
      this.$message({
        showClose: true,
        message: '编辑成功',
        type: 'success',
        duration: 1000
      });
    },

    DeliverMsgForm(){
      const tokenName = localStorage.getItem('tokenName');  /*从本地存储中取出tokenName的值*/
      const tokenValue = localStorage.getItem('tokenValue'); /*从本地存储中取出tokenValue的值*/
      const header = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if(tokenName !== undefined && tokenName !== ''){
        header[tokenName] = tokenValue
      }
      this.d_id=this.$store.state.id;
      this.axios({
        method: 'get',
        url:'http://localhost:8081/deliver/show/'+this.d_id,
        headers: header,
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
          this.d_name=response.data.data.deliver.name;
          this.d_tel=response.data.data.deliver.telephone;
        }
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    DeliverMsgEditForm(){
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
        url:'http://localhost:8081/deliver/edit/'+this.d_id+'/'+this.d_name+'/'+this.d_tel,
        headers: header,
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
          this.EditSuccess();
        }
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    }
  }
}
</script>

<style scoped>
.material{
  font-size: 20px;
}

.material-item{
  margin-bottom: 20px;
}

.attribute{
  color: #555666;
  font-weight: 520;

}

.value{
  margin-left: 15px;
}

.el-button{
  margin-left: 15px;
}


</style>
