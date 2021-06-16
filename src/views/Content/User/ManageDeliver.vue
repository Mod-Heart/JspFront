<template>
  <div>
    <h2>管理骑手</h2>
    <el-table :data="DeliverTable" style="width: 100%">
      <el-table-column label="骑手号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="骑手名">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.telephone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ManageDeliver",
  data() {
    return {
      DeliverTable: [],
    }
  },

  beforeRouteEnter(to,from,next){
    next(vm => {
      vm.DeliverMsgForm();
    })
  },

  methods: {
    handleEdit(index, row) {
      row.telephone+='a';
      this.DeliverEditForm(index);
    },

    handleDelete(index, row) {
      this.tableData.splice(index,1)
    },

    DeSuccess(){
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
      this.axios({
        method: 'get',
        url:'http://localhost:8081/deliver/show',
        headers: header,
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
          let i;
          for(i=0;i<response.data.data.deliver.length;i++){
            this.DeliverTable.push(response.data.data.deliver[i]);
          }
        }
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    /*编辑请求*/
    DeliverEditForm(index){
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
        url:'http://localhost:8081/deliver/edit/'+this.DeliverTable[index].id+'/'+this.DeliverTable[index].name+'/'+this.DeliverTable[index].telephone,
        headers: header,
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
          this.DeSuccess()
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

</style>
