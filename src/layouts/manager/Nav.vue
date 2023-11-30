<template>
  <el-col :span="24">
    <el-menu
      style="height: 100vh;"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
    <template v-for="(route, index) in routes">
      <el-submenu :index="index" v-if="route.meta.role.includes('admin') && route.children !== undefined" :key="index">
        <template slot="title">
          <i :class="route.meta.icon"></i>
          <span>{{ route.meta.title }}</span>
        </template>
        <el-menu-item-group>
          <!-- <el-menu-item :index="routeChild.path" v-for="(routeChild, idx) of route.children" :key="idx"><a :href="routeChild.path">{{ routeChild.meta.title }}</a></el-menu-item> -->
          <div :index="`${index}-${idx}`" v-for="(routeChild, idx) of route.children" :key="idx">
            <el-menu-item v-if="routeChild.meta.showMenu">
              <router-link :to="routeChild.path" style="width: 100%;">
                {{ routeChild.meta.title }}
              </router-link>
            </el-menu-item>
          </div>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :index="index" v-if="route.meta.role.includes('admin') && route.meta.showMenu && route.children === undefined" :key="index">
        <router-link :to="route.path" style="width: 100%;">
          <i :class="route.meta.icon"></i>
          <span>{{ route.meta.title }}</span>
        </router-link>
        
      </el-menu-item>
    </template>
    </el-menu>
  </el-col>
</template>
<script>
import router from './../../router'
import { routes } from './../../router'

export default {
  name: "ManagerNav",
  data() {
    return {
      routes: routes,
    }
  },
  computed: {
    listRoutes () {
      return router.getRoutes
    }
  }, 
  components: {  },
  mounted() {
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped>
.el-submenu .el-menu-item {
  min-width: 100px!important;
}

a {
  text-decoration: none;
  color: #ffffff;
}
</style>
