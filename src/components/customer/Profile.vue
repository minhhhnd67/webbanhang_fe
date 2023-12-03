<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col
          style="background-color: #f0e7e3; border-radius: 20px; padding: 30px;"
          :span="22"
        >
          <el-row>
            <el-col :span="24">
              <h2>Thông tin tài khoản</h2>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-row style="margin-top: 10px;">
                <el-col :span="22">
                  <el-input placeholder="Email" v-model="email">
                    <template slot="prepend">Email:</template>
                  </el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-col :span="22">
                  <el-input placeholder="name" v-model="name">
                    <template slot="prepend">Họ tên:</template>
                  </el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-col :span="22">
                  <el-input placeholder="phone" v-model="phone">
                    <template slot="prepend">Số điện thoại:</template>
                  </el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-col :span="22">
                  <el-select v-model="value" filterable placeholder="Tỉnh / Thành phố">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-col :span="22">
                  <el-select v-model="value" filterable placeholder="Quận / Huyện">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-col :span="22">
                  <el-select v-model="value" filterable placeholder="Xã / Phường">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-col :span="22">
                  <el-input placeholder="Địa chỉ chi tiết" v-model="address_detail">
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
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else style="border: 1px solid;" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
  
            </el-col>
          </el-row>
          <el-row style="margin-top: 30px;" type="flex" justify="center">
            <el-col :span="4">
              <el-button style="width: 100%; background-color: #ff5100; color: #ffffff;">Lưu thông tin</el-button>
            </el-col>
          </el-row> 
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "C-Profile",
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
  border-color: #409EFF;
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
