<template>
  <div>
    <el-form>
      <el-form-item label="选择地址">
      <el-select @click.native.once="AddressMsgForm()" v-model="addressId"  placeholder="请选择地址">
        <el-option v-for="(item,index) in AddressTable" :key="item.id" :label="item.addressString" :value="item.id"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="选择商家">
        <el-select @click.native.once="StoreMsgForm()" v-model="storeId"  placeholder="请选择商家">
          <el-option v-for="(item,index) in StoreTable" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="drawer=true;ProductListForm()">选择商品</el-button>
    </el-form>
    <el-drawer title="请选择商品" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
     <el-menu class="storelist">
       <el-menu-item v-for="(item,index) in ProductTable" :key="index">
         <em class="el-icon-price-tag"></em>
         <span>{{item.name}}</span>
         <em class="el-icon-remove" @click="sub(index)" style="position:absolute;left: 355px;top: 20px"></em>
         <span style="position:absolute;left: 390px;">{{ ProductNum[index] }}</span>
         <em class="el-icon-circle-plus" @click="add(index)" style="position:absolute;left: 410px;top: 20px"></em>
       </el-menu-item>
       <el-button type="primary" style="position: fixed;left: 1460px;top: 600px" @click="productMsgTostring();CreateOrderForm()">下单</el-button>
     </el-menu>
   </el-drawer>
  </div>
</template>

<script>
export default {
  name: "CreateNewOrder",
  data(){
    return{
      ProductTable: [],
      drawer: false,
      direction: 'rtl',
      AddressTable: [],
      StoreTable: [],
      addressId: '',
      storeId: '',
      ProductNum: [],
      joint: [],
      g_id: '',
      opName: '',
      opNum: ''
    }
  },
  methods: {
    productMsgTostring(){
      let i;
      for(i=0;i<this.ProductNum.length;i++){
        if(this.ProductNum[i]===0) {
          this.ProductTable.splice(i, 1);
          this.ProductNum.splice(i, 1);
        }
      }
      for(i=0;i<this.ProductNum.length;i++){
        if(i<this.ProductNum.length-1){
          this.opName=this.opName+this.ProductTable[i].id+' ';
          this.opNum=this.opNum+this.ProductNum[i]+' ';
        }else {
          this.opName=this.opName+this.ProductTable[i].id;
          this.opNum=this.opNum+this.ProductNum[i];
        }
      }
      console.log(this.opName);
      console.log(this.opNum)
    },


    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    add(index){
        this.ProductNum[index]++;
        this.$set(this.ProductNum,index,this.ProductNum[index]);
    },

    sub(index){
      if(this.ProductNum[index]>0){
        this.ProductNum[index]--;
        this.$set(this.ProductNum,index,this.ProductNum[index]);
      }
    },

    CreateSuccess(){
      this.$message({
        showClose: true,
        message: '创建成功',
        type: 'success',
        duration: 1000
      });
    },

    AddressMsgForm(){
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
          for(i=0;i<response.data.data.guest.addresses.length;i++){
            this.AddressTable.push(response.data.data.guest.addresses[i]);
          }
          //console.log(this.AddressTable)
        }
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
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
          for(i=0;i<response.data.data.storeList.length;i++){
            console.log(response.data.data.storeList[i])
            this.StoreTable.push(response.data.data.storeList[i]);
          }
        }
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    ProductListForm(){
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
        url:'http://localhost:8081/product/show/'+this.storeId,
        headers: header,
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
          let i;
          for(i=0;i<response.data.data.productList.length;i++){
            console.log(response.data.data.productList[i])
            this.ProductTable.push(response.data.data.productList[i]);
            this.ProductNum.push(0);
          }
          console.log(this.ProductNum)
        }
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    CreateOrderForm(){
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
        url:'http://localhost:8081/order/create/'+this.storeId+'/'+this.opName+'/'+this.opNum+'/'+this.g_id+'/'+this.addressId,
        headers: header,
      }).then((response)=>{
        console.log(response);
        if(response.data.code===0){
          this.CreateSuccess();
          this.drawer = false;
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
.storelist{
  list-style: none;
  color: #555666;
  font-size: 20px;
}
</style>
