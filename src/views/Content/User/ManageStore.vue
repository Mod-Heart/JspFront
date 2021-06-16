<template>
  <div>
    <h2>管理商家</h2>
    <el-table :data="StoreTable" style="width: 100%">
      <el-table-column label="商家号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商家名">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.telephone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商家地址">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.address }}</span>
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
  name: "ManageStore",
  data() {
    return {
      StoreTable: [],
    }
  },

  beforeRouteEnter(to,from,next){
    next(vm => {
      vm.StoreMsgForm();
    })
  },

  methods: {
    handleEdit(index, row) {
      row.telephone+='a';
      console.log(index, row);
    },

    handleDelete(index, row) {
      this.tableData.splice(index,1)
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
      this.axios({
        method: 'get',
        url:'http://localhost:8081/store/show',
        headers: header,
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
          let i;
          for(i=0;i<response.data.data.store.length;i++){
            this.StoreTable.push(response.data.data.store[i]);
          }
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
