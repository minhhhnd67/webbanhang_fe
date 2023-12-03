<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" style="height: 450px;">
        <el-col :span="12" style="background-color: #ffd400; border-radius: 30px;">
          <el-row type="flex" justify="center">
            <el-col :span="6">
              <p style="font-size: 32px; tex-align: center;"><b>Đăng nhập</b></p>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px;" type="flex" justify="center">
            <el-col :span="16">
              <el-input placeholder="Email" v-model="email"></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;" type="flex" justify="center">
            <el-col :span="16">
              <el-input placeholder="Password" v-model="password" show-password>
              </el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;" type="flex" justify="center">
            <el-col :span="16">
              <el-button style="width: 100%; background-color: #ff5100; color: #ffffff;">Đăng nhập</el-button>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;" type="flex" justify="center">
            <el-col :span="4">
              <el-row type="flex" justify="center">
                <el-button style="background-color: #ffd400; border: 0px;">
                  <img style="width: 50px;" src="@/icons/google.svg" alt="Login using Google"/>
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="center">
                <el-button style="background-color: #ffd400; border: 0px;">
                  <img style="width: 50px;" src="@/icons/facebook.svg" alt="Login using Facebook"/>
                </el-button>
              </el-row>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;" type="flex" justify="center">
            <el-col :span="8">
              <p>Bạn chưa có tài khoản?<b style="color: #ff5100;">Đăng ký</b></p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "C-Login",
  data() {
    return {
      email: '',
      password: '',
    }
  }
};
</script>
