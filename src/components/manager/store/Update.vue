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

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >Cập nhật</el-button
              >
              <el-button @click="backToListStore()">Quay lại</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { showStore, updateStore } from "@/api/manager/store.js";
import router from "@/router";
import { getProvinces, getDistricts, getWards } from "@/api/common/ghn.js";
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
        name: "",
        hotline: "",
        province_id: "",
        province_name: "",
        district_id: "",
        district_name: "",
        ward_id: "",
        ward_name: "",
      },
      rules: {},
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
    this.showStore();
    this.getListProvinces();
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
    backToListStore() {
      router.push({ name: "m-store-list" });
    },
    async showStore() {
      const response = await showStore(this.$route.params.id);

      if (response.data.code == 200) {
        var data = response.data.data;

        await this.getListDistricts(data.province_id);
        await this.getListWards(data.district_id);

        this.ruleForm.name = data.name;
        this.ruleForm.hotline = data.hotline;
        this.ruleForm.province_id = data.province_id;
        this.ruleForm.province_name = data.province_name;
        this.ruleForm.district_id = data.district_id;
        this.ruleForm.district_name = data.district_name;
        this.ruleForm.ward_id = data.ward_id;
        this.ruleForm.ward_name = data.ward_name;

        setTimeout(() => {
          this.allowWatch = true;
        }, 1000);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
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

          const response = await updateStore(this.$route.params.id, this.ruleForm);
          if (response.data.code == 200) {
            this.$message({
              showClose: true,
              message: "Cập nhật thông tin cơ sở thành công!",
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
