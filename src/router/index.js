import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from './../store'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'c-home',
        component: () => import('../components/HelloWorld.vue')
    },
    {
        path: '/user/login',
        name: 'c-login',
        component: () => import('../views/customer/login/Login.vue')
    },
    {
        path: '/manager/home',
        name: 'm-home',
        component: () => import('./../components/manager/Home.vue'),
        meta: {
          title: "Trang chủ",
          breadcrumb: "Trang chủ"
        }
    },
    {
      path: '/manager/home/one',
      name: 'm-home1',
      component: () => import('./../components/manager/Home.vue'),
      meta: {
        breadcrumb: "Trang chủ 1"
      }
  },
    {
        path: '/manager/login',
        name: 'm-login',
        component: () => import('../views/manager/login/Login.vue')
    },
    {
        path: '/close-window',
        name: 'm-close-window',
        component: () => import('../views/manager/login/CloseWindow.vue')
    },
    {
      path: '/manager/products',
      component: () => import('./../components/manager/Home.vue'),
      meta: {
        breadcrumb: 'Danh mục sản phẩm',
      },
      children: [
        {
          path: '/manager/products/apple',
          component: () => import('./../components/manager/Home.vue'),
          meta: {
            breadcrumb: 'Apple',
          },
        },
        {
          path: '/manager/products/banana',
          component: () => import('./../components/manager/Home.vue'),
          meta: {
            breadcrumb: 'Banana',
          },
        },
      ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    if (to.path.includes("manager") && !to.path.includes("login")) {
        console.log(6868, localStorage.getItem('token'))
        axios.get('http://127.0.0.1:8000/api/me', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }).then((response) => {
            if (response.status === 200) {
              store.state.permission = 1
              store.state.is_login_manager = false
              next();
              console.log("Da xac thuc")
            } else {
              next('/manager/login');
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
