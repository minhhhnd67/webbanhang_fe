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
      <el-col :span="7">
        <el-row>
          <el-col :span="22">
            <el-input placeholder="Tìm kiếm" v-model="search" class="input-with-select">
              <el-button @click="searchProduct()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row>
          <el-col :span="12" style="margin-right: 5px;">
            <el-badge :value="amountCart" class="item">
              <el-button @click="cart()" icon="el-icon-shopping-cart-2" style="width: 100%; background-color: rgba(255,172,10,.6);">Giỏ hàng</el-button>
            </el-badge>
          </el-col>
          <el-col :span="11">
            <el-button v-if="!isLogin" icon="el-icon-user" @click="login()" style="width: 100%; background-color: rgba(255,172,10,.6);">Đăng nhập</el-button>
            <!-- <el-button v-if="isLogin" icon="el-icon-user" style="width: 100%; background-color: rgba(255,172,10,.6);">Tài khoản</el-button> -->
            <el-row v-if="isLogin">
              <el-col :span="18" style="padding-top: 10px;">
                <span>{{ cUser?.name }}</span>
              </el-col>
              <el-col :span="6">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <el-avatar :size="40" :src="circleUrl"></el-avatar>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span @click="profile()">Tài khoản</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <span @click="order()">Đơn hàng</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <span @click="handleLogout()">Đăng xuất</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="padding: 10px" :gutter="10" type="flex" justify="center">
      <el-col :span="3" v-for="(item, index) in allCategory" :key="index">
        <el-button @click="productCategory(item.id)" style="background-color: #ffd400; border: 0px;">
          <i :class="item.icon"></i> {{ item.name }}
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
import store from "@/store";
import EventBus from '@/utils/EventBus.js';
import { allStore } from "@/api/customer/store.js";
import { allCategory } from "@/api/customer/category.js";
import { logout, me } from "@/api/customer/auth.js";
import config from "@/config/config.dev.json";


export default {
  name: "CustomerHeader",
  data() {
    return {
      baseURL: "",
      cUser: {},
      allStore: [],
      storeId: "",
      allCategory: [],
      search: "",
      isLogin: false,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      amountCart: 0,
    };
  },
  watch: {
    "storeId": {
      handler: function (newStoreId) {
        console.log(11, newStoreId);
        localStorage.setItem("cStoreId", newStoreId);
        store.state.cStoreId = newStoreId;
        this.checkAmountCart();
        this.emitEvent();
      },
      deep: false
    }
  },
  created() {
    this.baseURL = config.BASE_BE_API;
    this.getProfile();
    this.getAllStore();
    this.getAllCategory();
    EventBus.$on("emit-auth", (payload) => {
      this.isLogin = payload.isLogin;
      this.getProfile();
      setTimeout(() => { this.emitEvent(); }, 200);
    });
    EventBus.$on("check-cart", () => {
      this.checkAmountCart();
    });
  },
  mounted() {
    this.checkAmountCart();
  },
  methods: {
    backToHome() {
      route.push({ name: "c-home"}).catch(()=>{});
      setTimeout(() => { this.emitEvent(); }, 200);
    },
    checkAmountCart () {
      var cart = JSON.parse(localStorage.getItem('cart'));
      if (cart) {
        cart = cart.filter((obj) => {
          return obj.store_id == localStorage.getItem('cStoreId');
        });
        this.amountCart = cart.length;
      } else {
        this.amountCart = 0;
      }
    },
    async getProfile() {
      const response = await me();
      if (response.data.code == 200) {
        this.cUser =  response.data.data;
        store.state.cUser = response.data.data;
        console.log(666, store.state.cUser);
        localStorage.setItem('cUser', JSON.stringify(response.data.data));
        if (response.data.data.avatar) {
          this.circleUrl = this.baseURL + "/storage/" + response.data.data.avatar;
        }
        this.isLogin = true;
      }
    },
    async handleLogout() {
      this.$confirm("Đăng xuất tài khoản?", "Xác nhận đăng xuất tài khoản", {
        confirmButtonText: "Đăng xuất",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(async () => {
          const response = await logout();
          if (response.data.code == 200) {
            store.state.is_login_manager = true;
            store.state.tokenBE = "";
            store.state.cUser = {};
            localStorage.setItem("tokenBE", "");
            localStorage.setItem("cUser", "");
            this.isLogin = false;

            this.$message({
              type: "success",
              message: "Đăng xuất thành công",
            });
          }
        })
        .catch((e) => {
          console.log(123, e);
          console.log("Đã hủy xóa");
        });
    },
    async getAllStore() {
      const response = await allStore();
      if (response.data.code == 200) {
        this.allStore = response.data.data;
        this.storeId = +localStorage.getItem('cStoreId');
        console.log(this.allStore, this.storeId);
        if (!this.storeId) {
          this.storeId = this.allStore[0].id;
        }
        store.state.cStoreId = this.storeId;
        this.emitEvent();
      }
    },
    async getAllCategory() {
      const response = await allCategory();
      if (response.data.code == 200) {
        this.allCategory = response.data.data;
      }
    },
    emitEvent(isSearch = false) {
      console.log(111);
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
      route.push({ name: "c-product-category", params: { category_id: category_id } }).catch(() => {});
      setTimeout(() => { this.emitEvent(); }, 200);
    },
    login() {
      route.push({ name: "c-login" }).catch(() => {});
    },
    profile() {
      route.push({ name: "c-profile" }).catch(() => {});
    },
    order() {
      route.push({ name: "c-order" }).catch(() => {});
    },
    cart() {
      route.push({ name: "c-cart" }).catch(() => {});
    },
  }
};
</script>

<style>
#selectStore {
  background-color: rgba(255, 172, 10, 0.6);
}
</style>
