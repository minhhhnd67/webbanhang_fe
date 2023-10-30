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
          <i class="el-icon-location"></i>
          <span>{{ route.meta.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :to="routeChild.path" v-for="(routeChild, idx) of route.children" :key="idx">{{ routeChild.meta.title }}</el-menu-item>
          <!-- <el-menu-item index="1-2">item one</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4" v-if="route.meta.role.includes('admin') && route.children === undefined">
        <i class="el-icon-setting"></i>
        <span>{{ route.meta.title }}</span>
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
.el-menu-item {
  min-width: none;
}
</style>
