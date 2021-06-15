<template>
  <div>
    <h2>订单列表</h2>
  <el-table :data="order" style="width: 100%" stripe :row-class-name="tabRowClassName">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品">
            <span>{{scope.row.op_name[0]}}--{{scope.row.op_num}}份</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ scope.row.o_s_name }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ scope.row.o_s_id }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ scope.row.o_s_address }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="订单号" width="150px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.o_id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="订单状态" width="120px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.o_msg }}</span>
      </template>
    </el-table-column>
    <el-table-column label="下单时间" width="150px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.o_time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="骑手名" width="120px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.o_d_name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="商家名" width="120px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.o_s_name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="顾客名" width="120px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.o_g_name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="收货地址" width="300px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.o_address }}</span>
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
  name: "OrderList",
  data(){
    return{
      order:[{
        o_id: '16522445',
        o_msg: '派送中',
        o_time: '2021-06-12 17:00',
        o_s_id: '2153',
        o_s_address: '地址',
        o_d_name: '初滞',
        o_s_name: '初滞',
        o_g_name: '初滞',
        o_address: '学府路一段24号成都信息工程大学',
        op_name: ['蟹黄堡','蟹黄堡'],
        op_num: '1'
      },{
        o_id: '16522445',
        o_msg: '派送中',
        o_time: '2021-06-12 17:00',
        o_d_name: '初滞',
        o_s_name: '初滞',
        o_g_name: '初滞',
        o_address: '学府路一段24号成都信息工程大学',
        op_name: ['鸡公煲','鸡公煲'],
        op_num: ['1','2']
      },{
        o_id: '16522445',
        o_msg: '派送中',
        o_time: '2021-06-12 17:00',
        o_d_name: '初滞',
        o_s_name: '初滞',
        o_g_name: '初滞',
        o_address: '学府路一段24号成都信息工程大学',
        op_name: ['鸡公煲','鸡公煲'],
        op_num: ['1','2']
      },{
        o_id: '16522445',
        o_msg: '派送中',
        o_time: '2021-06-12 17:00',
        o_d_name: '初滞',
        o_s_name: '初滞',
        o_g_name: '初滞',
        o_address: '学府路一段24号成都信息工程大学',
        op_name: ['鸡公煲','鸡公煲'],
        op_num: ['1','2']
      }]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },

    handleDelete(index, row) {
      this.tableData.splice(index,1)
    },

    tabRowClassName({row,rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "";
      }
    }
  }
}
</script>

<style>
/* 鼠标滑过高亮显示 */
.el-table tbody tr:hover>td {
  background-color:rgb(189, 189, 189)!important
}

/* 表格线 */
.el-table--border, .el-table--group {
  border-color: rgb(209, 206, 206);
}

.el-table--border:after, .el-table--group:after, .el-table:before {
  background-color:rgb(209, 206, 206);
}

.el-table td, .el-table--border th,.el-table th.is-leaf {
  border-bottom-color: rgb(209, 206, 206);
}

.el-table--border td, .el-table--border th {
  border-right-color:rgb(209, 206, 206);
}
/*  斑马纹表格背景 */
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background:rgb(228, 228, 228)
}
/*  修改表格行样式 */
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #CCC;
}
/*修改表格内容样式*/
.el-table{
  font-size: 14px;
  align-content: center;
}
/*修改表头字体颜色*/
.el-table thead {
  color: white;
  font-weight: 500;
}
/*修改表格头部背景*/
.el-table th{
  background: grey;
}
/*修改顶栏样式*/
.el-header{
  background-color: #333;
  color: white;
  position: relative;
  right: 1px;
}
/*修改行内线样式*/
.el-table td,.building-top .el-table th.is-leaf {
  border-bottom:  1px solid #444;
}
.el-table::before{
  border-bottom:  1px solid #444;
  height: 2px
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
