<template>
  <div>
    <h2>订单列表</h2>
  <el-table :data="orderTable" style="width: 100%" stripe>
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="订单商品">
            <span v-for="(item,index) in scope.row.productPackages">{{ item.product.name }}————{{ item.num }}份</span>
          </el-form-item>
          <el-form-item label="顾客电话">
            <span>{{ scope.row.guest.telephone }}</span>
          </el-form-item>
          <el-form-item label="商家电话">
            <span>{{ scope.row.store.telephone }}</span>
          </el-form-item>
          <el-form-item label="下单时间">
            <span>{{ scope.row.time }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column label="订单号" width="70px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="订单状态" width="160px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.message }}</span>
      </template>
    </el-table-column>
    <el-table-column label="下单时间" width="300px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="骑手名" width="130px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.o_d_name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="商家名" width="130px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.store.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="顾客名" width="130px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.guest.name}}</span>
      </template>
    </el-table-column>
    <el-table-column label="收货地址" width="200px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.address.addressString }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" id="guestReceive" v-if=ifShow(guestReceive) @click="GuestReceiveForm()">确认收货</el-button>
        <el-button size="mini" id="orderBack" v-if=ifShow(orderBack) @click="orderBackForm()">回滚</el-button>
        <el-button size="mini" id="storeReceive" v-if=ifShow(storeReceive) @click="storeReceiveForm()">接单</el-button>
        <el-button size="mini" id="deliverReceive" v-if=ifShow(deliverReceive) @click="deliverReceiveForm()">接单</el-button>
        <el-button size="mini" id="orderEdit" v-if=ifShow(orderEdit) @click="orderEditForm()">编辑</el-button>
        <el-button size="mini" id="orderDelete" v-if=ifShow(orderEdit) type="danger" @click="orderDeleteForm()">删除</el-button>
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
      orderTable:[],
      userType: '',
      guestReceive : { guest: true, store: false, deliver: false, admin: false },
      orderEdit: { guest: false, store: false, deliver: false, admin: true },
      orderBack: { guest: false, store: false, deliver: false, admin: true },
      orderDelete: { guest: false, store: false, deliver: false, admin: true },
      storeReceive: { guest: false, store: true, deliver: false, admin: false },
      deliverReceive: { guest: false, store: false, deliver: true, admin: false },
    }
  },

  beforeRouteEnter(to,from,next){
    next(vm => {
      vm.OrderShowForm();
    })
  },

  methods: {




    ifShow(buttonType){
      this.userType=this.$store.state.type;
      return buttonType[this.userType];
    },

    OrderShowForm(){
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
        url:'http://localhost:8081/order/show',
        headers: header,
      }).then((response)=>{
        console.log(response);
        let i;
        for(i=0;i<response.data.data.orderList.length;i++){
          this.orderTable.push(response.data.data.orderList[i]);
        }
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    OrderListForm(){
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
        url:'http://localhost:8081/take/'+this.o_id,
        headers: header,
      }).then((response)=>{
        console.log(response);

      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    GuestReceiveForm(){
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
        url:'http://localhost:8081/take/'+this.o_id,
        headers: header,
      }).then((response)=>{
        console.log(response);

      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    orderEditForm(){
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
        url:'http://localhost:8081/user/edit/'+this.o_id+'/'+this.d_id+'/'+this.s_id+'/'+this.g_id+'/'+this.a_id,
        headers: header,
      }).then((response)=>{
        console.log(response);
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    orderDeleteForm(){
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
        url:'http://localhost:8081/user/delete/'+this.o_id,
        headers: header,
      }).then((response)=>{
        console.log(response);
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    orderBackForm(){
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
        url:'http://localhost:8081/user/rollback/'+this.o_id+'/'+this.o_msg,
        headers: header,
      }).then((response)=>{
        console.log(response);
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    storeReceiveForm(){
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
        url:'http://localhost:8081/store/take/'+this.o_id,
        headers: header,
      }).then((response)=>{
        console.log(response);
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

    deliverReceiveForm(){
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
        url:'',
        headers: header,
      }).then((response)=>{
        console.log(response);
      })
        .catch((error)=>{
          console.log(error);   /*抓错*/
        });
    },

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
