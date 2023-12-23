<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="end">
        <el-col :span="4"
          ><el-button type="success" v-if="checkCreate" @click="addProduct()">Thêm mới</el-button></el-col
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
        <el-table-column prop="code" label="Mã sản phẩm" :span="6"> </el-table-column>
        <el-table-column prop="name" label="Tên sản phẩm" :span="2"> </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              @click="test123(scope)"
              placeholder="Tìm kiếm theo tên"
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
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="current_page"
          :page-size="page_size"
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import route from "@/router";
import store from "@/store";
import { listProduct, deleteProduct } from "@/api/manager/product.js";
export default {
  name: "M-Product-Index",
  components: {

  },
  data() {
    return {
      checkCreate: 0,
      roleCreate: ["admin", "manage_store"],
      mRole: "",
      storeId: 4,
      tableData: [],
      current_page: 1,
      page_size: 10,
      total: 100,
      search: "",
    };
  },
  computed: {
    thisRoute() {
      return this.$route;
    },
  },
  beforeCreate() {
    
  },
  created() {
    this.mRole = store.state.mRole;
    if (this.roleCreate.includes(this.mRole)) {
      this.checkCreate = 1;
    } else {
      this.checkCreate = 0;
    }
    console.log(567, this.mRole);
    this.getListProduct({storeId: this.storeId});
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
      this.getListProduct({storeId: this.storeId, page: val});
    },
    addProduct() {
      route.push({ name: "m-product-create" });
    },
    async getListProduct(parameters = {}) {
      const response = await listProduct(parameters);
      if (response.data.code == 200) {
        this.tableData = response.data.data.data;
        this.current_page = response.data.data.current_page;
        this.page_size = response.data.data.per_page;
        this.total = response.data.data.total;

      } else {
        this.tableData = [];
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
      route.push({ name: "m-product-update", params: { id: row.id } });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("Xóa sản phẩm này?", "Xác nhận xóa sản phẩm", {
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(async () => {
          const response = await deleteProduct(row.id);
          if (response.data.code == 200) {
            this.$message({
              type: "success",
              message: "Xóa thành công ",
            });
            this.getListProduct({storeId: this.storeId});
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
