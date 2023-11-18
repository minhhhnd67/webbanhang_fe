import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from './../store'
import ManagerLayout from "@/layouts/manager/Index.vue"
Vue.use(VueRouter)

const routes = [
    // Route Guest, User
    {
        path: '/',
        name: 'c-home',
        component: () => import('../components/HelloWorld.vue'),
        meta: {
          role: ["guest", "user"],
          title: "Trang chủ",
          showMenu: false,
        }
    },
    {
        path: '/user/login',
        name: 'c-login',
        component: () => import('../views/customer/login/Login.vue'),
        meta: {
          role: "guest",
          title: "Đăng nhập",
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
          role: ["admin", "manger-branch", "manager-store", "manager-warehouse"],
          title: "Trang chủ",
          showMenu: true,
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
        role: ["admin"],
        title: "Quản lý tài khoản",
        showMenu: true,
      },
      children: [
        {
          path: '/manager/user/list',
          name: 'm-user-list',
          component: () => import('./../components/manager/user/Index.vue'),
          meta: {
            role: ["admin"],
            title: 'Danh sách tài khoản',
            showMenu: true,
          },
        },
        {
          path: '/manager/user/create',
          name: 'm-user-create',
          component: () => import('./../components/manager/user/Create.vue'),
          meta: {
            role: ["admin"],
            title: 'Thêm tài khoản mới',
            showMenu: true,
          },
        },
        {
          path: '/manager/user/:id/update',
          name: 'm-user-update',
          component: () => import('./../components/manager/user/Update.vue'),
          meta: {
            role: ["admin"],
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
        role: ["admin"],
        title: "Quản lý sản phẩm",
        showMenu: true,
      },
      children: [
        {
          path: '/manager/product/list',
          name: 'm-product-list',
          component: () => import('./../components/manager/product/Index.vue'),
          meta: {
            role: ["admin"],
            title: 'Danh sách sản phẩm',
            showMenu: true,
          },
        },
        {
          path: '/manager/product/create',
          name: 'm-product-create',
          component: () => import('./../components/manager/product/Create.vue'),
          meta: {
            role: ["admin"],
            title: 'Thêm sản phẩm mới',
            showMenu: true,
          },
        },
        {
          path: '/manager/product/:id/update',
          name: 'm-product-update',
          component: () => import('./../components/manager/product/Update.vue'),
          meta: {
            role: ["admin"],
            title: 'Cập nhật thông tin sản phẩm',
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
    if (to.path.includes("manager") && !to.path.includes("login") && !to.path.includes("register")) {
        axios.get('http://127.0.0.1:8000/api/me', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('tokenBE')}`,
              'Accept': 'application/json'
            },
          }).then((response) => {
            if (response.status === 200) {
              store.state.role = 'admin'
              store.state.is_login_manager = false
              next();
              console.log("Da xac thuc")
            } else {
              if (to.path.includes("register")) {
                next('/manager/register');
              } else {
                next('/manager/login');
              }
            }
          }).catch((error) => {
            console.log(444, error)
            next('/manager/login')
          });
    } else {
        next()
    }
    
  });


export default router
