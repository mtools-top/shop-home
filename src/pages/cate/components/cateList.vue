<template>
  <div id="manager-list">
    <el-table
      :data="cateList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="分类编号"> </el-table-column>
      <el-table-column prop="catename" label="分类名称"> </el-table-column>
      <el-table-column label="图片">
        <template v-slot="prop">
          <img :src="$localhost + prop.row.img" />
        </template>
      </el-table-column>
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
          <el-button type="primary" @click="editNowCate(prop.row.id)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定删除当前【菜单】吗?"
            @confirm="delNowCate(prop.row.id)"
          >
            <el-button type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 开始写编辑修改删除
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList"
    })
  },
  methods: {
    editNowCate(id) {
      this.$emit("editNowCate", id);
    },
    delNowCate(id) {
      this.$emit("delNowCate", id);
    },
    ...mapActions({
      acCateList: "cate/acCateList"
    })
  },
  mounted() {
    this.acCateList();
  }
};
</script>

<style scoped>
img{
  height: 50px;
}

</style>
