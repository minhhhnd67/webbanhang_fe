<template>
  <div class="main" :style="mainStyle">
    <h1>MTPhone</h1>
    <p v-if="data">Data trả về từ cửa sổ mới: {{ data }}</p>
    <input type="text" v-model="email" name="email" id="email" placeholder="Email" :style="input" />
    <br />
    <input
      type="password"
      v-model="password"
      name="password"
      id="password"
      placeholder="Password"
      :style="input"
    />
    <br />
    <input type="button" @click="handleLogin()" value="Login" class="button" id="login" :style="inputStyle" />
    <br />
    <input type="button" @click="register()" value="Chưa có tài khoản" class="button" id="register" :style="inputStyle" />
    <br />
    <img
      src="../../../icons/google.svg"
      @click="loginWithGoogle()"
      alt="Login using Google"
    />
    <img src="../../../icons/facebook.svg" alt="Login using Facebook" />
  </div>
</template>

<script>
// import axios from "axios";
import router from "./../../../router"
import store from "./../../../store"
import { loginGoogle, login } from './../../../api/manager/auth'

export default {
  name: "LoginManager",
  // components: { Socialite },
  //Custom style for main and input for make the page responsive:
  props: {
    mainStyle: String,
    inputStyle: String,
  },
  data() {
    return {
      email: "",
      password: "",
      data: null,
      token: "",
      login_google: false,
      login_facebook: false,
    };
  },
  mounted() {
    // Tạo một kênh
    const channel = new BroadcastChannel("my-channel");
    // Đăng ký nhận dữ liệu
    channel.onmessage = function (event) {
      // Nhận dữ liệu
      const data = event.data;
      this.login_google = data.login_google
      this.token = data.token
      localStorage.setItem('tokenBE', this.token)
      store.state.permission = 1
      store.state.tokenBE = this.token
      store.state.is_login_manager = false
      // Xử lý dữ liệu
      router.push({ name: "m-home" })
    };
  },
  created() {},
  watch: {},
  methods: {
    async loginWithGoogle() {
      const response = await loginGoogle()
      window.open(
        response.data.url,
        "_blank",
        "location=yes,height=570,width=520,scrollbars=yes,status=yes"
      );

      // axios
      //   .post("http://127.0.0.1:8000/api/get-google-sign-in-url")
      //   .then((response) => {
      //     var url = response.data.url;
          // window.open(
          //   url,
          //   "_blank",
          //   "location=yes,height=570,width=520,scrollbars=yes,status=yes"
          // );
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
    async handleLogin() {
      const data = {
        email: this.email,
        password: this.password
      }
      const response = await login(data)
      if (response.data.code == 200) {
        store.state.permission = 1
        store.state.tokenBE = response.data.data.token
        localStorage.setItem('tokenBE', response.data.data.token)
        store.state.is_login_manager = false
        router.push({ name: "m-home" })
      }
    },
    register() {
      router.push({ name: "m-register" })
    }
  },
};
</script>

<style>
/* Import Poppins font: */

@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
.main {
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  margin: 30px !important;
  top: 20%;
  left: 30%;
  width: 40%;
  text-align: center;
  padding: 5px;
  border-radius: 3rem;
  box-shadow: 0px 0px 8px -5px #000000;
  padding-top: 3%;
  padding-bottom: 5%;
  font-family: "Poppins", sans-serif;
}

h1 {
  cursor: default;
  user-select: none;
}

input {
  border-radius: 3rem;
  border: none;
  padding: 10px;
  text-align: center;
  outline: none;
  margin: 10px;
  width: 30%;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}

input:hover {
  box-shadow: 0px 0px 8px -5px #000000;
}

input:active {
  box-shadow: 0px 0px 8px -5px #000000;
}

#done {
  background: lightgreen;
}

.button {
  cursor: pointer;
  user-select: none;
}

img {
  height: 2.2rem;
  margin: 10px;
  user-select: none;
}

img:hover {
  box-shadow: 0px 0px 8px -5px #000000;
  cursor: pointer;
  border-radius: 200rem;
}
</style>
