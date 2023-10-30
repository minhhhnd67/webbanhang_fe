<template>
  <el-breadcrumb  separator="/">
    <el-breadcrumb-item v-for="(matched, idx) in routeMatched" :key="idx">{{ matched.meta.breadcrumb }}</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- <div class="bg-blue-800 p-4">
    <span v-for="(matched, idx) in routeMatched" :key="idx">
      <a :href="matched.path">
        {{ matched.meta.breadcrumb }}
      </a>
      <span v-if="idx != Object.keys(routeMatched).length - 1"> / </span>
    </span>
  </div> -->
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
