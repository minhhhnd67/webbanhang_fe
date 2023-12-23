import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from './../store'
import ManagerLayout from "@/layouts/manager/Index.vue"
import CustomerLayout from "@/layouts/customer/Index.vue"
import { getRoles } from "@/utils/helper.js"
Vue.use(VueRouter)

const routes = [
    // Route Guest, User
    {
      path: '/',
      name: 'c-display',
      component: CustomerLayout,
      meta: {
        role: ["guest", "user"],
        title: "Trang chủ",
        showMenu: true,
        icon: "el-icon-s-home"
      },
      children: [
        {
          path: '/',
          name: 'c-home',
          component: () => import('./../components/customer/Home.vue'),
          meta: {
            role: ["guest", "user"],
            title: 'Trang chủ',
            showMenu: false,
          },
        },
        {
          path: '/category/:category_id/product',
          name: 'c-product-category',
          component: () => import('./../components/customer/ProductCategory.vue'),
          meta: {
            role: ["guest", "user"],
            title: 'Danh sách sản phẩm theo danh mục',
            showMenu: false,
          },
        },
        {
          path: '/product/:id/show',
          name: 'c-product-detail',
          component: () => import('./../components/customer/ProductDetail.vue'),
          meta: {
            role: ["guest", "user"],
            title: 'Chi tiết sản phẩm',
            showMenu: false,
          },
        },
        {
          path: '/cart',
          name: 'c-cart',
          component: () => import('./../components/customer/Cart.vue'),
          meta: {
            role: ["guest", "user"],
            title: 'Giỏ hàng',
            showMenu: false,
          },
        },
        {
          path: '/login',
          name: 'c-login',
          component: () => import('./../components/customer/Login.vue'),
          meta: {
            role: ["guest"],
            title: 'Đăng nhập',
            showMenu: false,
          },
        },
        {
          path: '/register',
          name: 'c-register',
          component: () => import('./../components/customer/Register.vue'),
          meta: {
            role: ["guest"],
            title: 'Đăng ký',
            showMenu: false,
          },
        },
        {
          path: '/profile',
          name: 'c-profile',
          component: () => import('./../components/customer/Profile.vue'),
          meta: {
            role: ["user"],
            title: 'Thông tin tài khoản',
            showMenu: false,
          },
        },
        {
          path: '/order',
          name: 'c-order',
          component: () => import('./../components/customer/Order.vue'),
          meta: {
            role: ["user"],
            title: 'Danh sách đơn hàng',
            showMenu: false,
          },
        },
      ]
    },
    {
      path: '/payment/sucess',
      name: 'c-payment-success',
      component: () => import('@/views/customer/payment/Success.vue'),
      meta: {
        role: ["guest"],
        title: "Thanh toán thành công",
        showMenu: false,
      }
    },
    

    // Route Admin, Manager
    {
      path: '/close-window',
      name: 'm-close-window',
      component: () => import('../views/manager/login/CloseWindow.vue'),
      meta: {
        role: ["guest"],
        title: "Đăng nhập",
        showMenu: false,
      }
    },
    {
      path: '/manager/register',
      name: 'm-register',
      component: () => import('../views/manager/login/Register.vue'),
      meta: {
        role: ["guest"],
        title: "Đăng ký",
        showMenu: false,
      }
    },
    {
      path: '/manager/login',
      name: 'm-login',
      component: () => import('../views/manager/login/Login.vue'),
      meta: {
        role: ["guest"],
        title: "Đăng nhập",
        showMenu: false,
      }
    },
    {
        path: '/manager/home',
        name: 'm-home',
        component: () => import('./../components/manager/Home.vue'),
        meta: {
          role: ["admin", "manage_store", "manage_warehouse", "staff"],
          title: "Trang chủ",
          showMenu: true,
          icon: "el-icon-s-home"
        }
    },
    {
      path: '/manager/store',
      name: 'm-store',
      component: ManagerLayout,
      meta: {
        role: ["admin"],
        title: "Quản lý cơ sở",
        showMenu: true,
        icon: "el-icon-s-shop"
      },
      children: [
        {
          path: '/manager/store/list',
          name: 'm-store-list',
          component: () => import('./../components/manager/store/Index.vue'),
          meta: {
            role: ["admin"],
            title: 'Danh sách cơ sở',
            showMenu: true,
          },
        },
        {
          path: '/manager/store/create',
          name: 'm-store-create',
          component: () => import('./../components/manager/store/Create.vue'),
          meta: {
            role: ["admin"],
            title: 'Thêm cơ sở mới',
            showMenu: true,
          },
        },
        {
          path: '/manager/store/:id/update',
          name: 'm-store-update',
          component: () => import('./../components/manager/store/Update.vue'),
          meta: {
            role: ["admin"],
            title: 'Cập nhật thông tin cơ sở',
            showMenu: false,
          },
        },
      ]
    },
    {
      path: '/manager/user',
      name: 'm-user',
      component: ManagerLayout,
      meta: {
        role: ["admin", 'manage_store'],
        title: "Quản lý tài khoản",
        showMenu: true,
        icon: "el-icon-user-solid"
      },
      children: [
        {
          path: '/manager/user/list',
          name: 'm-user-list',
          component: () => import('./../components/manager/user/Index.vue'),
          meta: {
            role: ["admin", "manage_store"],
            title: 'Danh sách tài khoản',
            showMenu: true,
          },
        },
        {
          path: '/manager/user/create',
          name: 'm-user-create',
          component: () => import('./../components/manager/user/Create.vue'),
          meta: {
            role: ["admin", "manage_store"],
            title: 'Thêm tài khoản mới',
            showMenu: true,
          },
        },
        {
          path: '/manager/user/profile',
          name: 'm-user-profile',
          component: () => import('./../components/manager/user/Profile.vue'),
          meta: {
            role: ["admin", "manage_store"],
            title: 'Thông tin tài khoản',
            showMenu: false,
          },
        },
        {
          path: '/manager/user/:id/update',
          name: 'm-user-update',
          component: () => import('./../components/manager/user/Update.vue'),
          meta: {
            role: ["admin", "manage_store"],
            title: 'Cập nhật thông tin tài khoản',
            showMenu: false,
          },
        },
      ]
    },
    {
      path: '/manager/category',
      name: 'm-category',
      component: ManagerLayout,
      meta: {
        role: ["admin"],
        title: "Quản lý Danh mục sản phẩm",
        showMenu: true,
        icon: "el-icon-s-grid"
      },
      children: [
        {
          path: '/manager/category/list',
          name: 'm-category-list',
          component: () => import('./../components/manager/category/Index.vue'),
          meta: {
            role: ["admin"],
            title: 'Danh sách danh mục sản phẩm',
            showMenu: true,
          },
        },
        {
          path: '/manager/category/create',
          name: 'm-category-create',
          component: () => import('./../components/manager/category/Create.vue'),
          meta: {
            role: ["admin"],
            title: 'Thêm danh mục sản phẩm mới',
            showMenu: true,
          },
        },
        {
          path: '/manager/category/:id/update',
          name: 'm-category-update',
          component: () => import('./../components/manager/category/Update.vue'),
          meta: {
            role: ["admin"],
            title: 'Cập nhật thông tin danh mục sản phẩm',
            showMenu: false,
          },
        },
      ]
    },
    {
      path: '/manager/product',
      name: 'm-product',
      component: ManagerLayout,
      meta: {
        role: ["admin", "manage_store", "manage_warehouse", "staff"],
        title: "Quản lý sản phẩm",
        showMenu: true,
        icon: "el-icon-s-cooperation"
      },
      children: [
        {
          path: '/manager/product/list',
          name: 'm-product-list',
          component: () => import('./../components/manager/product/Index.vue'),
          meta: {
            role: ["admin", "manage_store", "manage_warehouse", "staff"],
            title: 'Danh sách sản phẩm',
            showMenu: true,
          },
        },
        {
          path: '/manager/product/create',
          name: 'm-product-create',
          component: () => import('./../components/manager/product/Create.vue'),
          meta: {
            role: ["admin", "manage_store", "manage_warehouse"],
            title: 'Thêm sản phẩm mới',
            showMenu: true,
          },
        },
        {
          path: '/manager/product/:id/update',
          name: 'm-product-update',
          component: () => import('./../components/manager/product/Update.vue'),
          meta: {
            role: ["admin", "manage_store", "manage_warehouse"],
            title: 'Cập nhật thông tin sản phẩm',
            showMenu: false,
          },
        },
      ]
    },
    {
      path: '/manager/order',
      name: 'm-order',
      component: ManagerLayout,
      meta: {
        role: ["admin", "manage_store", "manage_warehouse", "staff"],
        title: "Quản lý đơn hàng",
        showMenu: true,
        icon: "el-icon-shopping-cart-2"
      },
      children: [
        {
          path: '/manager/order/list',
          name: 'm-order-list',
          component: () => import('./../components/manager/order/Index.vue'),
          meta: {
            role: ["admin", "manage_store","manage_warehouse", "staff"],
            title: 'Danh sách đơn hàng',
            showMenu: true,
          },
        },
        {
          path: '/manager/order/create',
          name: 'm-order-create',
          component: () => import('./../components/manager/order/Create.vue'),
          meta: {
            role: ["admin", "manage_store", "staff"],
            title: 'Thêm đơn hàng mới',
            showMenu: true,
          },
        },
        {
          path: '/manager/order/:id/update',
          name: 'm-order-update',
          component: () => import('./../components/manager/order/Update.vue'),
          meta: {
            role: ["admin", "manage_store", "manage_warehouse", "staff"],
            title: 'Cập nhật thông tin đơn hàng',
            showMenu: false,
          },
        },
      ]
    },
]

export {routes}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    document.title = "Mobi Store";
    if (to.path.includes("manager") && !to.path.includes("login") && !to.path.includes("register")) {
        axios.get('http://127.0.0.1:8000/api/me', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('tokenBE')}`,
              'Accept': 'application/json'
            },
          }).then((response) => {
            console.log(1234, response);
            if (response.data.code === 200) {
              store.state.mUser = response.data.data;
              let listRole = getRoles();
              console.log(555, listRole);
              let mRole = listRole.find((item) => {
                return item.id == response.data.data.role;
              });
              store.state.mRole = mRole.code;
              console.log(666, mRole);
              store.state.is_login_manager = false;
              next();
              console.log("Da xac thuc");
            } else {
              if (to.path.includes("register")) {
                next('/manager/register');
              } else {
                next('/manager/login');
              }
            }
          }).catch((error) => {
            console.log(400, error);
            next('/manager/login');
          });
    } else {
      if (to.path.includes("manager") && (to.path.includes("login") || to.path.includes("register"))) {
        axios.get('http://127.0.0.1:8000/api/me', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('tokenBE')}`,
              'Accept': 'application/json'
            },
          }).then((response) => {
            if (response.data.code === 200) {
              store.state.mRole = 'admin';
              store.state.is_login_manager = false;
              next('/manager/home');
              console.log("Da xac thuc");
            } else {
              if (to.path.includes("register")) {
                next('/manager/register');
              } else {
                next('/manager/login');
              }
            }
          }).catch((error) => {
            console.log(400, error);
            next();
          });
      } else {
        next();
      }
    }
    
  });


export default router
