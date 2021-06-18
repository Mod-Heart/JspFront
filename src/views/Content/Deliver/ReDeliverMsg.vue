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
        <el-button type="info" @click="DialogVisibleName=true">编辑</el-button>
      </div>
      <div class="material-item">
        <span class="attribute">联系方式:</span>
        <span class="value">{{ d_tel }}</span>
        <el-button type="info">编辑</el-button>
      </div>
    </div>
    <el-dialog title="修改姓名" :visible.sync="dialogVisibleName" width="30%" :before-close="handleClose">
      <el-form>
        <el-form-item>
          <el-form-item label="姓名">
            <el-input type="text" v-model="newName" style="width: 200px" placeholder="请输入新姓名"></el-input>
          </el-form-item>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleName = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleName = false;NameEdit()">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="修改电话" :visible.sync="dialogVisibleTel" width="30%" :before-close="handleClose">
      <el-form>
        <el-form-item>
          <el-form-item label="电话">
            <el-input type="text" v-model="newTel" style="width: 200px" placeholder="请输入新电话"></el-input>
          </el-form-item>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleTel = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleTel = false;TelEdit()">确 定</el-button>
        </span>
    </el-dialog>
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
      newName: '',
      newTel: '',
      DialogVisibleName: false,
      DialogVisibleTel: false
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
      this.d_name=this.newName;
      this.DeliverMsgEditForm();
    },

    TelEdit(){
      this.d_tel=this.newTel;
      this.DeliverMsgEditForm();
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
