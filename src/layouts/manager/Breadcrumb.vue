<template>
  <el-breadcrumb  separator="/">
    <el-breadcrumb-item v-for="(matched, idx) in routeMatched" :key="idx">{{ matched.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "MBreadcrumb",
  props: {
    routeMatched: {
      type: Array,
      required: true,
    },
  },
};
</script>
