<template>
  <el-container>
    <el-main>
      <el-table>
        <el-table-column prop="date" label="Date" width="140"> </el-table-column>
        <el-table-column prop="name" label="Name" width="120"> </el-table-column>
        <el-table-column prop="address" label="Address"> </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "M-Helloword",
  components: { 

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
