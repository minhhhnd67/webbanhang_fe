<template>
  <el-container>
    <el-main style="color: #606266;">
      <el-row type="flex" justify="space-around">
        <el-col :span="5" style="text-align: center;">
          <h3>Tổng số đơn hàng</h3> 
          <h2>986</h2>
        </el-col>
        <el-col :span="5" style="text-align: center;">
          <h3>Đơn hàng online</h3>
          <h2>486</h2>
        </el-col>
        <el-col :span="5" style="text-align: center;">
          <h3>Đơn hàng offline</h3>
          <h2>500</h2>
        </el-col>
      </el-row> 
      <LineChart/>
    </el-main>
  </el-container>
</template>

<script>
import LineChart from '@/components/manager/charts/Line.vue';

export default {
  name: "M-Helloword",
  components: { 
    LineChart
  },
  data() {
    return {};
  },
  computed: {
    thisRoute() {
      return this.$route;
    },
  },
  created() {
  },
  methods: {

  },
};
</script>
