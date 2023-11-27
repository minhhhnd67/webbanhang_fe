import { Result } from 'element-ui';
<template>
  <el-container>
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
          <el-form-item label="Loại đơn hàng" prop="type">
            <el-select v-model="ruleForm.type" placeholder="Loại đơn hàng">
              <el-option
                v-for="item in listTypeOrder"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
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
          <el-form-item label="Họ tên" prop="name">
            <el-col :span="12">
              <el-input v-model="ruleForm.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Số điện thoại" prop="phone">
            <el-col :span="12">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-col>
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
              <el-col :span="24">
                <el-row >
                  <el-col :span="8">Sản phẩm</el-col>
                  <el-col :span="6">Sku</el-col>
                  <el-col :span="4">Giá</el-col>
                  <el-col :span="6">Số lượng</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    {{ ruleForm.order_details[index].product.name }}
                  </el-col>
                  <el-col :span="6">
                    <el-col :span="18">
                      {{ ruleForm.order_details[index].sku_info }}
                      <el-link type="info"></el-link>
                    </el-col>
                  </el-col>
                  <el-col :span="4">
                    {{ ruleForm.order_details[index].product.price }}
                  </el-col>
                  <el-col :span="6">
                    {{ ruleForm.order_details[index].amount }}
                  </el-col>
                </el-row>
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
                >Cập nhật</el-button
              >
              <el-button @click="backToListOrder()">Quay lại</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { showOrder, updateOrder } from "@/api/manager/order.js";
import router from "@/router";
import { getProvinces, getDistricts, getWards } from "@/api/common/ghn.js";
import { getStatusOrder, getTypeOrder } from "@/utils/helper.js"
export default {
  name: "M-Order-Update",
  components: {

  },
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
        type: "",
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
      listTypeOrder: [],
      listStatus: [],
      listProvinces: [],
      listDistricts: [],
      listWards: [],
      listProduct: [],
      listSku: [],
      resSku: [],
      oldValue: [],
      value: "",
      allowWatch: false
    };
  },
  computed: {
    thisRoute() {
      return this.$route;
    },
  },
  created() {
    this.getListProvinces();
    this.listStatus = getStatusOrder();
    this.listTypeOrder = getTypeOrder();
    this.showOrder();
  },
  mounted() {},
  watch: {
    "ruleForm.province_id": {
      handler: function (newValue) {
        if (newValue != "" && this.allowWatch) {
          this.getListDistricts(newValue);
          this.ruleForm.district_id = "";
        }
      },
      deep: true,
    },
    "ruleForm.district_id": {
      handler: function (newValue) {
        if (newValue != "" && this.allowWatch) {
          this.getListWards(newValue);
          this.ruleForm.ward_id = "";
        } else {
          if (this.allowWatch) {
            this.ruleForm.ward_id = "";
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    backToListOrder() {
      router.push({ name: "m-order-list" });
    },
    async showOrder() {
      const response = await showOrder(this.$route.params.id);

      if (response.data.code == 200) {
        var data = response.data.data;

        await this.getListDistricts(data.province_id);
        await this.getListWards(data.district_id);

        this.ruleForm.status = data.status;
        this.ruleForm.total_money = data.total_money;
        this.ruleForm.type = data.type;
        this.ruleForm.name = data.name;
        this.ruleForm.store_id = data.store_id;
        this.ruleForm.name = data.name;
        this.ruleForm.phone = data.phone;
        this.ruleForm.province_id = data.province_id;
        this.ruleForm.province_name = data.province_name;
        this.ruleForm.district_id = data.district_id;
        this.ruleForm.district_name = data.district_name;
        this.ruleForm.ward_id = data.ward_id;
        this.ruleForm.ward_name = data.ward_name;
        this.ruleForm.address_detail = data.address_detail;
        this.ruleForm.order_details = data.order_details;

        setTimeout(() => {
          this.allowWatch = true;
        }, 1000);
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

          const response = await updateOrder(this.$route.params.id, this.ruleForm);
          if (response.data.code == 200) {
            this.$message({
              showClose: true,
              message: "Cập nhật thông tin tài khoản thành công!",
              type: "success",
            });
            router.push({ name: "m-user-list" });
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
