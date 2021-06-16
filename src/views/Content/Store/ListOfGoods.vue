<template>
  <div>
  <h2>商品列表</h2>
    <el-table :data="ProductTable" style="width: 100%" stripe>
      <el-table-column label="商品号">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商家名">
        <template slot-scope="scope">
          <span>{{scope.row.store.name}}</span>
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
      ProductTable:[],
      s_id: '',
    }
  },

  beforeRouteEnter(to,from,next){
    next(vm => {
      console.log(vm.d_id);
      vm.ProductMsgForm();
    })
  },

  methods: {
    handleEdit(index, row) {
      row.price++;
      this.ProductEditForm(index);
    },

    handleDelete(index, row) {
      this.ProductTable.splice(index,1);
      this.ProductDeleteForm(index);
    },

    EditSuccess(){
      this.$message({
        showClose: true,
        message: '编辑成功',
        type: 'success',
        duration: 1000
      });
    },

    DeleteSuccess(){
      this.$message({
        showClose: true,
        message: '删除成功',
        type: 'success',
        duration: 1000
      });
    },

    ProductMsgForm(){
      const tokenName = localStorage.getItem('tokenName');  /*从本地存储中取出tokenName的值*/
      const tokenValue = localStorage.getItem('tokenValue'); /*从本地存储中取出tokenValue的值*/
      const header = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if(tokenName !== undefined && tokenName !== ''){
        header[tokenName] = tokenValue
      }
      this.s_id=this.$store.state.id;
      this.axios({
        method: 'get',
        url:'http://localhost:8081/product/show/'+this.s_id,
        headers: header,
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
          let i;
          for(i=0;i<response.data.data.productList.length;i++){
            this.ProductTable.push(response.data.data.productList[i]);
          }
        }
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    ProductEditForm(index){
      const tokenName = localStorage.getItem('tokenName');  /*从本地存储中取出tokenName的值*/
      const tokenValue = localStorage.getItem('tokenValue'); /*从本地存储中取出tokenValue的值*/
      const header = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if(tokenName !== undefined && tokenName !== ''){
        header[tokenName] = tokenValue
      }
      this.s_id=this.$store.state.id;
      this.axios({
        method: 'get',
        url:'http://localhost:8081/store/edit/'+this.ProductTable[index].id+
          '/'+this.ProductTable[index].name+'/'+this.ProductTable[index].price,
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
    },

    ProductDeleteForm(index){
      const tokenName = localStorage.getItem('tokenName');  /*从本地存储中取出tokenName的值*/
      const tokenValue = localStorage.getItem('tokenValue'); /*从本地存储中取出tokenValue的值*/
      const header = {
        "content-type": "application/x-www-form-urlencoded"
      };
      if(tokenName !== undefined && tokenName !== ''){
        header[tokenName] = tokenValue
      }
      this.s_id=this.$store.state.id;
      this.axios({
        method: 'get',
        url:'http://localhost:8081/store/delete/'+this.s_id+'/'+this.ProductTable[index].id+'/',
        headers: header,
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
          this.DeleteSuccess();
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

</style>
