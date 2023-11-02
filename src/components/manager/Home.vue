<template>
  <el-container>
    <el-header class="navbar" style="padding: 25px 10px; font-size: 12px; background-color: rgb(255, 255, 255);box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);">
      <el-row :span="24">
        <el-col :span="21"><MBreadcrumb :routeMatched="thisRoute.matched" /></el-col>
        <el-col :span="3" class="right">
          <el-dropdown placement="right-start">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Profile</el-dropdown-item>
              <el-dropdown-item @click="handleLogout()">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span @click="handleLogout()">Tom</span>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-table>
        <el-table-column prop="date" label="Date" width="140"> </el-table-column>
        <el-table-column prop="name" label="Name" width="120"> </el-table-column>
        <el-table-column prop="address" label="Address"> </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
// import router from "./../../router";
import MBreadcrumb from "./../../layouts/manager/Breadcrumb.vue";
import { logout } from './.././../api/manager/auth'
import store from "./../../store"
export default {
  name: "M-Helloword",
  components: { MBreadcrumb },
  data() {
    return {};
  },
  computed: {
    thisRoute() {
      return this.$route;
    },
    breadcrumbs() {
      var breadcrumbs = [];
      var currentRoute = this.$route;
      console.log(666, currentRoute);

      while (currentRoute.parent) {
        console.log(currentRoute.parent);
        breadcrumbs.push({
          name: currentRoute.parent.meta.breadcrumb,
        });
        currentRoute = currentRoute.parent;
      }
      return breadcrumbs;
    },
  },
  created() {
  },
  methods: {
    async handleLogout() {
      console.log(6789)
      const response = await logout()
      if (response.data.code == 200) {
        store.state.is_login_manager = true
        store.state.tokenBE = ''
        localStorage.setItem('tokenBE', '');
        this.$router.push({ name: "m-login" });
      }
    }
  },
};
</script>
