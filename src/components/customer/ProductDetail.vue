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

          <el-row style="margin-top: 10px;" v-for="(sku, index) in product.skus" :key="index">
            <el-col :span="4">{{ sku.name }}:</el-col>
            <el-col :span="20">
              <el-radio style="margin-bottom: 10px;" v-for="(option, idx) in sku.sku_options" :key="idx" v-model="skus[index].value" :label="option.name" border size="medium">{{ option.name }}</el-radio>
            </el-col>
          </el-row>

          <el-row style="margin-top: 20px;">
            <el-col :span="4">Số lượng:</el-col>
            <el-col :span="20">
              <el-input-number v-model="addCart.amount" :min="1" :max="10"></el-input-number>
            </el-col>
          </el-row>
          <el-row style="margin-top: 50px;">
            <el-col :span="4">
              <el-button @click="addToCart()" style="background-color: #ff5100; color: #ffffff;" icon="el-icon-shopping-cart-2">Thêm vào giỏ hàng</el-button>
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
      <el-row style="margin-top: 5px;" v-for="(attribute, index) in product.attributes" :key="index">
        <el-col :span="2"><el-link></el-link></el-col>
        <el-col :span="20" style="font-size: 18px;"><b>{{ attribute.name }}: {{ attribute.pivot.attribute_option_value }}</b></el-col>
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
      addCart: {
        product_id: "",
        name: "",
        image: "",
        code: "",
        skus: "",
        price: "",
        amount: 1,
      },
      skus: [],
    }
  },
  created() {
    this.baseURL = config.BASE_BE_API;
    this.id = this.$route.params.id;
    this.addCart.product_id = this.$route.params.id;
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

        // add cart
        this.addCart.name = this.product.name;
        this.addCart.code = this.product.code;
        this.addCart.image = this.product.image;
        this.addCart.price = this.product.price;

        this.product.skus.forEach((sku) => {
          this.skus.push({
            name: sku.name,
            value: "",
          });
        });
        console.log(333, this.skus);
      }
    },
    addToCart() {
      this.skus.forEach((sku) => {
        this.addCart.skus += sku.name + ": " + sku.value + ", ";
      });
      console.log(666, this.addCart);

      // Da dang nhap

      // Chua dang nhap
      var cart = JSON.parse(localStorage.getItem('cart'));
      console.log(555, cart);
      if (cart && cart != null && cart != []) {
        cart.push(this.addCart);
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        localStorage.setItem('cart', JSON.stringify([this.addCart]));
      }

      cart = JSON.parse(localStorage.getItem('cart'));
      console.log(888, cart);
    }
  }
};
</script>
