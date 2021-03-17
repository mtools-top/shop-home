<template>
  <div id="role-list">
    <el-table
      :data="roleList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="角色编号"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>
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
          <el-button type="primary" @click="editNowRole(prop.row.id)">编辑</el-button>
          <el-popconfirm title="确定删除当前【菜单】吗?" @confirm="delNowRole(prop.row.id)">
            <el-button type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      roleList: "role/roleList"
    })
  },
  methods: {
    // 点击编辑时获取一次菜单列表并向父组件传递id
    editNowRole(id) {
      // 先获取一下菜单列表,不然每次刷新后第一次点击不会出现列表
      this.acMenuList();
      this.$emit("editNowRole", id);
    },
    // 删除按钮时向父组件传递id
    delNowRole(id){
      this.$emit("delNowRole", id);
    },
    ...mapActions({
      acRoleList: "role/acRoleList",
      acMenuList: "menu/acMenuList"
    })
  },
  mounted() {
    this.acRoleList();
  }
};
</script>

<style>
</style>
