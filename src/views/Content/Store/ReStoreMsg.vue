<template>
  <div>
  <h2>我的信息</h2>
  <div class="material">
    <div class="material-item">
      <span class="attribute">商家号:</span>
      <span class="value">{{ s_id }}</span>
    </div>
    <div class="material-item">
      <span class="attribute">商家名:</span>
      <span class="value">{{ s_name }}</span>
      <el-button type="info" @click="NameEdit()" plain>编辑</el-button>
    </div>
    <div class="material-item">
      <span class="attribute">联系方式:</span>
      <span class="value">{{ s_tel }}</span>
      <el-button type="info" @click="TelEdit()" plain>编辑</el-button>
    </div>
    <div class="material-item">
      <span class="attribute">商家地址:</span>
      <span class="value">{{ s_address }}</span>
      <el-button type="info" @click="AddressEdit" plain>编辑</el-button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "ReStoreMsg",

  data(){
    return{
      s_id: '',
      s_name: '',
      s_tel: '',
      s_address: '',
    }
  },

  beforeRouteEnter(to,from,next){
    next(vm => {
      console.log(vm.d_id);
      vm.StoreMsgForm();
    })
  },

  methods:{
    NameEdit(){
      this.s_name+='a';
      this.StoreEditForm();
    },

    TelEdit(){
      this.s_tel+='a';
      this.StoreEditForm();
    },

    AddressEdit(){
      this.s_address+='a';
      this.StoreEditForm();
    },

    EditSuccess(){
      this.$message({
        showClose: true,
        message: '编辑成功',
        type: 'success',
        duration: 1000
      });
    },

    StoreMsgForm(){
      const tokenName = localStorage.getItem('tokenName');  /*从本地存储中取出tokenName的值*/
      const tokenValue = localStorage.getItem('tokenValue'); /*从本地存储中取出tokenValue的值*/
      const header = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if(tokenName !== undefined && tokenName !== ''){
        header[tokenName] = tokenValue
      }
      this.s_id=this.$store.state.id;
      this.axios({
        method: 'get',
        url:'http://localhost:8081/store/info/'+this.s_id,
        headers: header,
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
          this.s_name=response.data.data.store.name;
          this.s_tel=response.data.data.store.telephone;
          this.s_address=response.data.data.store.address;
        }
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    StoreEditForm(){
      const tokenName = localStorage.getItem('tokenName');  /*从本地存储中取出tokenName的值*/
      const tokenValue = localStorage.getItem('tokenValue'); /*从本地存储中取出tokenValue的值*/
      const header = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if(tokenName !== undefined && tokenName !== ''){
        header[tokenName] = tokenValue
      }
      this.s_id=this.$store.state.id;
      this.axios({
        method: 'get',
        url:'http://localhost:8081/store/edit/'+this.s_id+'/'+this.s_name+'/'+this.s_tel+'/'+this.s_address,
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

.index{
  color: #555666;
}

.itempos{
  margin-left: 10px;
  position: relative;
  left: 20px;
  bottom: 28px;
}

.buttonpos{

}
</style>
