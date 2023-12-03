<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" style="height: 800px;">
        <el-col :span="12" style="background-color: #ffd400; border-radius: 30px;">
          <el-row type="flex" justify="center">
            <el-col :span="5">
              <p style="font-size: 32px; tex-align: center;"><b>Đăng ký</b></p>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px;" type="flex" justify="center">
            <el-col :span="16">
              <el-input placeholder="Email" v-model="email">
                <template slot="prepend">Email:</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px;" type="flex" justify="center">
            <el-col :span="16">
              <el-input placeholder="Họ tên" v-model="name">
                <template slot="prepend">Họ tên:</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;" type="flex" justify="center">
            <el-col :span="16">
              <el-input placeholder="Mật khẩu" v-model="password" show-password>
                <template slot="prepend">Mật khẩu:</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;" type="flex" justify="center">
            <el-col :span="16">
              <el-input placeholder="Nhập lại mật khẩu" v-model="password_confirm" show-password>
                <template slot="prepend">Nhập lại mật khẩu:</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;" type="flex" justify="center">
            <el-col :span="16">
              <el-input placeholder="Số điện thoại" v-model="password_confirm" show-password>
                <template slot="prepend">Số điện thoại:</template>
              </el-input>
            </el-col>
          </el-row>

          <el-row style="margin-top: 20px;" type="flex" justify="center">
            <el-col :span="16">
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
          <el-row style="margin-top: 20px;" type="flex" justify="center">
            <el-col :span="16">
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
          <el-row style="margin-top: 20px;" type="flex" justify="center">
            <el-col :span="16">
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
          <el-row style="margin-top: 10px;" type="flex" justify="center">
            <el-col :span="16">
              <el-input placeholder="Địa chỉ chi tiết" v-model="address_detail">
                <template slot="prepend">Địa chỉ chi tiết:</template>
              </el-input>
            </el-col>
          </el-row>

          <el-row style="margin-top: 20px;" type="flex" justify="center">
            <el-col :span="16">
              <el-button style="width: 100%; background-color: #ff5100; color: #ffffff;">Đăng ký</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "C-Register",
  data() {
    return {
      options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value: ''
    }
  }
};
</script>
