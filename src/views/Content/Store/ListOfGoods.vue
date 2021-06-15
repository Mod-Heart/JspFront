<template>
  <div>
  <h2>商品列表</h2>
    <el-table :data="product" style="width: 100%" stripe :row-class-name="tabRowClassName">
      <el-table-column label="商品号">
        <template slot-scope="scope">
          <span>{{scope.row.p_id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名">
        <template slot-scope="scope">
          <span>{{scope.row.p_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
          <span>{{scope.row.p_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商家名">
        <template slot-scope="scope">
          <span>{{scope.row.p_s_name}}</span>
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
  name: "ListOfGoods",
  data(){
    return{
      product:[{
        p_id: '12651',
        p_name: '鸡公煲',
        p_price: '18',
        p_s_name: '重庆鸡公煲'
      },{
        p_id: '12651',
        p_name: '鸡公煲',
        p_price: '18',
        p_s_name: '重庆鸡公煲'
      },{
        p_id: '12651',
        p_name: '鸡公煲',
        p_price: '18',
        p_s_name: '重庆鸡公煲'
      },{
        p_id: '12651',
        p_name: '鸡公煲',
        p_price: '18',
        p_s_name: '重庆鸡公煲'
      },]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },

    handleDelete(index, row) {
      this.product.splice(index,1)
    },
  }
}
</script>

<style scoped>

</style>
