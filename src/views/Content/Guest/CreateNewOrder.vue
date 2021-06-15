<template>
  <div>
    <el-menu>
      <el-menu-item @click="drawer = true" v-for="(item,index) in store" :key="index" class="storelist">
        <em class="el-icon-s-shop"></em>
        <span>{{item}}</span>
      </el-menu-item>
      <el-drawer title="请选择商品" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
      <el-menu class="storelist">
        <el-menu-item v-for="(item,index) in product" :key="index">
          <em class="el-icon-price-tag"></em>
          <span>{{item}}</span>
          <em class="el-icon-circle-plus" @click="add(index)" style="position: relative;left: 300px"></em>
        </el-menu-item>
        <el-button type="primary" style="position: fixed;left: 1460px;top: 600px">下单</el-button>
      </el-menu>
        <span v-model="op_name">{{ op_name }}--</span>
        <span v-model="op_num">{{ op_num }}</span>
    </el-drawer>
    </el-menu>

  </div>
</template>

<script>
export default {
  name: "CreateNewOrder",
  data(){
    return{
      store: ['重庆鸡公煲','华莱士'],
      product: ['鸡公煲','排骨煲','蹄花煲'],
      drawer: false,
      direction: 'rtl',
      op_name: [],
      op_num: [],
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    add(index){
      var i;
      for(i=0;i<this.op_name.length+1;i++){
        if(this.op_name[i]===this.product[index]){
          console.log(this.product[index]);
        }
        else{
          this.op_name.push(this.product[index]);
          this.op_num.push('1');
        }
      }
      console.log(this.op_name);
      console.log(this.op_num);
    }
  }
}
</script>

<style scoped>
.storelist{
  list-style: none;
  color: #555666;
  font-size: 20px;
}
</style>
