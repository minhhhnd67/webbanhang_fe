<template>
  <el-container>
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
import route from "@/router";
import { listStore, deleteStore } from "@/api/manager/store.js";
export default {
  name: "M-Store-Index",
  components: {

  },
  data() {
    return {
      tableData: [],
      search: "",
      loading: true
    };
  },
  computed: {
    thisRoute() {
      return this.$route;
    },
  },
  created() {
    this.getListStore();
  },
  mounted() {},
  methods: {
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
