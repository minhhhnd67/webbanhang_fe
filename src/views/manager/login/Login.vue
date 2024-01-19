<template>
    <div class="main" :style="mainStyle">
    
        <h1>Mobi Store</h1>
    
        <p v-if="data">Data trả về từ cửa sổ mới: {{ data }}</p>
    
        <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="0px"
            class="demo-ruleForm"
        >
        <el-form-item prop="email">
            <input type="text" v-model="ruleForm.email" name="email" id="email" placeholder="Email" :style="input" />
        </el-form-item>

        <el-form-item prop="password">
            <input type="password" v-model="ruleForm.password" name="password" id="password" placeholder="Password" :style="input" />
        </el-form-item>
        <input type="button" @click="handleLogin()" style="background-color: rgb(255, 81, 0);" value="Login" class="button" id="login" :style="inputStyle" />
        <input type="button" @click="register()" style="background-color: rgb(149 140 136);" value="Chưa có tài khoản" class="button" id="register" :style="inputStyle" />
        </el-form>
    
    
        <img src="../../../icons/google.svg" @click="loginWithGoogle()" alt="Login using Google" />
    
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
            ruleForm: {
                email: "",
                password: "",
            },
            data: null,
            token: "",
            login_google: false,
            login_facebook: false,
            rules: {
                email: [
                    { required: true, message: "Không được bỏ trống", trigger: "blur" },
                    { type: 'email', message: 'Email không đúng định dạng', trigger: ['blur', 'change'] }
                ],
                password: [
                    { required: true, message: "Không được bỏ trống", trigger: "blur" },
                ],
            },
        };
    },
    mounted() {
        
    },
    created() {
        // Tạo một kênh
        console.log(6666);
        const channel = new BroadcastChannel("login-channel");
        console.log(6688);
        // Đăng ký nhận dữ liệu
        channel.onmessage = function(event) {
            // Nhận dữ liệu
            console.log(12345, event);
            const data = event.data;
            this.login_google = data.login_google
            this.token = data.token
            localStorage.setItem('tokenBE', this.token)
            store.state.permission = 1
            store.state.tokenBE = this.token
            store.state.is_login_manager = false
            // Xử lý dữ liệu
            // router.push({ name: "m-home" })
            location.reload();
        };
    },
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
            if (!this.ruleForm.email || !this.ruleForm.password) {
                this.$message.error('Vui lòng nhập đầy đủ thông tin');
                return;
            }
            const data = {
                email: this.ruleForm.email,
                password: this.ruleForm.password
            }
            const response = await login(data)
            if (response.data.code == 200) {
                store.state.permission = 1
                store.state.tokenBE = response.data.data.token
                localStorage.setItem('tokenBE', response.data.data.token)
                store.state.is_login_manager = false
                // router.push({ name: "m-home" })
                location.reload();
                
            } else {
                this.$message.error('Thông tin đăng nhập không chính xác');
            }
        },
        register() {
            router.push({ name: "m-register" })
        }
    },
};
</script>

<style scoped>
/* Import Poppins font: */

@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
.main {
    background-color: #ffd400;
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
    width: 70%;
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
