import { Result } from 'element-ui';
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
            label-width="240px"
            class="demo-ruleForm"
          >
            <el-form-item label="Tên danh mục sản phẩm" prop="name">
              <el-col :span="12">
                <el-input v-model="ruleForm.name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Icon" prop="icon">
              <el-col :span="12">
                <el-input v-model="ruleForm.icon"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Thuộc tính danh mục sản phẩm" prop="name">
              <el-button @click="addAttribute()" type="success">+</el-button>
            </el-form-item>
            <el-form-item>
              <el-row
                style="
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
                  padding: 10px;
                "
                v-for="(attribute, index) in ruleForm.attributes"
                :key="index"
              >
                <el-col :span="8">
                  <el-row>
                    <el-col :span="24">
                      <span class="demo-input-label">Tên thuộc tính</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-input v-model="attribute.name"> </el-input>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <span class="demo-input-label">Điểm tương tự thuộc tính</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-input-number v-model="attribute.suggest_point" :min="1" :max="10"></el-input-number>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="15">
                  <el-row>
                    <el-form-item label="Lựa chọn thuộc tính" prop="name">
                      <el-button @click="addAttributeOption(index)" type="success" circle
                        ><i class="el-icon-plus"></i>
                      </el-button>
                    </el-form-item>
                  </el-row>
                  <el-row
                    v-for="(attributeOption, idx) in attribute.attributeOptions"
                    :key="idx"
                  >
                    <el-form-item label="Tên lựa chọn" prop="name">
                      <el-row :gutter="10">
                        <el-col :span="16">
                          <el-input v-model="attributeOption.name"></el-input>
                        </el-col>
                        <el-col :span="2">
                          <el-button
                            type="danger"
                            size="mini"
                            icon="el-icon-close"
                            circle
                            @click="deleteAttributeOption(index, idx)"
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
              <el-button @click="backToListCategory()">Quay lại</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { createCategory } from "@/api/manager/category.js";
import router from "@/router";
export default {
  name: "M-Category-Create",
  components: {
    
  },
  data() {
    return {
      tableData: [],
      search: "",
      ruleForm: {
        name: "",
        icon: "",
        attributes: [
          {
            name: "",
            suggest_point: 1,
            attributeOptions: [
              {
                name: "",
              },
            ],
          },
        ],
      },
      rules: {},
      listProvinces: [],
      listDistricts: [],
      listWards: [],
      value: "",
    };
  },
  computed: {
    thisRoute() {
      return this.$route;
    },
  },
  created() {
  },
  mounted() {},
  watch: {
    "ruleForm.province_id": {
      handler: function (newValue) {
        if (newValue != "") {
          this.getListDistricts(newValue);
          this.ruleForm.district_id = "";
        }
      },
      deep: true,
    },
    "ruleForm.district_id": {
      handler: function (newValue) {
        if (newValue != "") {
          this.getListWards(newValue);
          this.ruleForm.ward_id = "";
        } else {
          this.ruleForm.ward_id = "";
        }
      },
      deep: true,
    },
  },
  methods: {
    backToListCategory() {
      router.push({ name: "m-category-list" });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const response = await createCategory(this.ruleForm);
          if (response.data.code == 200) {
            this.$message({
              showClose: true,
              message: "Thêm danh mục sản phẩm mới thành công!",
              type: "success",
            });
            router.push({ name: "m-category-list" });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addAttribute() {
      this.ruleForm.attributes.push({
        name: "",
        suggest_point: 1,
        attributeOptions: [
          {
            name: "",
          },
        ],
      });
    },
    deleteAttribute(index) {
      this.ruleForm.attributes.splice(index, 1);
    },
    addAttributeOption(index) {
      this.ruleForm.attributes[index].attributeOptions.push({
        name: "",
      });
    },
    deleteAttributeOption(index, idx) {
      this.ruleForm.attributes[index].attributeOptions.splice(idx, 1);
    }
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
