<template>
  <div>
    <h1>Đăng nhập thành công</h1>
  </div>
</template>
<script>
export default {
  name: "CloseWindowLayout",
  data() {
    return {};
  },
  mounted() {
    const data = {
        login_google: true,
        token: this.$route.query.token
    };
    // Tạo kênh
    const channel = new BroadcastChannel("login-channel");
    // Gửi dữ liệu
    console.log(1234, data);
    channel.postMessage(data);
    this.closeWindow();
  },
  methods: {
    closeWindow() {
      window.close();
    },
  },
};
</script>
