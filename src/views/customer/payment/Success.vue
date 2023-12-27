<template>
    <el-container>
        <el-main>
            <el-row type="flex" justify="center">
              <h1>Thanh toán thành công</h1>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
export default {
  name: "C-Payment-Success",
  data() {
    return {};
  },
  created() {
    const data = {
      code: this.$route.query.vnp_ResponseCode,
    };
    // Tạo kênh
    const channel = new BroadcastChannel("payment-channel");
    // Gửi dữ liệu
    channel.postMessage(data);
    setTimeout(() => {
        window.close();
    }, 1000);
  },
};
</script>
