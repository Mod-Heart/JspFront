<template>
  <div>
    <h2>我的信息</h2>
    <div class="material">
      <div class="material-item">
        <span class="attribute">顾客号:</span>
        <span class="value">{{ g_id }}</span>
      </div>
      <div class="material-item">
        <span class="attribute">顾客昵称:</span>
        <span class="value">{{ g_name }}</span>
        <el-button type="info" icon="el-icon-edit" circle></el-button>
      </div>
      <div class="material-item">
        <span class="attribute">联系方式:</span>
        <span class="value">{{ g_tel }}</span>
        <el-button type="info" icon="el-icon-edit" circle></el-button>
      </div>
      <div class="material-item">
        <span class="attribute">地址:</span>
        <ul style="list-style: none">
          <li class="itempos" v-for="(item,index) in a_address">
            <label class="index">{{ index+1}}.</label>
            <span class="value" >{{ item }}</span>
          </li>
        </ul>
        <el-button type="info" @click="dialogVisible = true" style="position: relative;left: 100px">添加地址</el-button>
      </div>
      <el-dialog title="添加地址" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form>
          <el-form-item>
            <el-form-item label="地址">
              <el-input type="text" v-model="newaddress" style="width: 200px" placeholder="请输入地址"></el-input>
            </el-form-item>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false;add()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReGusetMsg",

  data(){
    return{
      g_id: '2564908936',
      g_name: '初滞',
      g_tel: '19181970424',
      a_address: ['成都信息工程大学'],
      newaddress: '',
      dialogVisible: false
    }
  },

  beforeRouteEnter(to,from,next){
    next(vm => {
      console.log(vm.d_id);
      vm.GuestMsgForm();
    })
  },

  methods:{
    edit(){

    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    add(){
      this.a_address.push(this.newaddress)
    },

    GuestMsgForm(){
     /*获取用户信息请求的方法*/
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

</style>
