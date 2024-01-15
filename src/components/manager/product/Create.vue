<template>
  <el-container>
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
              <el-select filterable v-model="ruleForm.category_id" placeholder="Danh mục sản phẩm">
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
            <el-form-item label="Số lượng" prop="amount">
              <el-col :span="12">
                <el-input-number v-model="ruleForm.amount" :min="1" :max="100000"></el-input-number>
              </el-col>
            </el-form-item>
            <el-form-item label="Ảnh" prop="image">
              <el-upload
                class="avatar-uploader"
                :action="urlUploadImage"
                :headers="{
                  Authorization: `Bearer ${this.tokenBE}`,
                }"
                :data="{
                  path: 'product',
                }"
                name="image"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

            </el-form-item>
            <el-form-item label="Mô tả sản phẩm" prop="description">
              <vue-editor v-model="ruleForm.description"></vue-editor>
            </el-form-item>
            <el-form-item v-for="(attribute, index) in this.listAttribute" :label="attribute.name" :key="attribute.id" prop="status">
              <el-select filterable v-model="ruleForm.attributes[index].attribute_option_id" placeholder="Lựa chọn">
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
                  <el-row
                    v-for="(skuOption, idx) in attribute.skuOptions"
                    :key="idx"
                  >
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
                >Thêm mới</el-button
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
import config from "@/config/config.dev.json";
import router from "@/router";
import store from "@/store";
import { createProduct } from "@/api/manager/product.js";
import { listCategory } from "@/api/manager/category.js" ;
import { VueEditor } from "vue2-editor";
import { getTokenBE } from "@/utils/helper.js";
export default {
  name: "M-Product-Create",
  components: { VueEditor },
  data() {
    return {
      baseURL: "",
      urlUploadImage: "",
      tableData: [],
      search: "",
      ruleForm: {
        store_id: "",
        category_id: "",
        code: "",
        name: "",
        title: "",
        price: "",
        amount: 1,
        image: "",
        description: "",
        attributes: [],
        skus: [
          {
            name: "",
            skuOptions: [
              {
                name: "",
              },
            ],
          },
        ],
      },
      rules: {
      },
      roles: [],
      listCategory: [],
      listAttribute: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      tokenBE: "",
      imageUrl: "",
    };
  },
  computed: {
    thisRoute() {
      return this.$route;
    },
  },
  created() {
    this.ruleForm.store_id = store.state.mUser.store_id;
    this.baseURL = config.BASE_BE_API;
    this.urlUploadImage = config.BASE_BE_API + "/api/upload-image"
    this.getListCategory();
    this.tokenBE = getTokenBE();
  },
  mounted() {},
  watch: {
    "ruleForm.category_id": {
      handler: function (newValue) {
        if (newValue != "") {
          var category = this.listCategory.filter((obj) => {
            return obj.id == newValue;
          });
          this.listAttribute = category[0].attributes

          this.ruleForm.attributes = [];
          this.listAttribute.forEach(object => {
            this.ruleForm.attributes.push({
              attribute_id: object.id,
              attribute_option_id: "",
              attribute_option_value: "",
            });
            
          });
        }
      },
      deep: true,
    },
  },
  methods: {
    backToListProduct() {
      router.push({ name: "m-product-list" });
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

          const response = await createProduct(this.ruleForm);
          if (response.data.code == 200) {
            this.$message({
              showClose: true,
              message: "Thêm sản phẩm mới thành công!",
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
    async getListCategory() {
      const response = await listCategory();
      if (response.data.code == 200) {
        this.listCategory = response.data.data;
      }
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res.code == 200) {
        this.ruleForm.image = res.data.path;
      }
    },
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error('Avatar picture size can not exceed 10MB!');
      }
      return isLt10M;
    }
  },
};
</script>

<style scoped>
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
