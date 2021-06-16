<template>
  <div>
    <h2>我的信息</h2>
    <div class="material">
      <div class="material-item">
        <span class="attribute">顾客号:</span>
        <span class="value">{{ g_id }}</span>
      </div>
      <div class="material-item">
        <span class="attribute">顾客姓名:</span>
        <span class="value">{{ g_name }}</span>
        <el-button type="info" @click="NameEdit()" plain>编辑</el-button>
      </div>
      <div class="material-item">
        <span class="attribute">联系方式:</span>
        <span class="value">{{ g_tel }}</span>
        <el-button type="info" @click="TelEdit()" plain>编辑</el-button>
      </div>
      <div class="material-item">
        <span class="attribute">地址:</span>
        <ul style="list-style: none">
          <li class="itempos" v-for="(item,index) in g_address">
            <label class="index">{{ index+1}}.</label>
            <span class="value" >{{ item }}</span>
          </li>
        </ul>
        <el-button type="info" @click="dialogVisible = true" style="position: relative;left: 100px" plain>添加地址</el-button>
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
          <el-button type="primary" @click="dialogVisible = false;AddAddress()">确 定</el-button>
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
      g_id: '',
      g_name: '',
      g_tel: '',
      g_address: [],
      newaddress: '',
      dialogVisible: false
    }
  },

  beforeRouteEnter(to,from,next){
    next(vm => {
      vm.GuestMsgForm();
    })
  },

  methods:{
    NameEdit(){
      this.g_name+='a';
      this.GuestMsgEditForm();
    },

    TelEdit(){
      this.g_tel+='a';
      this.GuestMsgEditForm();
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    AddAddress(){
      this.g_address.push(this.newaddress);
      this.GuestMsgEditForm();
    },

    abSuccess(){
      this.$message({
        showClose: true,
        message: '修改成功',
        type: 'success',
        duration: 1000
      });
    },

    GuestMsgForm(){
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
        url:'http://localhost:8081/guest/info/'+this.g_id,
        headers: header,
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
          let i;
          this.g_name=response.data.data.guest.name;
          this.g_tel=response.data.data.guest.telephone;
          for(i=0;i<response.data.data.guest.addresses.length;i++){
            this.g_address.push(response.data.data.guest.addresses[i].addressString);
          }
        }
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    GuestMsgEditForm(){
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
        url:'http://localhost:8081/guest/enroll/'+this.g_id+'/'+this.g_name+'/'+this.g_tel+'/'+this.g_address+'/',
        headers: header,
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
          this.abSuccess();
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

</style>
