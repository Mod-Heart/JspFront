<template>
  <div>
    <h2>管理商家</h2>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="商家号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.s_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商家名">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.s_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.s_tel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商家地址">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.s_address }}</span>
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
      tableData: [{
        s_id: '5665892',
        s_name: '初滞',
        s_tel: '19181970424',
        s_address: '成都信息工程大学'
      },{
        s_id: '5665892',
        s_name: '初滞',
        s_tel: '19181970424',
        s_address: '成都信息工程大学'
      },{
        s_id: '5665892',
        s_name: '初滞',
        s_tel: '19181970424',
        s_address: '成都信息工程大学'
      },{
        s_id: '5665892',
        s_name: '初滞',
        s_tel: '19181970424',
        s_address: '成都信息工程大学'
      }]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.tableData.splice(index,1)
    }
  }
}
</script>

<style scoped>

</style>
