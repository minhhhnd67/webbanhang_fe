<template>
  <el-container>
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
      <el-row type="flex" class="row-bg">
        <el-col :span="24">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="200px"
            class="demo-ruleForm"
          >
            <el-form-item label="Họ tên" prop="name">
              <el-col :span="12"><el-input v-model="ruleForm.name"></el-input></el-col>
            </el-form-item>
            <el-form-item label="Trạng thái" prop="status">
              <el-select v-model="ruleForm.status" placeholder="Trạng thái">
                <el-option
                  v-for="item in listStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Số điện thoại" prop="phone">
              <el-col :span="12"><el-input v-model="ruleForm.phone"></el-input></el-col>
            </el-form-item>
            <el-form-item label="Tỉnh / Thành phố" prop="province_id">
              <el-select v-model="ruleForm.province_id" placeholder="Tỉnh / Thành phố">
                <el-option
                  v-for="item in listProvinces"
                  :key="item.ProvinceID"
                  :label="item.ProvinceName"
                  :value="item.ProvinceID"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Quận / Huyện" prop="district">
              <el-select v-model="ruleForm.district_id" placeholder="Quận / Huyện">
                <el-option
                  v-for="item in listDistricts"
                  :key="item.DistrictID"
                  :label="item.DistrictName"
                  :value="item.DistrictID"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Xã / Phường" prop="ward">
              <el-select v-model="ruleForm.ward_id" placeholder="Xã / Phường">
                <el-option
                  v-for="item in listWards"
                  :key="item.WardCode"
                  :label="item.WardName"
                  :value="item.WardCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Địa chỉ chi tiết" prop="address_detail">
              <el-col :span="12">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="Địa chỉ chi tiết"
                  v-model="ruleForm.address_detail">
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Sản phẩm đơn hàng" prop="name">
              <el-button @click="addProduct()" type="success">+</el-button>
            </el-form-item>
            <el-form-item>
              <el-row
                style="
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
                  padding: 10px;
                "
                v-for="(order_detail, index) in ruleForm.order_details"
                :key="index"
              >
                <el-col :span="23">
                  <el-row >
                    <el-col :span="8">Sản phẩm</el-col>
                    <el-col :span="6">Sku</el-col>
                    <el-col :span="4">Giá</el-col>
                    <el-col :span="6">Số lượng</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-select v-model="ruleForm.order_details[index].product_id" placeholder="Sản phẩm">
                        <el-option
                          v-for="item in listProduct"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="6">
                      <el-col :span="18">
                        <el-row v-for="(sku, idx) in listSku[index]" :key="idx" :span="12">
                          <el-select v-model="resSku[index][idx].skuValue" :placeholder="sku.name">
                            <el-option
                              v-for="item in sku.sku_options"
                              :key="item.id"
                              :label="item.name"
                              :value="item.name"
                            >
                            </el-option>
                          </el-select>
                        </el-row>
                        <el-link type="info"></el-link>
                      </el-col>
                    </el-col>
                    <el-col :span="4">
                      {{ ruleForm.order_details[index].price }}
                    </el-col>
                    <el-col :span="6">
                      <el-input-number v-model="ruleForm.order_details[index].amount" :min="1" :max="100"></el-input-number>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="1">
                  <el-button
                    type="danger"
                    size="small"
                    icon="el-icon-delete"
                    circle
                    @click="deleteProduct(index)"
                  ></el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="23">
                  <el-row >
                    <el-col :span="8"><el-link type="info"></el-link></el-col>
                    <el-col :span="6"><el-link type="info"></el-link></el-col>
                    <el-col :span="4">Tổng tiền:</el-col>
                    <el-col :span="6">{{ ruleForm.total_money }}</el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >Thêm mới</el-button
              >
              <el-button @click="backToListUser()">Quay lại</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import MBreadcrumb from "@/layouts/manager/Breadcrumb.vue";
import { logout } from "@/api/manager/auth";
import store from "@/store";
import router from "@/router";
import { getProvinces, getDistricts, getWards } from "@/api/common/ghn.js";
import { getStatusOrder } from "@/utils/helper.js"
import { allProduct } from "@/api/manager/product.js";
import { createOrder } from "@/api/manager/order.js";
export default {
  name: "M-Order-Create",
  components: { MBreadcrumb },
  data() {
    return {
      store_id: 4,
      tableData: [],
      search: "",
      ruleForm: {
        store_id: 4,
        user_id: 0,
        status: 4,
        total_money: 0,
        type: 1,
        name: "",
        phone: "",
        province_id: "",
        province_name: "",
        district_id: "",
        district_name: "",
        ward_id: "",
        ward_name: "",
        address_detail: "",
        order_details: []
      },
      rules: {
      },
      listStatus: [],
      listProvinces: [],
      listDistricts: [],
      listWards: [],
      listProduct: [],
      listSku: [],
      resSku: [],
      oldValue: [],
      value: "",
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
    this.listStatus = getStatusOrder();
    this.listProduct = this.getAllProduct({storeId: this.store_id});
    this.getListProvinces();
    for(let i = 0; i < 100; i++) {
      i;
      this.resSku.push(
        [
          {
            skuName: "",
            skuValue: ""
          },
          {
            skuName: "",
            skuValue: ""
          },
          {
            skuName: "",
            skuValue: ""
          },
          {
            skuName: "",
            skuValue: ""
          },
          {
            skuName: "",
            skuValue: ""
          }
        ]
      );
    }
  },
  mounted() {},
  watch: {
    "resSku": {
      handler: function (newValue) {
        console.log(123, newValue);
      },
      deep: true
    },
    "ruleForm.order_details": {
      handler: function (newValue) {
        console.log(111, newValue);
        console.log(222, this.oldValue);
        this.ruleForm.total_money = 0;
        newValue.forEach((item, index) => {
          this.ruleForm.total_money += item.price * item.amount;
          if (this.oldValue[index] == undefined) {
            this.oldValue.push({
              product_id: "",
              price: 0,
              amount: 1,
              sku_info: ""
            });
          }
          if (this.oldValue[index]  != undefined) {
            if (item.product_id != "") {
              if (item.product_id != this.oldValue[index].product_id) {
                var products = this.listProduct.filter((obj) => {
                  return obj.id == item.product_id;
                });
                this.listSku[index] = products[0].skus;
                products[0].skus.forEach((sku, idx) => {
                  this.resSku[index][idx].skuName = sku.name;
                  this.resSku[index][idx].skuValue = null;
                });

                this.oldValue[index].product_id = products[0].id;
                this.oldValue[index].price = products[0].price;
                item.price = products[0].price;
              }
            }
          }
        });
      },
      deep: true,
    },
    "ruleForm.province_id": {
      handler: function (newValue) {
        if (newValue != "") {
          this.getListDistricts(newValue);
          this.ruleForm.district_id = "";
        }
      },
      deep: true,
    },
    "ruleForm.district_id": {
      handler: function (newValue) {
        if (newValue != "") {
          this.getListWards(newValue);
          this.ruleForm.ward_id = "";
        } else {
          this.ruleForm.ward_id = "";
        }
      },
      deep: true,
    },
  },
  methods: {
    backToListUser() {
      router.push({ name: "m-order-list" });
    },
    async handleLogout() {
      const response = await logout();
      if (response.data.code == 200) {
        store.state.is_login_manager = true;
        store.state.tokenBE = "";
        localStorage.setItem("tokenBE", "");
        this.$router.push({ name: "m-login" });
      }
    },
    addProduct() {
      this.ruleForm.order_details.push({
        product_id: "",
        amount: 1,
        price: 0,
        sku_info: ""
      });
      this.listSku.push([]);
      // this.resSku.push([]);
    },
    deleteProduct(index) {
      this.listSku.splice(index, 1);
      this.resSku.splice(index, 1);
      this.ruleForm.order_details.splice(index, 1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //   alert("submit!");
          var province = this.listProvinces.filter((obj) => {
            return obj.ProvinceID == this.ruleForm.province_id;
          });
          this.ruleForm.province_name = province[0].ProvinceName;

          var district = this.listDistricts.filter((obj) => {
            return obj.DistrictID == this.ruleForm.district_id;
          });
          this.ruleForm.district_name = district[0].DistrictName;

          var ward = this.listWards.filter((obj) => {
            return obj.WardCode == this.ruleForm.ward_id;
          });
          this.ruleForm.ward_name = ward[0].WardName;

          this.ruleForm.order_details.forEach((order_detail, index) => {
            this.listSku[index].forEach((item, idx) => {
              order_detail.sku_info += this.resSku[index][idx].skuName + ": " + this.resSku[index][idx].skuValue + ", ";
            })
          })

          console.log(888 , this.ruleForm);

          const response = await createOrder(this.ruleForm);
          if (response.data.code == 200) {
            this.$message({
              showClose: true,
              message: "Tạo đơn hàng mới thành công!",
              type: "success",
            });
            router.push({ name: "m-order-list" });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async getListProvinces() {
      const response = await getProvinces();
      if (response.data.code == 200) {
        this.listProvinces = response.data.data;
      }
    },
    async getListDistricts(province_id) {
      const response = await getDistricts(province_id);
      if (response.data.code == 200) {
        this.listDistricts = response.data.data;
      }
    },
    async getListWards(district_id) {
      const response = await getWards(district_id);
      if (response.data.code == 200) {
        this.listWards = response.data.data;
      }
    },
    async getAllProduct(parameters = {}) {
      const response = await allProduct(parameters);
      console.log(111, response);
      if (response.data.code == 200) {
        this.listProduct = response.data.data;
      }
    }


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
