import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Content/Main";
import Login from "../views/Login/Login";
import RegisterMain from "../views/Register/RegisterMain";
import OrderList from "../views/Content/Public/OrderList";
import Abnormal from "../views/Content/Public/Abnormal";
import ReGuestMsg from "../views/Content/Guest/ReGuestMsg";
import ListOfGoods from "../views/Content/Store/ListOfGoods";
import BackStageMain from "../views/Content/Public/BackStageMain";
import ManageStore from "../views/Content/User/ManageStore";
import ManageDeliver from "../views/Content/User/ManageDeliver";
import ManageGuest from "../views/Content/User/ManageGuest";
import ReStoreMsg from "../views/Content/Store/ReStoreMsg";
import ReDeliverMsg from "../views/Content/Deliver/ReDeliverMsg";
import CreateNewOrder from "../views/Content/Guest/CreateNewOrder";
import GuestRegister from "../views/Register/Child/GuestRegister"
import StoreRegister from "../views/Register/Child/StoreRegister";
import DeliverRegister from "../views/Register/Child/DeliverRegister";
import AdminRegister from "../views/Register/Child/AdminRegister";

Vue.use(VueRouter);

export default new VueRouter({
  mode:"history",
  routes: [
    {
      path: '/Main',
      component: Main,
      children:[
        {
          name:'后台主页',
          path:'/',
          component: BackStageMain
        },
        {
          name: '新增订单',
          path: '/CreateNewOrder',
          component: CreateNewOrder
        },
        {
          name: '订单列表',
          path: '/OrderList',
          component: OrderList
        },
        {
          name: '异常报告',
          path: '/Abnormal',
          component: Abnormal
        },
        {
          name: '更新顾客信息',
          path: '/ReGuestMsg',
          component: ReGuestMsg
        },
        {
          name: '更新商家信息',
          path: '/ReStoreMsg',
          component: ReStoreMsg
        },
        {
          name: '更新骑手信息',
          path: '/ReDeliverMsg',
          component: ReDeliverMsg
        },
        {
          name: '商品列表',
          path: '/ListOfGoods',
          component: ListOfGoods
        },
        {
          name: '管理商家',
          path: '/ManageStore',
          component: ManageStore
        },
        {
          name: '管理顾客',
          path: '/ManageGuest',
          component: ManageGuest
        },
        {
          name: '管理骑手',
          path: '/ManageDeliver',
          component: ManageDeliver
        }
      ]
    },
    {
      name: '登录页面',
      path: '/',
      component: Login
    },
    {
      path: '/RegisterMain',
      component: RegisterMain,
      children: [
        {
          name: '顾客注册',
          path: '/GuestRegister',
          component: GuestRegister
        },
        {
          name: '商家注册',
          path: '/StoreRegister',
          component: StoreRegister
        },
        {
          name: '骑手注册',
          path: '/DeliverRegister',
          component: DeliverRegister
        },
        {
          name: '管理员注册',
          path: '/AdminRegister',
          component: AdminRegister
        }
      ]
    }
  ]
  })
