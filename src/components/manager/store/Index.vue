<template>
  <el-container>
    <!-- <el-header
      class="navbar"
      style="
        padding: 25px 10px;
        font-size: 12px;
        background-color: rgb(255, 255, 255);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      "
    >
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
    </el-header> -->

    <el-main>
      <el-row type="flex" justify="end">
        <el-col :span="4"
          ><el-button type="success" @click="addStore()">Thêm mới</el-button></el-col
        >
      </el-row>
      <el-table
        :data="
          tableData.filter(
            (data) => !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column prop="name" label="Tên cơ sở" :span="6"> </el-table-column>
        <el-table-column prop="hotline" label="Hotline" :span="2"> </el-table-column>
        <el-table-column prop="address" label="Địa chỉ" :span="10"> </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              @click="test123(scope)"
              placeholder="Tìm kiếm theo tên cơ sở"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
// import router from "./../../router";
// import MBreadcrumb from "@/layouts/manager/Breadcrumb.vue";
import { logout } from "@/api/manager/auth";
import store from "@/store";
import route from "@/router";
import { listStore, deleteStore } from "@/api/manager/store.js";
export default {
  name: "M-Store-Index",
  // components: { MBreadcrumb },
  data() {
    return {
      tableData: [],
      search: "",
    };
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
    this.getListStore();
  },
  mounted() {},
  methods: {
    async handleLogout() {
      const response = await logout();
      if (response.data.code == 200) {
        store.state.is_login_manager = true;
        store.state.tokenBE = "";
        localStorage.setItem("tokenBE", "");
        this.$router.push({ name: "m-login" });
      }
    },
    addStore() {
      route.push({ name: "m-store-create" });
    },
    async getListStore() {
      const response = await listStore();
      if (response.data.code == 200) {
        this.tableData = response.data.data;
      } else {
        this.tableData = [];
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
      route.push({ name: "m-store-update", params: { id: row.id } });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("Xóa cơ sở này?", "Xác nhận xóa cơ sở", {
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(async () => {
          const response = await deleteStore(row.id);
          if (response.data.code == 200) {
            this.$message({
              type: "success",
              message: "Xóa thành công ",
            });
            this.getListStore();
          }
        })
        .catch((e) => {
          console.log(123, e);
          console.log("Đã hủy xóa");
        });
    },
    test123(scope) {
      console.log(scope);
    },
  },
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
