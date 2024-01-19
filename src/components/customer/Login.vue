<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" style="height: 500px">
        <el-col :span="12" style="background-color: #ffd400; border-radius: 30px">
          <el-row type="flex" justify="center">
            <el-col :span="6">
              <p style="font-size: 32px; tex-align: center"><b>Đăng nhập</b></p>
            </el-col>
          </el-row>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="0px"
            class="demo-ruleForm"
          >
            <el-row style="margin-top: 10px" type="flex" justify="center">
              <el-col :span="16">
                <el-form-item prop="email">
                  <el-input placeholder="Email" v-model="ruleForm.email"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px" type="flex" justify="center">
              <el-col :span="16">
                <el-form-item prop="password">
                  <el-input placeholder="Password" v-model="ruleForm.password" show-password>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row style="margin-top: 20px" type="flex" justify="center">
            <el-col :span="16">
              <el-button
                @click="handleLogin()"
                style="width: 100%; background-color: #ff5100; color: #ffffff"
                >Đăng nhập</el-button
              >
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px" type="flex" justify="center">
            <el-col :span="4">
              <el-row type="flex" justify="center">
                <el-button
                  @click="loginWithGoogle()"
                  style="background-color: #ffd400; border: 0px"
                >
                  <img
                    style="width: 50px"
                    src="@/icons/google.svg"
                    alt="Login using Google"
                  />
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="center">
                <el-button style="background-color: #ffd400; border: 0px">
                  <img
                    style="width: 50px"
                    src="@/icons/facebook.svg"
                    alt="Login using Facebook"
                  />
                </el-button>
              </el-row>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px" type="flex" justify="center">
            <el-col :span="8">
              <p>
                Bạn chưa có tài khoản?<b style="color: #ff5100"
                  ><a @click="register()">Đăng ký</a></b
                >
              </p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import EventBus from "@/utils/EventBus.js";
import router from "@/router";
import store from "@/store";
import { loginGoogle, login } from "@/api/manager/auth.js";

export default {
  name: "C-Login",
  data() {
    return {
      ruleForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          { required: true, message: "Không được bỏ trống", trigger: "blur" },
          { type: 'email', message: 'Email không đúng định dạng', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: "Không được bỏ trống", trigger: "blur" },
        ],
      },
      data: null,
      token: "",
      login_google: false,
      login_facebook: false,
    };
  },
  mounted() {
    // Tạo một kênh
    const channel = new BroadcastChannel("login-channel");
    // Đăng ký nhận dữ liệu
    channel.onmessage = function (event) {
      // Nhận dữ liệu
      const data = event.data;
      this.login_google = data.login_google;
      this.token = data.token;
      localStorage.setItem("tokenBE", this.token);
      store.state.permission = 1;
      store.state.tokenBE = this.token;
      store.state.is_login_manager = false;
      // Xử lý dữ liệu
      EventBus.$emit("emit-auth", {
        isLogin: true,
      });
      router.push({ name: "c-home" }).catch(() => {});
      // setTimeout(() => { this.emitEvent(); }, 250);
    };
  },
  methods: {
    emitEvent(isSearch = false) {
      console.log(222);
      EventBus.$emit("search-product", {
        storeId: this.storeId,
        search: this.search,
        isSearch: isSearch,
      });
    },
    async loginWithGoogle() {
      const response = await loginGoogle();
      window.open(response.data.url);
    },
    async handleLogin() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const data = {
            email: this.ruleForm.email,
            password: this.ruleForm.password,
          };
          const response = await login(data);
          if (response.data.code == 200) {
            store.state.permission = 1;
            store.state.tokenBE = response.data.data.token;
            localStorage.setItem("tokenBE", response.data.data.token);
            store.state.is_login_manager = false;
            EventBus.$emit("emit-auth", {
              isLogin: true,
            });
            router.push({ name: "c-home" });
          } else {
            this.$message.error('Thông tin đăng nhập không chính xác');
          }
          return;
        } else {
          console.log('error submit!!');
          return;
        }
      });
      
    },
    register() {
      router.push({ name: "c-register" });
    },
  },
};
</script>
