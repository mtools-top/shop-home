<template>
  <div id="manager-list">
    <el-table
      :data="managerList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="用户编号"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="roleidname" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status == 1"
            >已启用</el-button
          >
          <el-button type="danger" v-else>未启用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="editNowManager(prop.row.uid)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定删除当前【菜单】吗?"
            @confirm="delNowManager(prop.row.uid)"
          >
            <el-button type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="managerCount"
      :page-size="2"
      :current-page="nowPage"
      hide-on-single-page
      @current-change="nowPageF"
      style="text-align: center;"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      // nowPage: 1
    };
  },
  computed: {
    ...mapGetters({
      managerList: "manager/managerList",
      managerCount: "manager/managerCount",
      nowPage:'manager/page'
    })
  },
  methods: {
    editNowManager(uid) {
      this.$emit("editNowManager", uid);
    },
    delNowManager(uid) {
      this.$emit("delNowManager", uid);
    },
    nowPageF(page) {
      this.acPage(page);
      this.acManagerList();
    },
    ...mapActions({
      acManagerList: "manager/acManagerList",
      acManagerCount: "manager/acManagerCount",
      acPage: "manager/acPage",
      
    })
  },
  mounted() {
    this.acManagerList();
    this.acManagerCount();
  }
};
</script>

<style></style>
