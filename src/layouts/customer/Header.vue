<template>
  <el-row style="background-color: #ffd400;">
    <el-row style="padding: 10px">
      <el-col :span="1"><el-link></el-link></el-col>
      <el-col :span="5">
        <el-row>
          <el-button @click="backToHome()" style="margin-top: -10px; border: 0px; background-color: #ffd400;">
            <el-col :span="6"><i class="el-icon-s-home" style="font-size: 30px; color: #1a1501;"></i></el-col>
            <el-col :span="18"><b style="font-size: 30px; color: #1a1501;">Mobi Store</b></el-col>
          </el-button>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-col :span="24">
            <el-select id="selectStore" v-model="storeId" filterable placeholder="Chọn cơ sở">
              <el-option
                v-for="item in allStore"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="22">
            <el-input placeholder="Tìm kiếm" v-model="search" class="input-with-select">
              <el-button @click="searchProduct()" slot="append" icon="el-icon-search"></el-button>
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
    <el-row style="padding: 10px" :gutter="10" type="flex" justify="center">
      <el-col :span="3" v-for="(item, index) in allCategory" :key="index">
        <el-button @click="productCategory(item.id)" style="background-color: #ffd400; border: 0px;">
          <i class="el-icon-mobile-phone"></i> {{ item.name }}
        </el-button>
      </el-col>
      <!-- <el-col :span="3"><el-button style="background-color: #ffd400; border: 0px;"><i class="el-icon-monitor"></i> Laptop</el-button></el-col>
      <el-col :span="3"><el-button style="background-color: #ffd400; border: 0px;"><i class="el-icon-headset"></i> Tai nghe</el-button></el-col>
      <el-col :span="3"><el-button style="background-color: #ffd400; border: 0px;"><i class="el-icon-mobile"></i> Ốp điện thoại</el-button></el-col>
      <el-col :span="3"><el-button style="background-color: #ffd400; border: 0px;"><i class="el-icon-printer"></i> PC, Máy in</el-button></el-col>
      <el-col :span="3"><el-button style="background-color: #ffd400; border: 0px;"><i class="el-icon-watch-1"></i> Đồng hồ</el-button></el-col>
      <el-col :span="3"><el-button style="background-color: #ffd400; border: 0px;"><i class="el-icon-bank-card"></i> Thẻ cào</el-button></el-col> -->
    </el-row>
  </el-row>
</template>

<script>
import route from "@/router";
import { allStore } from "@/api/customer/store.js";
import { allCategory } from "@/api/customer/category.js";
import EventBus from '@/utils/EventBus.js';

export default {
  name: "CustomerHeader",
  data() {
    return {
      allStore: [],
      storeId: "",
      allCategory: [],
      search: "",
    };
  },
  watch: {
    "storeId": {
      handler: function () {
        console.log(11);
        this.emitEvent();
      },
      deep: false
    }
  },
  created() {
    this.getAllStore();
    this.getAllCategory();
  },
  methods: {
    backToHome() {
      route.push({ name: "c-home"});
    },
    async getAllStore() {
      const response = await allStore();
      if (response.data.code == 200) {
        this.allStore = response.data.data;
        this.storeId = this.allStore[0].id;
      }
    },
    async getAllCategory() {
      const response = await allCategory();
      if (response.data.code == 200) {
        this.allCategory = response.data.data;
      }
    },
    emitEvent(isSearch = false) {
      EventBus.$emit('search-product', {
        storeId: this.storeId,
        search: this.search,
        isSearch: isSearch,
      });
    },
    searchProduct() {
      if (this.search) {
        this.emitEvent(true);
      } else {
        this.emitEvent();
      }
    },
    productCategory(category_id) {
      route.push({ name: "c-product-category", params: { category_id: category_id } });
    }
  }
};
</script>

<style>
#selectStore {
  background-color: rgba(255, 172, 10, 0.6);
}
</style>
