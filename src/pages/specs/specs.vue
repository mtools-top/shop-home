<template>
  <div id="manager">
    <div id="breadcrund">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="addManager">
      <el-button type="success" round @click="addSpecs">添加商品规格</el-button>
    </div>
    <v-MeunMessageBox :info="info" ref="meunMessageBox"></v-MeunMessageBox>
    <v-SpecsList
      @editNowSpecs="editNowSpecs"
      @delNowSpecs="delNowSpecs"
    ></v-SpecsList>
  </div>
</template>

<script>
import vMeunMessageBox from "./components/meunMessageBox";
import vSpecsList from "./components/specsList";
import { delSpecs, editSpecs } from "../../utils/request";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      info: {
        show: false
      }
    };
  },

  methods: {
    addSpecs() {
      this.info = {
        show: true,
        title: "添加商品规格",
        type: "添加"
      };
    },
    editNowSpecs(id) {
      editSpecs({ id }).then(res => {
        this.info = {
          show: true,
          title: "编辑商品规格",
          type: "编辑"
        };
        res.data.list.id = id; //修改的必要条件
        this.$refs.meunMessageBox.updataForm(res.data.list[0]);
      });
    },
    delNowSpecs(id) {
      delSpecs({ id }).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "删除商品规格操作成功"
        });
      });
    },
  },
  mounted() {},
  components: {
    vMeunMessageBox,
    vSpecsList
  }
};
</script>

<style></style>
