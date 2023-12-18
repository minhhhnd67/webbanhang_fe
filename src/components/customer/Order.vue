<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col style="background-color: #f0e7e3; border-radius: 20px" :span="22">
          <el-row style="padding: 10px" type="flex" justify="center" :gutter="30">
            <el-col :span="3">
              <p><b>Mã đơn hàng</b></p>
            </el-col>
            <el-col :span="6">
              <p><b>Tên sản phẩm</b></p>
            </el-col>
            <el-col :span="3">
              <p><b>Giá</b></p>
            </el-col>
            <el-col :span="2">
              <p><b>Số lượng</b></p>
            </el-col>
            <el-col :span="3">
              <p><b>Tổng tiền</b></p>
            </el-col>
            <el-col :span="3">
              <p><b>Trạng thái</b></p>
            </el-col>
            <el-col :span="1">
              <el-link></el-link>
            </el-col>
          </el-row>
          <el-row
            v-for="(order, index) in listOrders"
            :key="index"
            style="padding: 10px"
            type="flex"
            justify="center"
            :gutter="30"
          >
            <el-col :span="3">
              <p>{{ order.code }}</p>
            </el-col>
            <el-col :span="6">
              <p v-for="(order_detail, idx) in order.order_details" :key="idx">
                {{ order_detail.name }}
              </p>
            </el-col>
            <el-col :span="3">
              <p v-for="(order_detail, idx) in order.order_details" :key="idx">
                {{ order_detail.price }}
              </p>
            </el-col>
            <el-col :span="2">
              <p v-for="(order_detail, idx) in order.order_details" :key="idx">
                {{ order_detail.amount }}
              </p>
            </el-col>
            <el-col :span="3">
              <p>{{ order.total_money }}</p>
            </el-col>
            <el-col :span="3">
              <p>{{ showStatus(order.status) }}</p>
            </el-col>
            <el-col :span="1">
              <el-button
                type="danger"
                size="small"
                icon="el-icon-edit"
                circle
              ></el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
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
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { getStatusOrder, getTypeOrder } from "@/utils/helper.js";
import { listOrder } from "@/api/customer/order.js";

export default {
  name: "C-Cart",
  data() {
    return {
      user_id: "",
      listOrders: [],
      current_page: 1,
      page_size: 5,
      total: 100,
      search: "",
      listStatus: [],
      listTypeOrder: [],
    };
  },
  created() {
    this.listStatus = getStatusOrder();
    this.listTypeOrder = getTypeOrder();
    let cUser = JSON.parse(localStorage.getItem("cUser"));
    console.log(6677, cUser);
    if (cUser) {
      this.user_id = cUser.id;
    }

    this.getListOrder();
  },

  methods: {
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
      this.getListOrder({ user_id: this.user_id, page: val });
    },
    showStatus(statusId) {
      let status = this.listStatus.filter((obj) => {
        return obj.id == statusId;
      });
      return status[0].name;
    },
    async getListOrder() {
      let parameters = {
        user_id: this.user_id,
      };
      const response = await listOrder(parameters);
      if (response.data.code == 200) {
        this.listOrders = response.data.data.data;
        this.current_page = response.data.data.current_page;
        this.page_size = response.data.data.per_page;
        this.total = response.data.data.total;
      } else {
        this.listOrders = [];
      }
    },
  },
};
</script>
