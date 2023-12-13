<template>
  <el-container>
    <el-main>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-row type="flex" justify="center">
          <el-col style="background-color: #f0e7e3; border-radius: 20px" :span="22">
            <el-row style="padding: 10px" type="flex" justify="center" :gutter="30">
              <el-col :span="2">
                <p><b>Ảnh</b></p>
              </el-col>
              <el-col :span="3">
                <p><b>Mã sản phẩm</b></p>
              </el-col>
              <el-col :span="4">
                <p><b>Tên sản phẩm</b></p>
              </el-col>
              <el-col :span="4">
                <p><b>Sku</b></p>
              </el-col>
              <el-col :span="3">
                <p><b>Giá</b></p>
              </el-col>
              <el-col :span="4">
                <p><b>Số lượng</b></p>
              </el-col>
              <el-col :span="1">
                <el-link></el-link>
              </el-col>
            </el-row>
            <el-row
              v-for="(product, index) in listProducts"
              :key="index"
              style="padding: 10px"
              type="flex"
              justify="center"
              :gutter="20"
            >
              <el-col :span="2">
                <img style="width: 100%" :src="product.image" />
              </el-col>
              <el-col :span="3"> {{ product.code }} </el-col>
              <el-col :span="4"> {{ product.name }} </el-col>
              <el-col :span="4"> {{ product.skus }} </el-col>
              <el-col :span="3"> {{ handleFormatMoney(product.price) }} </el-col>
              <el-col :span="4">
                <el-input-number
                  v-model="listProducts[index].amount"
                  @change="handleChange"
                  :min="1"
                  :max="10"
                ></el-input-number>
              </el-col>
              <el-col :span="1">
                <el-button
                  @click="deleteProduct(index)"
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </el-col>
            </el-row>

            <!-- total money -->
            <el-row
              style="padding: 20px 10px; margin-top: 0px"
              type="flex"
              justify="center"
              :gutter="20"
            >
              <el-col :span="2">
                <el-link></el-link>
              </el-col>
              <el-col :span="3">
                <el-link></el-link>
              </el-col>
              <el-col :span="4">
                <el-link></el-link>
              </el-col>
              <el-col :span="4">
                <p><b>Tổng tiền:</b></p>
              </el-col>
              <el-col :span="3">
                <p style="color: #ff5100">
                  <b>{{ handleFormatMoney(this.ruleForm.total_money) }}</b>
                </p>
              </el-col>
              <el-col :span="4">
                <el-link></el-link>
              </el-col>
            </el-row>

            <!-- customer info -->
            <el-row
              style="padding: 30px 10px; margin-top: 0px"
              type="flex"
              justify="center"
            >
              <el-col :span="6">
                <h3>Thông tin mua hàng</h3>
              </el-col>
              <el-col :span="16">
                <el-row style="margin-top: 20px">
                  <el-col :span="10">
                    <el-input placeholder="Họ tên" v-model="ruleForm.name">
                      <template slot="prepend">Họ tên</template>
                    </el-input>
                  </el-col>
                  <el-col :span="1">
                    <el-link></el-link>
                  </el-col>
                  <el-col :span="10">
                    <el-input placeholder="Số điện thoại" v-model="ruleForm.phone">
                      <template slot="prepend">Số điện thoại</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                  <el-col :span="21" style="width: 100%">
                    <el-select
                      v-model="ruleForm.province_id"
                      filterable
                      placeholder="Tỉnh / Thành phố"
                    >
                      <el-option
                        v-for="item in listProvinces"
                        :key="item.ProvinceID"
                        :label="item.ProvinceName"
                        :value="item.ProvinceID"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                  <el-col :span="21" style="width: 100%">
                    <el-select
                      v-model="ruleForm.district_id"
                      filterable
                      placeholder="Quận / Huyện"
                    >
                      <el-option
                        v-for="item in listDistricts"
                        :key="item.DistrictID"
                        :label="item.DistrictName"
                        :value="item.DistrictID"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                  <el-col :span="21" style="width: 100%">
                    <el-select
                      v-model="ruleForm.ward_id"
                      filterable
                      placeholder="Xã / Phường"
                    >
                      <el-option
                        v-for="item in listWards"
                        :key="item.WardCode"
                        :label="item.WardName"
                        :value="item.WardCode"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                  <el-col :span="21">
                    <el-input
                      placeholder="Địa chỉ chi tiết"
                      v-model="ruleForm.address_detail"
                    >
                      <template slot="prepend">Địa chỉ chi tiết</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                  <el-col :span="21">
                    <el-input placeholder="Ghi chú (Nếu có)" v-model="ruleForm.note">
                      <template slot="prepend">Ghi chú</template>
                    </el-input>
                  </el-col>
                </el-row>

                <!-- Button buy -->
                <el-row style="margin-top: 50px">
                  <el-col :span="21">
                    <el-button
                      @click="handlePaymentVNPAY()"
                      style="width: 100%; background-color: #ff5100; color: #ffffff"
                      >Đặt hàng</el-button
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import EventBus from "@/utils/EventBus.js";
import { getProvinces, getDistricts, getWards } from "@/api/common/ghn.js";
import { formatMoney } from "@/utils/helper.js";
import { paymentVNPAY } from "@/api/common/vnpay.js";
import store from "@/store";
// import router from "@/router";
import { createOrder } from "@/api/customer/order.js";

export default {
  name: "C-Cart",
  data() {
    return {
      ruleForm: {
        store_id: "",
        user_id: 0,
        status: 4,
        total_money: 0,
        type: 2,
        name: "",
        phone: "",
        province_id: "",
        province_name: "",
        district_id: "",
        district_name: "",
        ward_id: "",
        ward_name: "",
        address_detail: "",
        note: "",
        order_details: [],
      },

      isSubmitForm: false,

      listProvinces: [],
      listDistricts: [],
      listWards: [],
      listProducts: [],

      src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      num: 1,
      value: "",
    };
  },
  watch: {
    "ruleForm.province_id": {
      handler: function (newValue) {
        if (newValue != "") {
          this.getListDistricts(newValue);
          this.district_id = "";
        }
      },
      deep: true,
    },
    "ruleForm.district_id": {
      handler: function (newValue) {
        if (newValue != "") {
          this.getListWards(newValue);
          this.ward_id = "";
        } else {
          this.ward_id = "";
        }
      },
      deep: true,
    },
    listProducts: {
      handler: function (newListProducts) {
        this.ruleForm.total_money = 0;
        newListProducts.forEach((product) => {
          this.ruleForm.total_money += product.price * product.amount;
        });
        localStorage.setItem("cart", JSON.stringify(newListProducts));
        // check cart
        EventBus.$emit("check-cart");
      },
      deep: true,
    },
    isSubmitForm: {
      handler: function(newIsSubmitForm) {
        // if (newIsSubmitForm == true) {
          console.log(555, newIsSubmitForm);
          // this.submitForm();
        // }
      },
      deep:false
    }
  },
  created() {
    this.getListProvinces();
    this.listProducts = JSON.parse(localStorage.getItem("cart"));
    this.ruleForm.store_id = store.state.cStoreId;

    // Tạo một kênh
    const channel = new BroadcastChannel("payment-channel");
    // Đăng ký nhận dữ liệu
    channel.onmessage = function (event) {
      // Nhận dữ liệu
      const data = event.data;
      console.log(1234, data);
      this.isSubmitForm = true;
      // this.notiPayment();
    };
  },
  mounted() {},
  methods: {
    notiPayment() {
      this.$notify({
        title: "Success",
        message: "Thanh toán thành công",
        type: "success",
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
    deleteProduct(index) {
      this.listProducts.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.listProducts));
      // check cart
      EventBus.$emit("check-cart");
    },
    handleFormatMoney(money) {
      return formatMoney(money);
    },
    async handlePaymentVNPAY() {
      let data = {
        total_money: this.ruleForm.total_money,
      };
      const response = await paymentVNPAY(data);
      if (response.data.code == "00") {
        let urlPayment = response.data.data;
        this.submitForm('ruleForm');
        window.open(urlPayment);
      }
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

          this.ruleForm.order_details = JSON.parse(localStorage.getItem("cart"));

          // this.ruleForm.order_details.forEach((order_detail, index) => {
          //   this.listSku[index].forEach((item, idx) => {
          //     order_detail.sku_info += this.resSku[index][idx].skuName + ": " + this.resSku[index][idx].skuValue + ", ";
          //   })
          // })

          const response = await createOrder(this.ruleForm);
          if (response.data.code == 200) {
            this.$message({
              showClose: true,
              message: "Tạo đơn hàng mới thành công!",
              type: "success",
            });
            this.listProducts = [];
            alert("Tạo đơn hàng mới thành công");
            // router.push({ name: "m-home" });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
