import { Result } from 'element-ui';
<template>
  <el-container>
    <el-main>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="Tên cửa hàng" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Hotline" prop="hotline">
              <el-input v-model="ruleForm.hotline"></el-input>
            </el-form-item>
            <el-form-item label="Tỉnh / Thành phố" prop="province_id">
              <el-select v-model="ruleForm.province_id" filterable  placeholder="Tỉnh / Thành phố">
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
              <el-select v-model="ruleForm.district_id" filterable  placeholder="Quận / Huyện">
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
              <el-select v-model="ruleForm.ward_id" filterable  placeholder="Xã / Phường">
                <el-option
                  v-for="item in listWards"
                  :key="item.WardCode"
                  :label="item.WardName"
                  :value="item.WardCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Địa chỉ chi tiết: " prop="address_detail">
              <el-input v-model="ruleForm.address_detail"></el-input>
            </el-form-item>

            <!-- <el-form-item label="Password" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Confirm" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Age" prop="age">
              <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item> -->

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >Thêm mới</el-button
              >
              <!-- <el-button @click="resetForm('ruleForm')">Reset</el-button> -->
              <el-button @click="backToListStore()">Quay lại</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { createStore } from "@/api/manager/store.js";
import router from "@/router";
import { getProvinces, getDistricts, getWards } from "@/api/common/ghn.js";
export default {
  name: "M-Store-Create",
  components: { 

  },
  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("Please input the age"));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error("Please input digits"));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error("Age must be greater than 18"));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("Please input the password"));
    //   } else {
    //     if (this.ruleForm.checkPass !== "") {
    //       this.$refs.ruleForm.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("Please input the password again"));
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error("Two inputs don't match!"));
    //   } else {
    //     callback();
    //   }
    // };

    return {
      tableData: [],
      search: "",
      ruleForm: {
        name: "",
        hotline: "",
        province_id: "",
        province_name: "",
        district_id: "",
        district_name: "",
        ward_id: "",
        ward_name: "",
        address_detail: "",
        // pass: "",
        // checkPass: "",
        // age: "",
      },
      rules: {
        // pass: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }],
        // age: [{ validator: checkAge, trigger: "blur" }],
      },
      listProvinces: [],
      listDistricts: [],
      listWards: [],
      value: "",
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
    this.getListProvinces();
  },
  mounted() {},
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
  methods: {
    backToListStore() {
      router.push({ name: "m-store-list" });
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

          const response = await createStore(this.ruleForm);
          if (response.data.code == 200) {
            this.$message({
              showClose: true,
              message: "Thêm cơ sở mới thành công!",
              type: "success",
            });
            router.push({ name: "m-store-list" });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
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
