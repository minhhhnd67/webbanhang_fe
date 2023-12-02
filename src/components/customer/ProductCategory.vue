<template>
  <el-container>
    <el-main>
      <el-row>
        <el-carousel indicator-position="outside">
          <el-carousel-item
            style="background-color: #ffd400"
            v-for="item in 4"
            :key="item"
          >
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-row>
      <template>
        <!-- <el-row
          style="background-color: #ffd400; border-radius: 20px 20px 0px 0px"
          type="flex"
          justify="center"
        >
          <el-col :span="3">
            <h2>Sản phẩm mới</h2>
          </el-col>
        </el-row> -->
        <el-row style="margin: 30px 10px;">
          <el-col :span="4">
            <el-row>
              <el-col :span="22">
                <el-select v-model="value" filterable placeholder="Hãng">
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
          <el-col :span="4">
            <el-row>
              <el-col :span="22">
                <el-select v-model="value" filterable placeholder="RAM">
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
          <el-col :span="4">
            <el-row>
              <el-col :span="22">
                <el-select v-model="value" filterable placeholder="Dung lượng">
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
          <el-col :span="4">
            <el-row>
              <el-col :span="22">
                <el-select v-model="value" filterable placeholder="Hệ điều hành">
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



        </el-row>
        <el-row class="row-bg">
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="6"
            v-for="(o, index) in 10"
            :key="o"
            :index="index"
          >
            <el-card :body-style="{ padding: '10px 20px', margin: '5px' }">
              <el-button>
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
                <div style="padding: 14px">
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
      </template>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "C-ProductCategory",
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
