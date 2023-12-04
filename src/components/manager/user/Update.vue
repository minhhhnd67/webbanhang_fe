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
          <el-form-item label="Email" prop="email">
            <el-input v-model="ruleForm.email" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="Họ tên" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
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
          <el-form-item label="Chức danh" prop="province_id">
            <el-select v-model="ruleForm.role" placeholder="Chức danh">
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Chi nhánh" prop="store_id">
            <el-select v-model="ruleForm.store_id" placeholder="Chi nhánh">
              <el-option
                v-for="item in listStore"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Số điện thoại" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="Tỉnh / Thành phố" prop="province_id">
            <el-select v-model="ruleForm.province_id" filterable placeholder="Tỉnh / Thành phố">
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
            <el-select v-model="ruleForm.district_id" filterable placeholder="Quận / Huyện">
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
            <el-select v-model="ruleForm.ward_id" filterable placeholder="Xã / Phường">
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
            <el-input v-model="ruleForm.address_detail"></el-input>
          </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >Cập nhật</el-button
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
import { listStore } from "@/api/manager/store.js";
import { showUser, updateUser } from "@/api/manager/user.js";
import router from "@/router";
import { getProvinces, getDistricts, getWards } from "@/api/common/ghn.js";
import { getRoles, getStatusUser } from "@/utils/helper.js"
export default {
  name: "M-Store-Update",
  components: {

  },
  data() {
    return {
      id: "",
      tableData: [],
      search: "",
      ruleForm: {
        email: "",
        name: "",
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
      rules: {

      },
      roles: [],
      listStatus: [],
      listStore: [],
      listProvinces: [],
      listDistricts: [],
      listWards: [],
      allowWatch: false,
      value: "",
    };
  },
  computed: {
    thisRoute() {
      return this.$route;
    },
  },
  created() {
    this.getListProvinces();
    this.roles = getRoles();
    this.listStatus = getStatusUser();
    this.getListStores();
    this.showUser();
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
    backToListUser() {
      router.push({ name: "m-user-list" });
    },
    async showUser() {
      const response = await showUser(this.$route.params.id);

      if (response.data.code == 200) {
        var data = response.data.data;

        await this.getListDistricts(data.province_id);
        await this.getListWards(data.district_id);

        this.ruleForm.email = data.email;
        this.ruleForm.name = data.name;
        this.ruleForm.role = data.role;
        this.ruleForm.store_id = data.store_id;
        this.ruleForm.status = data.status;
        this.ruleForm.name = data.name;
        this.ruleForm.phone = data.phone;
        this.ruleForm.province_id = data.province_id;
        this.ruleForm.province_name = data.province_name;
        this.ruleForm.district_id = data.district_id;
        this.ruleForm.district_name = data.district_name;
        this.ruleForm.ward_id = data.ward_id;
        this.ruleForm.ward_name = data.ward_name;
        this.ruleForm.address_detail = data.address_detail;

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

          const response = await updateUser(this.$route.params.id, this.ruleForm);
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
    async getListStores() {
      const response = await listStore();
      if (response.data.code == 200) {
        this.listStore = response.data.data;
      }
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
