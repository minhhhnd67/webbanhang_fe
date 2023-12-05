<template>
  <el-container>
    <el-main>
      <!-- <el-row>
        <el-col :span="2"><el-link></el-link></el-col>
        <el-col :span="20">
          <h2>Điện thoại iPhone 15 Pro Max 256GB</h2>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="3"><el-link></el-link></el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="22">
              <img style="width: 100%;" :src="product.image">
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="10">
          <el-row>
            <h2>{{ product.name }}</h2>
          </el-row>
          <el-row>
            <el-col :span="20">
              <h3 style="color: #ff5100;">Giá: {{ product.price }}</h3>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px;">
            <el-col :span="4">Màu sắc:</el-col>
            <el-col :span="20">
              <el-radio v-model="radio2" label="1" border size="medium">Titan Đen</el-radio>
              <el-radio v-model="radio2" label="2" border size="medium">Titan Trắng</el-radio>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px;">
            <el-col :span="4">Kích thước:</el-col>
            <el-col :span="20">
              <el-radio v-model="radio3" label="1" border size="medium">7 Inch</el-radio>
              <el-radio v-model="radio3" label="2" border size="medium">8 Inch</el-radio>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="4">Số lượng:</el-col>
            <el-col :span="20">
              <el-input-number v-model="num" @change="handleChange" :min="1" :max="10"></el-input-number>
            </el-col>
          </el-row>
          <el-row style="margin-top: 50px;">
            <el-col :span="4">
              <el-button style="background-color: #ff5100; color: #ffffff;" icon="el-icon-shopping-cart-2">Thêm vào giỏ hàng</el-button>
            </el-col>
            <el-col :span="20">
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><el-link></el-link></el-col>
        <el-col :span="20" style="margin-top: 50px;">
          <h2>Thông tin sản phẩm</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><el-link></el-link></el-col>
        <el-col :span="20" v-html="product.description">
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { showProduct } from "@/api/customer/product.js";
import { formatMoney } from "@/utils/helper.js";
import config from "@/config/config.dev.json";

export default {
  name: "C-ProductDetail",
  data() {
    return {
      id: "",
      product: [],
      baseURL: "",
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      radio2: "",
      radio3: "",
      num: 1,
    }
  },
  created() {
    this.baseURL = config.BASE_BE_API;
    this.id = this.$route.params.id;
    console.log(1234);
    this.getProductDetail();
    console.log(12345);
  },
  methods: {
    async getProductDetail() {
      const response = await showProduct(this.$route.params.id);
      if (response.data.code == 200) {
        console.log(123456);
        this.product = response.data.data;
        this.product.price = formatMoney(this.product.price);
        this.product.image = this.baseURL + '/storage/' + this.product.image;
      }
    }
  }
};
</script>
