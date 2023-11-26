import { Result } from 'element-ui';
<template>
  <el-container>
    <el-header
      class="navbar"
      style="
        padding: 25px 10px;
        font-size: 12px;
        background-color: rgb(255, 255, 255);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      "
    >
      <el-row :span="24">
        <el-col :span="21"><MBreadcrumb :routeMatched="thisRoute.matched" /></el-col>
        <el-col :span="3" class="right">
          <el-dropdown placement="right-start">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Profile</el-dropdown-item>
              <el-dropdown-item @click="handleLogout()">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span @click="handleLogout()">Tom</span>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-row type="flex" class="row-bg">
        <el-col :span="24">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="200px"
            class="demo-ruleForm"
          >
            <el-form-item label="Danh mục sản phẩm" prop="category_id">
              <el-select v-model="ruleForm.category_id" placeholder="Danh mục sản phẩm">
                <el-option
                  v-for="item in listCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Mã sản phẩm" prop="code">
              <el-col :span="12">
                <el-input v-model="ruleForm.code"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Tên sản phẩm" prop="name">
              <el-col :span="12">
                <el-input v-model="ruleForm.name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Tiêu đề sản phẩm" prop="title">
              <el-col :span="12">
                <el-input v-model="ruleForm.title"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Giá" prop="price">
              <el-col :span="12">
                <el-input v-model="ruleForm.price"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Ảnh" prop="image">
              <el-input v-model="ruleForm.image"></el-input>
            </el-form-item>
            <el-form-item label="Mô tả sản phẩm" prop="description">
              <vue-editor v-model="ruleForm.description"></vue-editor>
            </el-form-item>
            <el-form-item
              v-for="(attribute, index) in this.listAttribute"
              :label="attribute.name"
              :key="attribute.id"
              prop="status"
            >
              <el-select
                v-model="ruleForm.attributes[index].attribute_option_id"
                placeholder="Lựa chọn"
              >
                <el-option
                  v-for="item in attribute.attribute_options"
                  :key="String(item.id)"
                  :label="item.name"
                  :value="String(item.id)"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Sku sản phẩm" prop="name">
              <el-button @click="addSku()" type="success">+</el-button>
            </el-form-item>
            <el-form-item>
              <el-row
                style="
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
                  padding: 10px;
                "
                v-for="(attribute, index) in ruleForm.skus"
                :key="index"
              >
                <el-col :span="8">
                  <el-row>
                    <el-col :span="24">
                      <span class="demo-input-label">Tên sku</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-input v-model="attribute.name"> </el-input>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="15">
                  <el-row>
                    <el-form-item label="Lựa chọn sku" prop="name">
                      <el-button @click="addSkuOption(index)" type="success" circle
                        ><i class="el-icon-plus"></i>
                      </el-button>
                    </el-form-item>
                  </el-row>
                  <el-row v-for="(skuOption, idx) in attribute.skuOptions" :key="idx">
                    <el-form-item label="Tên lựa chọn" prop="name">
                      <el-row :gutter="10">
                        <el-col :span="16">
                          <el-input v-model="skuOption.name"></el-input>
                        </el-col>
                        <el-col :span="2">
                          <el-button
                            type="danger"
                            size="mini"
                            icon="el-icon-close"
                            circle
                            @click="deleteSkuOption(index, idx)"
                          ></el-button>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-row>
                </el-col>
                <el-col :span="1">
                  <el-button
                    type="danger"
                    size="small"
                    icon="el-icon-delete"
                    circle
                    @click="deleteAttribute(index)"
                  ></el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >Cập nhật</el-button
              >
              <el-button @click="backToListProduct()">Quay lại</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import MBreadcrumb from "@/layouts/manager/Breadcrumb.vue";
import { logout } from "@/api/manager/auth";
import { showProduct, updateProduct } from "@/api/manager/product.js";
import store from "@/store";
import router from "@/router";
import { listCategory } from "@/api/manager/category.js";
import { VueEditor } from "vue2-editor";
export default {
  name: "M-Store-Update",
  components: { MBreadcrumb, VueEditor },
  data() {
    return {
      tableData: [],
      search: "",
      ruleForm: {
        store_id: 4,
        category_id: "",
        code: "",
        name: "",
        title: "",
        price: "",
        image: "",
        description: "",
        attributes: [],
        skus: [
          // {
          //   name: "",
          //   skuOptions: [
          //     {
          //       name: "",
          //     },
          //   ],
          // },
        ],
      },
      rules: {},
      roles: [],
      listCategory: [],
      listAttribute: [],
    };
  },
  computed: {
    thisRoute() {
      return this.$route;
    },
    breadcrumbs() {
      var breadcrumbs = [];
      var currentRoute = this.$route;

      while (currentRoute.parent) {
        breadcrumbs.push({
          name: currentRoute.parent.meta.breadcrumb,
        });
        currentRoute = currentRoute.parent;
      }
      return breadcrumbs;
    },
  },
  created() {
    this.getListCategory();
    this.showProduct();
  },
  mounted() {},
  watch: {
    "ruleForm.category_id": {
      handler: function (newValue) {
        if (newValue != "") {
          var category = this.listCategory.filter((obj) => {
            return obj.id == newValue;
          });
          this.listAttribute = category[0].attributes;

          this.ruleForm.attributes = [];
          this.listAttribute.forEach((object) => {
            this.ruleForm.attributes.push({
              attribute_id: object.id,
              attribute_option_id: "",
              attribute_option_value: "",
            });
          });
          console.log(111, this.ruleForm.attributes);
        }
      },
      deep: true,
    },
  },
  methods: {
    backToListProduct() {
      router.push({ name: "m-product-list" });
    },
    async getListCategory() {
      const response = await listCategory();
      if (response.data.code == 200) {
        this.listCategory = response.data.data;
        console.log(333, this.listCategory);
      }
    },
    async showProduct() {
      const response = await showProduct(this.$route.params.id);

      if (response.data.code == 200) {
        console.log(123, response.data.data);
        const data = response.data.data;
        this.ruleForm.category_id = data.category_id;
        this.ruleForm.code = data.code;
        this.ruleForm.name = data.name;
        this.ruleForm.title = data.title;
        this.ruleForm.description = data.description;
        this.ruleForm.price = data.price;
        this.ruleForm.image = data.image;
        this.ruleForm.category_id = data.category_id;
        this.ruleForm.category_id = data.category_id;

        const skus = data.skus;
        skus.forEach((sku) => {
          var dataSku = {
            name: sku.name,
            skuOptions: []
          };
          sku.sku_options.forEach((skuOption) => {
            dataSku.skuOptions.push({name: skuOption.name});
          });
          this.ruleForm.skus.push(dataSku);
        });

        setTimeout(() => {
          const attributes = data.attributes;
          console.log(456, attributes);
          console.log(678, this.listAttribute);
          this.listAttribute.forEach((attribute, index) => {
            var attr = attributes.filter((obj) => {
              return (obj.pivot.attribute_id == attribute.id);
            });
            this.ruleForm.attributes[index].attribute_option_id =
              String(attr[0].pivot.attribute_option_id);
            this.ruleForm.attributes[index].attribute_option_value =
              attr[0].pivot.attribute_option_value;
          });
          console.log(666, this.ruleForm);
        }, 500);
      }
    },
    async handleLogout() {
      const response = await logout();
      if (response.data.code == 200) {
        store.state.is_login_manager = true;
        store.state.tokenBE = "";
        localStorage.setItem("tokenBE", "");
        this.$router.push({ name: "m-login" });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //   alert("submit!");

          this.ruleForm.attributes.forEach((object, index) => {
            var attribute = this.listAttribute[index].attribute_options.filter((obj) => {
              return obj.id == object.attribute_option_id;
            });

            object.attribute_option_value = attribute[0].name;
          });

          console.log(6688, this.ruleForm);

          const response = await updateProduct(this.$route.params.id, this.ruleForm);
          if (response.data.code == 200) {
            this.$message({
              showClose: true,
              message: "Cập nhật sản phẩm thành công!",
              type: "success",
            });
            router.push({ name: "m-product-list" });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addSku() {
      this.ruleForm.skus.push({
        name: "",
        skuOptions: [
          {
            name: "",
          },
        ],
      });
    },
    deleteAttribute(index) {
      this.ruleForm.skus.splice(index, 1);
    },
    addSkuOption(index) {
      this.ruleForm.skus[index].skuOptions.push({
        name: "",
      });
    },
    deleteSkuOption(index, idx) {
      this.ruleForm.skus[index].skuOptions.splice(idx, 1);
    },
  },
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
