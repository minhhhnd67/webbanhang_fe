<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="end">
        <el-col :span="4">
          <el-button type="success" v-if="checkCreate" @click="addOrder()">Thêm mới</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4">
          <el-input placeholder="Mã đơn hàng" v-model="search_code"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="search_type" placeholder="Loại đơn hàng">
            <el-option
              v-for="item in listTypeOrder"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="search_status" placeholder="Trạng thái">
            <el-option
              v-for="item in listStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="success" @click="searchListOrder" icon="el-icon-search"></el-button>
        </el-col>
      </el-row> 
      <el-table
        :data="
          tableData.filter(
            (data) => !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column prop="code" label="Code"></el-table-column>

        <el-table-column label="Loại đơn hàng">
          <template slot-scope="scope">
            {{ showTypeOrder(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái">
          <template slot-scope="scope">
            {{ showStatus(scope.row.status) }}
          </template> </el-table-column
        >el-table>
        <el-table-column prop="name" label="Tên"> </el-table-column>
        <el-table-column prop="total_money" label="Tổng tiền"> </el-table-column>
        <el-table-column label="Địa chỉ">
          <template slot-scope="scope">
            <span style="white-space: pre-wrap">
              {{ scope.row.address }}
            </span>
          </template>
        </el-table-column>
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
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
              Edit</el-button
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
import { listOrder, deleteOrder } from "@/api/manager/order.js";
import { getStatusOrder, getTypeOrder } from "@/utils/helper.js";
export default {
  name: "M-Order-Index",
  components: {},
  data() {
    return {
      checkCreate: 0,
      roleCreate: ["admin", "manage_store", "staff"],
      mRole: "",
      storeId: "",
      tableData: [],
      current_page: 1,
      page_size: 5,
      total: 100,
      search: "",
      listStatus: [],
      listTypeOrder: [],
      search_status: "",
      search_type: "",
      search_code: "",
    };
  },
  computed: {
    thisRoute() {
      return this.$route;
    },
  },
  created() {
    console.log(888, store.state.mUser);
    this.storeId = store.state.mUser.store_id;
    this.mRole = store.state.mRole;
    if (this.roleCreate.includes(this.mRole)) {
      this.checkCreate = 1;
    } else {
      this.checkCreate = 0;
    }
    this.listStatus = getStatusOrder();
    this.listStatus.unshift({
      id: 0,
      name: "Tất cả"
    });
    this.listTypeOrder = getTypeOrder();
    this.listTypeOrder.unshift({
      id: 0,
      name: "Tất cả"
    });
    this.getListOrder({ storeId: this.storeId });
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
      this.getListOrder({ storeId: this.storeId, page: val });
    },
    addOrder() {
      route.push({ name: "m-order-create" });
    },
    async getListOrder(parameters = {}) {
      const response = await listOrder(parameters);
      if (response.data.code == 200) {
        this.tableData = response.data.data.data;
        this.current_page = response.data.data.current_page;
        this.page_size = response.data.data.per_page;
        this.total = response.data.data.total;
      } else {
        this.tableData = [];
      }
    },
    async searchListOrder() {
      let parameters = {
        storeId: this.storeId,
        search_status: this.search_status,
        search_type: this.search_type,
        search_code: this.search_code,
      };
      const response = await listOrder(parameters);
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
      route.push({ name: "m-order-update", params: { id: row.id } });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("Xóa tài khoản này?", "Xác nhận xóa tài khoản", {
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(async () => {
          const response = await deleteOrder(row.id);
          if (response.data.code == 200) {
            this.$message({
              type: "success",
              message: "Xóa thành công ",
            });
            this.getListOrder({ storeId: this.storeId });
          }
        })
        .catch((e) => {
          console.log(123, e);
          console.log("Đã hủy xóa");
        });
    },
    showTypeOrder(typeId) {
      let typeOrder = this.listTypeOrder.filter((obj) => {
        return obj.id == typeId;
      });
      return typeOrder[0].name;
    },
    showStatus(statusId) {
      let status = this.listStatus.filter((obj) => {
        return obj.id == statusId;
      });
      return status[0].name;
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
