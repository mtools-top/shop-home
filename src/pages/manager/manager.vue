<template>
  <div id="manager">
    <div id="breadcrund">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="addManager">
      <el-button type="success" round @click="addManager">添加管理员</el-button>
    </div>
    <v-MeunMessageBox :info="info" ref="meunMessageBox"></v-MeunMessageBox>
    <v-ManagerList
      @editNowManager="editNowManager"
      @delNowManager="delNowManager"
    ></v-ManagerList>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { delManager, edieManager } from "../../utils/request";
import vManagerList from "./components/managerList";
import vMeunMessageBox from "./components/meunMessageBox";
export default {
  data() {
    return {
      info: {
        show: false
      }
    };
  },
  methods: {
    addManager() {
      this.info.show = true;
      this.info.title = "添加管理员";
      this.info.type = "添加";
    },
    editNowManager(uid) {
      this.info.show = true;
      this.info.title = "编辑管理员";
      this.info.type = "编辑";
      edieManager({ uid }).then(res => {
        res.data.list.password = ''
        this.$refs.meunMessageBox.updataForm(res.data.list);
      });
    },
    delNowManager(uid) {
      delManager({ uid }).then(res => {
        // 删除的时候,如果当前页只有一条数据.删除以后需要跳转上一页
        this.acManagerList();
        // 然后请求总页数,更新.
        this.acManagerCount()
      });
    },
    ...mapActions({
      acManagerList: "manager/acManagerList",
      acManagerCount: "manager/acManagerCount"
    })
  },
  components: {
    vMeunMessageBox,
    vManagerList
  }
};
</script>

<style></style>
