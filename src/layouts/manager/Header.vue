<template>
  <el-header
    class="navbar"
    style="
      padding: 25px 10px;
      font-size: 12px;
      background-color: rgb(255, 255, 255);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    "
  >
    <el-row :span="24">
      <el-col :span="13"><MBreadcrumb :routeMatched="thisRoute.matched" /></el-col>
      <el-col :span="5" style="margin-top: -15px; margin-right: 10px;">
        <el-select v-model="store_id" placeholder="Chi nhánh">
          <el-option
            v-for="item in listStore"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3"><span> Admin - Ngo Duc Minh</span></el-col>
      <el-col :span="2" style="margin-top: -10px;">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :size="40" :src="circleUrl"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="profile()">Profile</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click="handleLogout()">Logout</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>
<script>
import MBreadcrumb from "@/layouts/manager/Breadcrumb.vue";
import { logout } from "@/api/manager/auth";
import store from "@/store";
import { listStore } from "@/api/manager/store.js";

export default {
  name: "ManageHeader",
  components: { MBreadcrumb },
  data() {
    return {
      store_id: "",
      listStore: [],
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  watch: {
    "store_id": {
      handler: function () {
        store.state.mUser.store_id = this.store_id;
        this.$router.push({ name: "m-home" }).catch(() => {});
      },
      deep: true,
    },
  },
  computed: {
    thisRoute() {
      return this.$route;
    },
    breadcrumbs() {
      var breadcrumbs = [];
      var currentRoute = this.$route;

      while (currentRoute.parent) {
        breadcrumbs.push({
          name: currentRoute.parent.meta.breadcrumb,
        });
        currentRoute = currentRoute.parent;
      }
      return breadcrumbs;
    },
  },
  created() {
    this.getListStores();
  },
  mounted() {
    this.store_id = store.state.mUser.store_id;
  },
  methods: {
    async handleLogout() {
      const response = await logout();
      if (response.data.code == 200) {
        store.state.is_login_manager = true;
        store.state.tokenBE = "";
        store.state.mUser = {};
        localStorage.setItem("tokenBE", "");
        this.$router.push({ name: "m-login" });
      }
    },
    profile() {
      this.$router.push({ name: "m-user-profile" }).catch(() => {});
    },
    async getListStores() {
      const response = await listStore();
      if (response.data.code == 200) {
        this.listStore = response.data.data;
      }
    },
  }
};
</script>
