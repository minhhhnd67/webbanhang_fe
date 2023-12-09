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
        <el-row type="flex" justify="center">
          <el-col
            style="background-color: #f0e7e3; border-radius: 20px; padding: 30px"
            :span="22"
          >
            <el-row>
              <el-col :span="24">
                <h2>Thông tin tài khoản</h2>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-row style="margin-top: 10px">
                  <el-col :span="22">
                    <el-input placeholder="Email" v-model="ruleForm.email" disabled="true">
                      <template slot="prepend">Email:</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                  <el-col :span="22">
                    <el-input placeholder="name" v-model="ruleForm.name">
                      <template slot="prepend">Họ tên:</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                  <el-col :span="22">
                    <el-input placeholder="phone" v-model="ruleForm.phone">
                      <template slot="prepend">Số điện thoại:</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                  <el-col :span="22">
                    <el-select v-model="ruleForm.province_id" filterable placeholder="Tỉnh / Thành phố">
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
                  <el-col :span="22">
                    <el-select v-model="ruleForm.district_id" filterable placeholder="Quận / Huyện">
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
                  <el-col :span="22">
                    <el-select v-model="ruleForm.ward_id" filterable placeholder="Xã / Phường">
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
                  <el-col :span="22">
                    <el-input placeholder="Địa chỉ chi tiết" v-model="ruleForm.address_detail">
                      <template slot="prepend">Địa chỉ chi tiết:</template>
                    </el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-upload
                  class="avatar-uploader"
                  name="image"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i
                    v-else
                    style="border: 1px solid"
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </el-upload>
              </el-col>
            </el-row>
            <el-row style="margin-top: 30px" type="flex" justify="center">
              <el-col :span="4">
                <el-button  @click="submitForm('ruleForm')" style="width: 100%; background-color: #ff5100; color: #ffffff"
                  >Lưu thông tin</el-button
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
import EventBus from '@/utils/EventBus.js';
import router from "@/router";
import { getProvinces, getDistricts, getWards } from "@/api/common/ghn.js";
import { me } from "@/api/customer/auth.js";
import { updateUser } from "@/api/customer/user.js";

export default {
  name: "C-Profile",
  data() {
    return {
      profile: {},
      ruleForm: {
        email: "",
        name: "",
        phone: "",
        province_id: "",
        province_name: "",
        district_id: "",
        district_name: "",
        ward_id: "",
        ward_name: "",
        address_detail: "",
      },
      listProvinces: [],
      listDistricts: [],
      listWards: [],
      allowWatch: false,
    };
  },
  created() {
    this.getListProvinces();
    this.getProfile();
  },
  methods: {
    async getProfile() {
      const response = await me();

      if (response.data.code == 200) {
        var data = response.data.data;

        await this.getListDistricts(data.province_id);
        await this.getListWards(data.district_id);

        this.profile = data;
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

          const response = await updateUser(this.profile.id, this.ruleForm);
          if (response.data.code == 200) {
            this.$message({
              showClose: true,
              message: "Cập nhật thông tin tài khoản thành công!",
              type: "success",
            });
            EventBus.$emit("emit-auth", {
              isLogin: true,
            });
            router.push({ name: "c-home" });
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

<style scoped>
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
