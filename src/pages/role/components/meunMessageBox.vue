<template>
  <div id="dialog">
    <el-dialog
      :title="info.title"
      :visible.sync="info.show"
      :beforeClose="cancel"
    >
      <el-form :model="form">
        <!--  -->
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.rolename"
            autocomplete="off"
            placeholder="请选输入角色名称"
          ></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            :default-checked-keys="defaultKey"
            ref="tree"
          >
          </el-tree>
        </el-form-item>
        <!--  -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.type == '添加'" @click="addRoleBtn"
          >添 加</el-button
        >
        <el-button
          type="primary"
          v-if="info.type == '编辑'"
          @click="modifyRoleBtn"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { addRole, modifyRole } from "../../../utils/request";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      // 弹窗信息
      form: {
        rolename: "",
        menus: "",
        status: 1
      },
      // 弹窗权限数据
      data: [],
      // 默认选中的节点,通过修改数组实现默认选中状态.在修改中使用
      defaultKey: [],
      // 弹窗权限配置
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/menuList"
    })
  },
  methods: {
    // 弹窗清空信息
    cancel() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1
      };
      this.defaultKey = [];
      // 弹出窗口隐藏
      this.info.show = false;
    },
    /**
     * 接收role通过$refs传入的信息,修改权限菜单
     * 这是点击添加事件
     */
    updataData(res) {
      this.data = res.data.list;
    },
    /**
     * 接收role通过$refs传入的信息,写入弹窗内
     * 这是点击编辑事件
     */
    updataFrom(res) {
      // 在rloeList文件中的编辑事件已经发起一次菜单列表获取请求.
      this.data = this.menuList;
      this.form = res.data.list;
      //默认选中权限内容
      this.defaultKey = JSON.parse(this.form.menus);
    },
    // 添加按钮
    addRoleBtn() {
      // 判断角色名是否为空
      if(!this.form.rolename){
        this.$message.error('请输入用户名');
        return
      }
      // 将数组转为字符串传入提交表单
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      addRole(this.form).then(err => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "添加角色操作成功"
        });
        this.cancel();
        this.acRoleList();
      });
    },
    // 编辑按钮
    modifyRoleBtn() {
      // 将数组转为字符串传入提交表单
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      modifyRole(this.form).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "修改角色操作成功"
        });
        this.cancel();
        this.acRoleList();
      });
    },
    ...mapActions({
      acRoleList: "role/acRoleList"
    })
  },
  mounted() {}
};
</script>

<style></style>
