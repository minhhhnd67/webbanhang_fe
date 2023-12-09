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
      <template>
        <el-row style="margin: 30px 10px;">
          <el-col :span="4" v-for="(attribute, index) in category.attributes" :key="index">
            <el-row>
              <el-col :span="22">
                <el-select v-model="attributes[index].attribute_option_id" @change="searchProductAttribute()" filterable :placeholder="attribute.name">
                  <el-option
                    v-for="item in attribute.attribute_options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
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
        <el-row style="margin-top: 30px;" type="flex" justify="center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="current_page"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </el-row>
      </template>
    </el-main>
  </el-container>
</template>
<script>
import route from "@/router";
import { showCategory } from "@/api/customer/category.js";
import { searchProduct } from "@/api/customer/product.js";
import { formatMoney } from "@/utils/helper.js";
import EventBus from "@/utils/EventBus.js";
import config from "@/config/config.dev.json";

export default {
  name: "C-ProductCategory",
  data() {
    return {
      baseURL: "",
      storeId: "",
      categoryId: "",
      category: {},
      listNewProduct: [],
      attributes: [],
      total: "",
      pageSize: 12,
      search: "",
      isSearch: true,
      value: "",
    };
  },
  beforeCreate() {

  },
  created() {
    this.baseURL = config.BASE_BE_API;
    this.categoryId = this.$route.params.category_id;
    this.getDetailCategory(this.$route.params.category_id);
    EventBus.$on("search-product", (payload) => {
      console.log(12345);
      this.storeId = payload.storeId;
      this.search = payload.search;
      this.isSearch = payload.isSearch;
      let parameters = {
        search: payload.search,
        category_id: this.$route.params.category_id,
        attributes: this.attributes
      };
      this.getDetailCategory(this.$route.params.category_id);
      this.listProductSearch(this.storeId, parameters);
    });
  },
  methods: {
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
      this.listProductSearch(this.storeId, { search: this.search, attributes: this.attributes, page: val });
    },
    async getDetailCategory(id) {
      const response = await showCategory(id);
      if (response.data.code == 200) {
        this.category = response.data.data;
        this.category.attributes.forEach((attribute) => {
          this.attributes.push({
            attribute_id: attribute.id,
            attribute_option_id: ""
          });
        });
      }
    },
    async listProductSearch(storeId, parameters = {}) {
      const response = await searchProduct(storeId, parameters);
      if (response.data.code == 200) {
        this.listNewProduct = response.data.data.data;
        this.total = response.data.data.total;
        this.listNewProduct.forEach((item) => {
          item.image = this.baseURL + "/storage/" + item.image;
          item.price = formatMoney(item.price);
        });
      }
    },
    searchProductAttribute() {
      console.log(666, this.attributes);
      this.listProductSearch(this.storeId, { search: this.search, attributes: this.attributes });
    },
    productDetail(id) {
      route.push({ name: "c-product-detail", params: { id: id } });
    },
  }
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
