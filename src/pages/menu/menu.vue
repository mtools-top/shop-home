<template>
  <div id="menu">
    <div id="breadcrund">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="addMenu">
      <el-button type="success" round @click="addMenu">添加菜单</el-button>
    </div>
    <v-MeunMessageBox :info="info" ref="meunMessageBox"></v-MeunMessageBox>
    <v-MenuList :info="info" @nowMenuData='nowMenuData'></v-MenuList>
  </div>
</template>

<script>
import vMeunMessageBox from "./components/meunMessageBox";
import vMenuList from "./components/menuList";
export default {
  data() {
    return {
      info: {
        show: false
      }
    };
  },
  methods: {
    // 添加按钮
    addMenu() {
      this.info.show = true;
      this.info.title = "添加菜单";
      this.info.type = "添加";
    },
    // menuList传过来需要编辑的数据,传向弹窗
    nowMenuData(data){
      // console.log(this.$refs);
      this.$refs.meunMessageBox.editForm(data)
    }
  },
  components: {
    vMeunMessageBox,
    vMenuList
  }
};
</script>

<style>

</style>
