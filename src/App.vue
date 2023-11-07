<template>
  <el-container>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <div v-if="!is_manager">
      <div>
        <CHeader v-show="true" />
      </div>
      <div>
        <router-view></router-view>
      </div>
      <div>
        <CFooter />
      </div>
    </div>
    <el-container v-if="is_manager">
      <MNav v-if="!getIsLoginManager" />
      <el-container>
        <!-- <MHeader v-if="!getIsLoginManager" /> -->
        <router-view></router-view>
      </el-container>
      <!-- <MFooter v-if="!getIsLoginManager"/> -->
    </el-container>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </el-container>
</template>

<script>
import { routeGuard } from "./utils/routeGuard";
import CHeader from "./layouts/customer/Header.vue";
import CFooter from "./layouts/customer/Footer.vue";
// import MHeader from "./layouts/manager/Header.vue";
// import MFooter from './layouts/manager/Footer.vue'
import MNav from "./layouts/manager/Nav.vue";
import router from './router'
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
    // MHeader,
    // MFooter,
    MNav,
  },
  data() {
    return {
      is_manager: false,
      is_login_manager: store.state.is_login_manager,
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
