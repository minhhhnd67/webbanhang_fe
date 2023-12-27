<template>
  <el-row>
    <el-row v-if="!is_manager">
      <div>
        <CHeader/>
      </div>
      <div>
        <router-view></router-view>
      </div>
      <div>
        <CFooter />
      </div>
    </el-row>

    <el-row v-if="is_manager && !getIsLoginManager">
      <el-col :span="5">
        <MNav v-if="!getIsLoginManager" />
      </el-col>
      <el-col
        :span="19"
      >
        <el-row>
          <MHeader v-if="!getIsLoginManager" />
        </el-row>
        <el-row>
          <router-view></router-view>
        </el-row>
      </el-col>
    </el-row>

    <el-row v-if="getIsLoginManager && is_manager">
      <router-view></router-view>
    </el-row>
  </el-row>
</template>

<script>
import { routeGuard } from "./utils/routeGuard";
import CHeader from "./layouts/customer/Header.vue";
import CFooter from "./layouts/customer/Footer.vue";
import MHeader from "./layouts/manager/Header.vue";
// import MFooter from './layouts/manager/Footer.vue'
import MNav from "./layouts/manager/Nav.vue";
import store from "./store";
import { mapGetters } from "vuex";
export default {
  name: "App",
  beforeRouteEnter(to, from, next) {
    routeGuard(to, from, next);
  },
  components: {
    CHeader,
    CFooter,
    MHeader,
    // MFooter,
    MNav,
  },
  data() {
    return {
      is_manager: false,
      is_login_manager: store.state.is_login_manager,
      loading: true
    };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "getIsLoginManager",
      // ...
    ]),
  },
  created() {
    if (window.location.pathname.toLocaleLowerCase().includes("manager")) {
      this.is_manager = true;
      // if (window.location.pathname.toLocaleLowerCase().includes("login")) {
      //   this.is_login_manager = true
      // } else {
      //   this.is_login_manager = false
      // }
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
body {
  margin: 0px;
}
</style>
