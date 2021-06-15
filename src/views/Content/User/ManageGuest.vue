<template>
  <div>
    <h2>管理顾客</h2>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="顾客号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.g_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="顾客名">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.g_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式">
        <template slot-scope="scope">
              <span size="medium">{{ scope.row.g_tel }}</span>
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
  name: "ManageGuest",
  data() {
    return {
      tableData: [{
        g_id: '5665892',
        g_name: '初滞',
        g_tel: '19181970424'
      }, {
        g_id: '5665892',
        g_name: '初滞',
        g_tel: '19181970424'
      }, {
        g_id: '5665892',
        g_name: '初滞',
        g_tel: '19181970424'
      }, {
        g_id: '5665892',
        g_name: '初滞',
        g_tel: '19181970424'
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
