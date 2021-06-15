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
        <el-button type="info" icon="el-icon-edit" circle></el-button>
      </div>
      <div class="material-item">
        <span class="attribute">联系方式:</span>
        <span class="value">{{ d_tel }}</span>
        <el-button type="info" icon="el-icon-edit" circle></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReDeliverMsg",

  data(){
    return{
      d_id: '2564908936',
      d_name: '初滞',
      d_tel: '19181970424',
    }
  },

  beforeRouteEnter(to,from,next){
    next(vm => {
      console.log(vm.d_id);
      vm.DeliverMsgForm();
    })
  },

  methods:{
    edit(){

    },
    DeliverMsgForm(){
      this.axios({
        method: 'get',
        url:'http://localhost:8081/deliver/show',
        headers:  {
          "content-type": "application/x-www-form-urlencoded",
          "satoken": localStorage.getItem('tokenValue')        // 关键代码, 注意参数名字是 satoken
        },
        success: (res) => {
          console.log(res.data);
        }
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){

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
