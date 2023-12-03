<template>
  <el-row style="background-color: #ffd400;">
    <el-row style="padding: 10px">
      <el-col :span="1"><el-link></el-link></el-col>
      <el-col :span="4">
        <el-row>
          <el-col :span="3"><i class="el-icon-s-home" style="font-size: 30px; color: #1a1501;"></i></el-col>
          <el-col :span="20"><b style="font-size: 30px; color: #1a1501;">Mobi Store</b></el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-col :span="24">
            <el-select id="selectStore" v-model="value" filterable placeholder="Chọn cơ sở">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="9">
        <el-row>
          <el-col :span="22">
            <el-input placeholder="Tìm kiếm" v-model="input3" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row>
          <el-col :span="12" style="margin-right: 5px;">
            <el-badge :value="12" class="item">
              <el-button icon="el-icon-shopping-cart-2" style="width: 100%; background-color: rgba(255,172,10,.6);">Giỏ hàng</el-button>
            </el-badge>
          </el-col>
          <el-col :span="11">
            <el-button icon="el-icon-user" style="width: 100%; background-color: rgba(255,172,10,.6);">Tài khoản</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="padding: 10px">
      <el-col :span="2"><el-link></el-link></el-col>
      <el-col :span="3"><i class="el-icon-mobile-phone"></i> Điện thoại</el-col>
      <el-col :span="3"><i class="el-icon-monitor"></i> Laptop</el-col>
      <el-col :span="3"><i class="el-icon-headset"></i> Tai nghe</el-col>
      <el-col :span="3"><i class="el-icon-mobile"></i> Ốp điện thoại</el-col>
      <el-col :span="3"><i class="el-icon-printer"></i> PC, Máy in</el-col>
      <el-col :span="3"><i class="el-icon-watch-1"></i> Đồng hồ</el-col>
      <el-col :span="3"><i class="el-icon-bank-card"></i> Thẻ cào</el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "CustomerHeader",
  data() {
    return {
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      value: "",
    };
  },
};
</script>

<style>
#selectStore {
  background-color: rgba(255, 172, 10, 0.6);
}
</style>
