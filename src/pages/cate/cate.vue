<template>
  <div id="manager">
    <div id="breadcrund">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="addManager">
      <el-button type="success" round @click="addCate">添加商品分类</el-button>
    </div>
    <v-MeunMessageBox :info="info" ref="meunMessageBox"></v-MeunMessageBox>
    <v-CateList
      @editNowCate="editNowCate"
      @delNowCate="delNowCate"
    ></v-CateList>
  </div>
</template>

<script>
import vMeunMessageBox from "./components/meunMessageBox";
import vCateList from "./components/cateList";
import { delCate, editCate } from "../../utils/request";
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      info: {
        show: false
      }
    };
  },
  methods: {
    addCate() {
      this.info = {
        show: true,
        title: "添加商品分类",
        type: "添加"
      };
    },
    editNowCate(id) {
      editCate({ id }).then(res => {
        this.info = {
          show: true,
          title: "编辑商品分类",
          type: "编辑"
        };
        res.data.list.id = id; //修改的必要条件
        this.$refs.meunMessageBox.updataForm(res.data.list);
      });
    },
    delNowCate(id) {
      delCate({ id }).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "删除商品分类操作成功"
        });
        this.acCateList();
      });
    },
    ...mapActions({
      acCateList:'cate/acCateList'
    })
  },
  components: {
    vMeunMessageBox,
    vCateList
  }
};
</script>

<style></style>
