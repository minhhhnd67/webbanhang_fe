<template>
  <!-- <el-container> -->
    <!-- <el-row :span="24"> -->
        <el-header
        class="navbar"
        style="text-align: right; font-size: 12px; background-color: background-color: rgb(84, 92, 100);"
      >
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 10px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>View</el-dropdown-item>
            <el-dropdown-item>Add</el-dropdown-item>
            <el-dropdown-item>Delete</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>Tom</span>
      </el-header>
    <!-- </el-row> -->
  
  <!-- </el-container> -->
</template>
<script>
export default {
  name: "ManageHeader",
};
</script>
