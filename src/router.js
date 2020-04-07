import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./views/Admin.vue";
import Overview from "./views/Overview.vue";
import Products from "./views/Products.vue";
import Orders from "./views/Orders.vue";
import Profile from "./views/Profile.vue";
import ProductPage from "./views/ProductPage.vue";
import ProductAll from "./sections/ProductList.vue"
import ProductListMuslim from "./sections/ProductListMuslim.vue"
import Pembayaran from "./views/Pembayaran.vue"
import reviewPembayaran from "./views/ReviewPembayaran.vue"
import CheckoutFinish from "./views/CheckoutFinish.vue"
import UserOrder from "./views/UserOrder.vue"
import AdminPage from "./views/AdminPage.vue"
import Informasi from "./sections/Informasi.vue"
import News from "./views/News.vue"
import NewsDetail from "./views/NewsDetail.vue"
import Chat from "./views/Chat.vue"
import AdminChat from "./sections/AdminChat.vue"
import ChatList from "./sections/ChatList.vue"

import {fb} from './firebase';

Vue.use(Router);

const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: "overview",
          name: "overview",
          component: Overview
        },
        {
          path: "products",
          name: "products",
          component: Products
        },
        {
          path: "profile",
          name: "profile",
          component: Profile
        },
        {
          path: "orders",
          name: "orders",
          component: Orders
        }
      ]
    },
    {
      path: "/adminPage",
      name: "adminPage",
      component: AdminPage,
      children: [
        {
          path: "informasi",
          name: "informasi",
          component: Informasi
        },
        {
          path: "chatList",
          name: "chatList",
          component: ChatList
        },
        {
          path: "adminChat",
          name: "adminChat",
          component: AdminChat
        }
      ]
    },
    {
      path: "/productDetail",
      name: "productDetail",
      component: () =>
      import("./views/ProductDetail.vue")
    },
    {
      path: "/pembayaran",
      name: "pembayaran",
      component: Pembayaran,
      meta: { requiresAuth: true }
    },
    {
      path: "/reviewPembayaran",
      name: "reviewPembayaran",
      component: reviewPembayaran
    },
    {
      path: "/checkoutFinish",
      name: "checkoutFinish",
      component: CheckoutFinish
    },
    {
      path: "/userOrder",
      name: "userOrder",
      component: UserOrder
    },
    {
      path: "/productPage",
      name: "productPage",
      component: ProductPage,
      children: [
        {
          path: "/productAll",
          name: "productAll",
          component: ProductAll
        },
        {
          path: "/productMuslim",
          name: "productMuslim",
          component: ProductListMuslim
        }
      ]
    },
    {
      path: "/news",
      name: "news",
      component: News
    },
    { 
      path: "/newsDetail",
      name: "newsDetail",
      component: NewsDetail
    },
    {
      path: "/chat",
      name: "Chat",
      component: Chat,
      props: true
    },
    {
      path: "/checkout",
      name: "checkout",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Checkout.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

    if (requiresAuth && !currentUser) {
      next('/')
    } else if(requiresAuth && currentUser) {
      next()
    } else {
      next()
    }
   
})

export default router;
