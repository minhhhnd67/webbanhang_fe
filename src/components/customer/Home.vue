<template>
  <el-container>
    <el-main>
      <el-row>
        <el-carousel indicator-position="outside">
          <el-carousel-item style="background-color: #ffd400;" v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-row>
      <teplate>
        <el-row style="background-color: #ffd400; border-radius: 20px 20px 0px 0px;" type="flex" justify="center">
          <el-col :span="3">
            <h2>Sản phẩm mới</h2>
          </el-col>
        </el-row>
        <el-row class="row-bg" >
          <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6" v-for="(o, index) in 10" :key="o" :index="index">
            <el-card :body-style="{ padding: '10px 50px', margin: '5px' }">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
              <div style="padding: 14px;">
                <span>Yummy hamburger</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">Operating</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </teplate>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "C-Home",
  components: {},
  data() {
    return {};
  },
  computed: {
    thisRoute() {
      return this.$route;
    },
  },
  created() {},
  methods: {},
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

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
