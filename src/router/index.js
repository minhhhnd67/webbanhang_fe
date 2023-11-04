import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from './../store'
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
        }
    },
    {
        path: '/user/login',
        name: 'c-login',
        component: () => import('../views/customer/login/Login.vue'),
        meta: {
          role: "guest",
          title: "Đăng nhập",
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
      }
    },
    {
      path: '/manager/register',
      name: 'm-register',
      component: () => import('../views/manager/login/Register.vue'),
      meta: {
        role: ["guest"],
        title: "Đăng ký",
      }
    },
    {
      path: '/manager/login',
      name: 'm-login',
      component: () => import('../views/manager/login/Login.vue'),
      meta: {
        role: ["guest"],
        title: "Đăng nhập",
      }
    },
    {
        path: '/manager/home',
        name: 'm-home',
        component: () => import('./../components/manager/Home.vue'),
        meta: {
          role: ["admin", "manger-branch", "manager-store", "manager-warehouse"],
          title: "Trang chủ",
        }
    },
    {
      path: '/manager/store',
      name: 'm-store',
      component: () => import('./../components/manager/store/Index.vue'),
      meta: {
        role: ["admin"],
        title: "Quản lý cơ sở",
      },
      children: [
        {
          path: '/manager/store/list',
          component: () => import('./../components/manager/store/Index.vue'),
          meta: {
            role: ["admin"],
            title: 'Danh sách cơ sở',
          },
        },
        {
          path: '/manager/store/create',
          component: () => import('./../components/manager/store/Index.vue'),
          meta: {
            role: ["admin"],
            title: 'Thêm cơ sở mới',
          },
        },
      ]
    },
    {
      path: '/manager/categories',
      // component: () => import('./../components/manager/Home.vue'),
      meta: {
        role: ["admin"],
        title: 'Danh mục sản phẩm',
      },
      children: [
        {
          path: '/manager/categories/apple',
          component: () => import('./../components/manager/store/Index.vue'),
          meta: {
            role: ["admin"],
            title: 'Apple',
          },
        },
        {
          path: '/manager/categories/banana',
          component: () => import('./../components/manager/Home.vue'),
          meta: {
            role: ["admin"],
            title: 'Banana',
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
      },
      children: [
        {
          path: '/manager/product/apple',
          component: () => import('./../components/manager/store/Index.vue'),
          meta: {
            role: ["manager-branch"],
            title: 'Apple',
          },
        },
        {
          path: '/manager/product/banana',
          component: () => import('./../components/manager/Home.vue'),
          meta: {
            role: ["manager-branch"],
            title: 'Banana',
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
