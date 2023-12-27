<template>
  <el-container>
    <el-main>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row type="flex" justify="center" style="height: 800px">
          <el-col :span="12" style="background-color: #ffd400; border-radius: 30px">
            <el-row type="flex" justify="center">
              <el-col :span="5">
                <p style="font-size: 32px; tex-align: center"><b>Đăng ký</b></p>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px" type="flex" justify="center">
              <el-col :span="16">
                <el-input placeholder="Email" v-model="ruleForm.email">
                  <template slot="prepend">Email:</template>
                </el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px" type="flex" justify="center">
              <el-col :span="16">
                <el-input placeholder="Họ tên" v-model="ruleForm.name">
                  <template slot="prepend">Họ tên:</template>
                </el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px" type="flex" justify="center">
              <el-col :span="16">
                <el-input
                  placeholder="Mật khẩu"
                  v-model="ruleForm.password"
                  show-password
                >
                  <template slot="prepend">Mật khẩu:</template>
                </el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px" type="flex" justify="center">
              <el-col :span="16">
                <el-input
                  placeholder="Nhập lại mật khẩu"
                  v-model="ruleForm.password_confirm"
                  show-password
                >
                  <template slot="prepend">Nhập lại mật khẩu:</template>
                </el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px" type="flex" justify="center">
              <el-col :span="16">
                <el-input placeholder="Số điện thoại" v-model="ruleForm.phone">
                  <template slot="prepend">Số điện thoại:</template>
                </el-input>
              </el-col>
            </el-row>

            <el-row style="margin-top: 20px" type="flex" justify="center">
              <el-col :span="16">
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
            <el-row style="margin-top: 20px" type="flex" justify="center">
              <el-col :span="16">
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
            <el-row style="margin-top: 20px" type="flex" justify="center">
              <el-col :span="16">
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
            <el-row style="margin-top: 10px" type="flex" justify="center">
              <el-col :span="16">
                <el-input
                  placeholder="Địa chỉ chi tiết"
                  v-model="ruleForm.address_detail"
                >
                  <template slot="prepend">Địa chỉ chi tiết:</template>
                </el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px" type="flex" justify="center">
              <el-col :span="16">
                <el-button
                  @click="submitForm('ruleForm')"
                  style="width: 100%; background-color: #ff5100; color: #ffffff"
                  >Đăng ký</el-button
                >
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px" type="flex" justify="center">
              <el-col :span="16">
                <el-button
                  @click="login()"
                  style="width: 100%; background-color: #696765; color: #ffffff"
                  >Về trang đăng nhập</el-button
                >
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
import router from "@/router";
import { getProvinces, getDistricts, getWards } from "@/api/common/ghn.js";
import store from "@/store";
import { register } from "@/api/manager/auth.js";

export default {
  name: "M-Register",
  data() {
    return {
      ruleForm: {
        email: "",
        name: "",
        password: "",
        role: "",
        store_id: "",
        phone: "",
        province_id: "",
        province_name: "",
        district_id: "",
        district_name: "",
        ward_id: "",
        ward_name: "",
        address_detail: "",
        status: "",
      },
      listStore: [],
      listProvinces: [],
      listDistricts: [],
      listWards: [],
    };
  },
  watch: {
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
  created() {
    this.getListProvinces();
  },
  methods: {
    login() {
      router.push({ name: "m-login" }).catch(() => {});
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

          const response = await register(this.ruleForm);
          if (response.data.code == 200) {
            this.$message({
              showClose: true,
              message: "Tạo tài khoản mới thành công!",
              type: "success",
            });
            store.state.permission = 1;
            store.state.tokenBE = response.data.data.token;
            localStorage.setItem("tokenBE", response.data.data.token);
            store.state.is_login_manager = false;
            EventBus.$emit("emit-auth", {
              isLogin: true,
            });
            router.push({ name: "m-home" }).catch(() => {});
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
