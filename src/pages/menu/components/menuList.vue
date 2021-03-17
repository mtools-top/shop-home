<template>
  <div id="menu-list">
    <el-table
      :data="menuList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号"> </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> 
        <template v-slot='prop'>
          <i :class="prop.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
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
          <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
          <el-popconfirm
            title="确定删除当前【菜单】吗?"
            @confirm="delNowMenu(prop.row.id)"
          >
            <el-button type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delMenu, editMenu } from "../../../utils/request";
export default {
  data() {
    return {};
  },
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/menuList"
    })
  },
  methods: {
    // 小弹窗删除确认按钮
    delNowMenu(id) {
      delMenu({ id })
        .then(res => {
          this.$message({
            type: "success",
            duration: 1000,
            message: "删除成功"
          });
          // 刷新列表页
          this.acMenuList();
        })
        .catch(err => {
          this.$message.error("删除失败");
          // 刷新列表页
          this.acMenuList();
        });
    },
    // 列表编辑按钮
    edit(id) {
      editMenu({ id }).then(res => {
        let now = res.data.list;
        now.id = id;
        // 向父级传数据
        this.$emit("nowMenuData", now);
        this.info.show = true;
        this.info.title = "编辑菜单";
        this.info.type = "修改";
      });
    },
    // 查询菜单列表
    ...mapActions({
      acMenuList: "menu/acMenuList"
    })
  },
  mounted() {
    this.acMenuList();
  }
};
</script>

<style>
</style>
