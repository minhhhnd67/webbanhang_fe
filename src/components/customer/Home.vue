<template>
  <el-container>
    <el-main>
      <el-row>
        <el-carousel indicator-position="outside">
          <el-carousel-item>
            <img
              style="width: 50%; height: 100%"
              src="./../../assets/690-300-max-iphone15-promax-th1102.webp"
            />
            <img
              style="width: 50%; height: 100%"
              src="./../../assets/690-300-max-iphone15-promax-th1102.webp"
            />
          </el-carousel-item>
          <el-carousel-item>
            <img
              style="width: 50%; height: 100%"
              src="./../../assets/samsung-flip-fold-sliding-th12.webp"
            />
            <img
              style="width: 50%; height: 100%"
              src="./../../assets/samsung-flip-fold-sliding-th12.webp"
            />
          </el-carousel-item>
          <el-carousel-item>
            <img
              style="width: 50%; height: 100%"
              src="./../../assets/macbook-pro-m3-sliding-maumoi.webp"
            />
            <img
              style="width: 50%; height: 100%"
              src="./../../assets/macbook-pro-m3-sliding-maumoi.webp"
            />
          </el-carousel-item>
          <el-carousel-item>
            <img
              style="width: 50%; height: 100%"
              src="./../../assets/sliding-dienthoai-xiaomi-13c.webp"
            />
            <img
              style="width: 50%; height: 100%"
              src="./../../assets/sliding-dienthoai-xiaomi-13c.webp"
            />
          </el-carousel-item>
        </el-carousel>
      </el-row>
      <template v-if="!isSearch">
        <el-row
          style="background-color: #ffd400; border-radius: 20px 20px 0px 0px"
          type="flex"
          justify="center"
        >
          <el-col :span="3">
            <h2>Sản phẩm mới</h2>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="6"
            v-for="(item, index) in listNewProduct"
            :key="index"
          >
            <el-card :body-style="{ padding: '10px 20px', margin: '5px' }">
              <el-button @click="productDetail(item.id)">
                <img style="width: 100%" :src="item.image" class="image" />
                <div style="padding: 14px">
                  <span>{{ item.name }}</span>
                  <div class="bottom clearfix">
                    <el-button type="text" style="color: #ff7300" class="button">{{
                      item.price
                    }}</el-button>
                  </div>
                </div>
              </el-button>
            </el-card>
          </el-col>
        </el-row>
      </template>
      <template v-if="isSearch">
        <!-- <el-row
          style="background-color: #ffd400; border-radius: 20px 20px 0px 0px"
          type="flex"
          justify="center"
        >
          <el-col :span="3">
            <h2>Sản phẩm mới</h2>
          </el-col>
        </el-row> -->
        <el-row class="row-bg">
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="6"
            v-for="(item, index) in listNewProduct"
            :key="index"
          >
            <el-card :body-style="{ padding: '10px 20px', margin: '5px' }">
              <el-button @click="productDetail(item.id)">
                <img style="width: 100%" :src="item.image" class="image" />
                <div style="padding: 14px">
                  <span>{{ item.name }}</span>
                  <div class="bottom clearfix">
                    <el-button type="text" style="color: #ff7300" class="button">{{
                      item.price
                    }}</el-button>
                  </div>
                </div>
              </el-button>
            </el-card>
          </el-col>
        </el-row>
      </template>
      <!-- <template>
        <el-row style="background-color: #ffd400; border-radius: 20px 20px 0px 0px; margin-top: 20px;" type="flex" justify="center">
          <el-col :span="4">
            <h2>Điện thoại bán chạy</h2>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(item, index) in listNewProduct" :key="index">
            <el-card :body-style="{ padding: '20px 20px', margin: '5px' }">
              <el-button>
                <img style="width: 100%;" :src="item.image" class="image">
                <div style="padding: 14px;">
                  <span>Yummy hamburger</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">Operating</el-button>
                  </div>
                </div>
              </el-button>
            </el-card>
          </el-col>
        </el-row>
      </template> -->
    </el-main>
  </el-container>
</template>

<script>
import route from "@/router";
import { getNewProductByStore, searchProduct } from "@/api/customer/product.js";
import EventBus from "@/utils/EventBus.js";
import config from "@/config/config.dev.json";
import { formatMoney } from "@/utils/helper.js";

export default {
  name: "C-Home",
  components: {},
  data() {
    return {
      baseURL: "",
      storeId: "",
      search: "",
      isSearch: false,
      listNewProduct: [],
    };
  },
  computed: {
    thisRoute() {
      return this.$route;
    },
  },
  beforeCreate() {},
  created() {
    this.baseURL = config.BASE_BE_API;
    EventBus.$on("search-product", (payload) => {
      this.storeId = payload.storeId;
      this.search = payload.search;
      this.isSearch = payload.isSearch;
      if (payload.isSearch) {
        let parameters = {
          search: payload.search,
        };
        this.listProductSearch(this.storeId, parameters);
      } else {
        if (this.storeId) {
          this.listNewProductByStore(this.storeId);
        }
      }
    });
  },
  methods: {
    async listNewProductByStore(storeId) {
      const response = await getNewProductByStore(storeId);
      if (response.data.code == 200) {
        this.listNewProduct = response.data.data;
        this.listNewProduct.forEach((item) => {
          item.image = this.baseURL + "/storage/" + item.image;
          item.price = formatMoney(item.price);
        });
      }
    },
    async listProductSearch(storeId, parameters = {}) {
      const response = await searchProduct(storeId, parameters);
      if (response.data.code == 200) {
        this.listNewProduct = response.data.data;
        this.listNewProduct.forEach((item) => {
          item.image = this.baseURL + "/storage/" + item.image;
          item.price = formatMoney(item.price);
        });
      }
    },
    productDetail(id) {
      route.push({ name: "c-product-detail", params: { id: id } });
    },
  },
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
