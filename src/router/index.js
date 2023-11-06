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
      path: '/manager/categories',
      component: ManagerLayout,
      meta: {
        role: ["admin"],
        title: 'Danh mục sản phẩm',
        showMenu: true,
      },
      children: [
        {
          path: '/manager/categories/apple',
          component: () => import('./../components/manager/store/Index.vue'),
          meta: {
            role: ["admin"],
            title: 'Apple',
            showMenu: true,
          },
        },
        {
          path: '/manager/categories/banana',
          component: () => import('./../components/manager/Home.vue'),
          meta: {
            role: ["admin"],
            title: 'Banana',
            showMenu: true,
          },
        },
      ],
    },

    // manger-branch
    {
      path: '/manager/product',
      component: () => import('./../components/manager/Home.vue'),
      meta: {
        role: ["manager-branch"],
        title: 'Sản phẩm',
        showMenu: false,
      },
      children: [
        {
          path: '/manager/product/apple',
          component: () => import('./../components/manager/store/Index.vue'),
          meta: {
            role: ["manager-branch"],
            title: 'Apple',
            showMenu: false,
          },
        },
        {
          path: '/manager/product/banana',
          component: () => import('./../components/manager/Home.vue'),
          meta: {
            role: ["manager-branch"],
            title: 'Banana',
            showMenu: false,
          },
        },
      ],
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
        console.log(6868, localStorage.getItem('tokenBE'))
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
            console.log(124)
          });
    } else {
        next()
    }
    
  });


export default router
