<template>
  <div id="role">
    <div id="breadcrund">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="addMenu">
      <el-button type="success" round @click="addRole">添加角色</el-button>
    </div>
    <v-MeunMessageBox :info="info" ref="meunMessageBox"></v-MeunMessageBox>
    <v-RoleList
      @editNowRole="editNowRole"
      @delNowRole="delNowRole"
    ></v-RoleList>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { delRole, editRole, menuList } from "../../utils/request";
import vMeunMessageBox from "./components/meunMessageBox";
import vRoleList from "./components/roleList";
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
    addRole() {
      this.info.show = true;
      this.info.title = "添加角色";
      this.info.type = "添加";
      // 获取菜单列表,并传向弹窗
      menuList().then(res => {
        this.$refs.meunMessageBox.updataData(res);
      });
    },
    // 接收子组件传来的id,再传给弹出窗口
    editNowRole(id) {
      this.info.show = true;
      this.info.title = "编辑角色";
      this.info.type = "编辑";
      editRole({ id }).then(res => {
        // 添加一个id
        res.data.list.id = id;
        this.$refs.meunMessageBox.updataFrom(res);
      });
    },
    // 接收子组件传来的id,删除当前行
    delNowRole(id) {
      delRole({ id }).then(res => {
        // 刷新角色列表
        this.acRoleList();
      });
    },
    ...mapActions({
      acRoleList: "role/acRoleList"
    })
  },
  components: {
    vMeunMessageBox,
    vRoleList
  }
};
</script>

<style>
</style>
