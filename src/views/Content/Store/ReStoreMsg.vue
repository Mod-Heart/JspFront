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
      <el-button type="info" icon="el-icon-edit" circle></el-button>
    </div>
    <div class="material-item">
      <span class="attribute">联系方式:</span>
      <span class="value">{{ s_tel }}</span>
      <el-button type="info" icon="el-icon-edit" circle></el-button>
    </div>
    <div class="material-item">
      <span class="attribute">商家地址:</span>
      <span class="value">{{ s_address }}</span>
      <el-button type="info" icon="el-icon-edit" circle></el-button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "ReStoreMsg",

  data(){
    return{
      s_id: '2564908936',
      s_name: '铁板炒饭',
      s_tel: '19181970424',
      s_address: '成都信息工程大学',
    }
  },

  beforeRouteEnter(to,from,next){
    next(vm => {
      console.log(vm.d_id);
      vm.StoreMsgForm();
    })
  },

  methods:{
    edit(){

    },

    StoreMsgForm(){

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
