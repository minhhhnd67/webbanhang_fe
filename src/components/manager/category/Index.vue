<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="end">
        <el-col :span="4"
          ><el-button type="success" @click="addCategory()">Thêm mới</el-button></el-col
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
        <el-table-column prop="name" label="Tên danh mục sản phẩm"> </el-table-column>
        <el-table-column prop="icon" label="Icon"> </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              @click="test123(scope)"
              placeholder="Tìm kiếm theo tên danh mục sản phẩm"
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
import { listCategory, deleteCategory } from "@/api/manager/category.js";
export default {
  name: "M-Category-Index",
  components: {

  },
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
  },
  created() {
    this.getListCategory();
  },
  mounted() {},
  methods: {
    addCategory() {
      route.push({ name: "m-category-create" });
    },
    async getListCategory() {
      const response = await listCategory();
      if (response.data.code == 200) {
        this.tableData = response.data.data;
      } else {
        this.tableData = [];
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
      route.push({ name: "m-category-update", params: { id: row.id } });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("Xóa danh mục sản phẩm này?", "Xác nhận xóa danh mục sản phẩm", {
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(async () => {
          const response = await deleteCategory(row.id);
          if (response.data.code == 200) {
            this.$message({
              type: "success",
              message: "Xóa thành công ",
            });
            this.getListCategory();
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
