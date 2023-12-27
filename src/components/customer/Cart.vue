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

            <!-- fee ship -->
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
                <p>Phí vận chuyển:</p>
              </el-col>
              <el-col :span="3">
                <p>
                  <b>{{ handleFormatMoney(this.feeShip) }}</b>
                </p>
              </el-col>
              <el-col :span="4">
                <el-link></el-link>
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
import {
  getProvinces,
  getDistricts,
  getWards,
  calculateFeeShip,
  createOrderShip,
} from "@/api/common/ghn.js";
import { formatMoney } from "@/utils/helper.js";
import { paymentVNPAY } from "@/api/common/vnpay.js";
import store from "@/store";
// import router from "@/router";
import { createOrder, updateOrder } from "@/api/customer/order.js";

export default {
  name: "C-Cart",
  data() {
    return {
      order_id: "",
      code_shipping: "",
      status_payment: "",
      ruleForm: {
        store_id: "",
        user_id: 0,
        status: 0,
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

      // data ghn
      dataGHN: {
        payment_type_id: 2,
        note: "Tintest 123",
        required_note: "KHONGCHOXEMHANG",
        return_phone: "0394076444",
        return_address: "39 NTT",
        return_district_id: null,
        return_ward_code: "",
        client_order_code: "",
        to_name: "TinTest124",
        to_phone: "0987654321",
        to_address: "72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam",
        to_ward_code: "20107",
        to_district_id: 1442,
        cod_amount: 0,
        content: "ABCDEF",
        weight: 1000,
        length: 15,
        width: 15,
        height: 10,
        pick_station_id: 0,
        insurance_value: 2000000,
        service_id: 0,
        service_type_id: 2,
        coupon: null,
        pick_shift: [2],
        items: [],
      },
      feeShip: 0,
    };
  },
  watch: {
    "ruleForm.province_id": {
      handler: function (newValue) {
        this.ruleForm.total_money -= this.feeShip;
        this.feeShip = 0;
        if (newValue != "") {
          this.getListDistricts(newValue);
          this.ruleForm.district_id = "";
        }
      },
      deep: true,
    },
    "ruleForm.district_id": {
      handler: function (newValue) {
        this.ruleForm.total_money -= this.feeShip;
        this.feeShip = 0;
        if (newValue != "") {
          this.getListWards(newValue);
          this.ruleForm.ward_id = "";
        } else {
          this.ruleForm.ward_id = "";
        }
      },
      deep: true,
    },
    "ruleForm.address_detail": {
      handler: function (newValue) {
        if (newValue && this.ruleForm.ward_id) {
          this.dataGHN.to_district_id = this.ruleForm.district_id;
          this.dataGHN.to_ward_code = this.ruleForm.ward_id;
          this.dataGHN.to_name = this.ruleForm.name;
          this.dataGHN.to_phone = this.ruleForm.phone;
          this.dataGHN.to_address = this.ruleForm.address_detail;
          this.getFeeShip();
        }
      },
      deep: true,
    },
    listProducts: {
      handler: function (newListProducts) {
        this.ruleForm.total_money = 0;
        // let totalProduct = 0;
        newListProducts.forEach((product) => {
          this.ruleForm.total_money += product.price * product.amount;
        });
        this.ruleForm.total_money += this.feeShip;
        localStorage.setItem("cart", JSON.stringify(newListProducts));

        // thêm thông tin check vận chuyển

        if (this.listProducts != []) {
          this.dataGHN.items = [];
          this.listProducts.forEach((product) => {
            this.dataGHN.items.push({
              name: product.name,
              code: product.code,
              quantity: product.amount,
              price: product.price,
              length: 12,
              width: 12,
              height: 12,
              category: {
                level1: "Điệnt thoại",
              },
            });
          });
          console.log(678, this.dataGHN.items);
        }

        // check cart
        EventBus.$emit("check-cart");
      },
      deep: true,
    },
    feeShip: {
      handler: function () {
        this.ruleForm.total_money += this.feeShip;
      },
      deep: false,
    },
    isSubmitForm: {
      handler: function (newIsSubmitForm) {
        // if (newIsSubmitForm == true) {
        console.log(555, newIsSubmitForm);
        // this.submitForm();
        // }
      },
      deep: false,
    },
  },
  created() {
    this.getListProvinces();
    this.ruleForm.store_id = +localStorage.getItem("cStoreId");
    if (!this.ruleForm.store_id) {
      this.ruleForm.store_id = store.state.cStoreId;
    }

    let cUser = JSON.parse(localStorage.getItem("cUser"));
    console.log(5566, cUser);
    if (cUser) {
      this.ruleForm.user_id = cUser.id;
    }

    let dataProducts = JSON.parse(localStorage.getItem("cart"));
    this.listProducts = dataProducts.filter((obj) => {
      return obj.store_id == this.ruleForm.store_id;
    });
    
    // thêm thông tin check vận chuyển
    if (this.listProducts != []) {
      this.listProducts.forEach((product) => {
        this.dataGHN.items.push({
          name: product.name,
          code: product.code,
          quantity: product.amount,
          price: product.price,
          length: 12,
          width: 12,
          height: 12,
          category: {
            level1: "Điện thoại",
          },
        });
      });
      console.log(678, this.dataGHN.items);
    }

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
        this.submitForm("ruleForm");
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
            this.order_id = response.data.data.order_id;
            this.addOrderShip();

            // router.push({ name: "m-home" });
            this.listProducts = [];
            this.ruleForm.name = "";
            this.ruleForm.phone = "";
            this.ruleForm.province_id = "";
            this.ruleForm.district_id = "";
            this.ruleForm.ward_id = "";
            this.ruleForm.address_detail = "";
            this.ruleForm.note = "";
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async getFeeShip() {
      const response = await calculateFeeShip(this.dataGHN);
      console.log(response);
      if (response.data.code == 200) {
        this.feeShip = response.data.data.total_fee;
      }
    },
    async addOrderShip() {
      const response = await createOrderShip(this.dataGHN);
      console.log(999, response);
      if (response.data.code == 200) {
        this.code_shipping = response.data.data.order_code;
        const res = await updateOrder(this.order_id, {
          code_shipping: this.code_shipping,
        });
        console.log(8899, res);
        if (res.data.code == 200) {
          alert("Tạo đơn hàng mới thành công");
        }
      }
    },
  },
};
</script>
