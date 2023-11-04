<template>
  <el-col :span="4">
    <el-menu
      style="height: 100vh"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
    <div :key="index" v-for="(route, index) in routes">
      <el-submenu v-if="route.meta.role.includes('admin') && route.children !== undefined">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <span>{{ route.meta.title }}</span>
        </template>
        <el-menu-item-group>
          <!-- <el-menu-item :index="routeChild.path" v-for="(routeChild, idx) of route.children" :key="idx"><a :href="routeChild.path">{{ routeChild.meta.title }}</a></el-menu-item> -->
          <el-menu-item :index="routeChild.path" v-for="(routeChild, idx) of route.children" :key="idx">
            <router-link :to="routeChild.path" style="width: 100%;">
              {{ routeChild.meta.title }}
            </router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4" v-if="route.meta.role.includes('admin') && route.children === undefined">
        <router-link :to="route.path" style="width: 100%;">
          <!-- <i class="el-icon-setting"></i> -->
          <span>{{ route.meta.title }}</span>
        </router-link>
        
      </el-menu-item>
    </div>
      
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
    console.log(123, this.routes)
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
