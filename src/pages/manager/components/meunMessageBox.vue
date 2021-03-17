<template>
  <div id="dialog">
    <el-dialog
      :title="info.title"
      :visible.sync="info.show"
      :beforeClose="cancel"
    >
      <el-form :model="form">
        <!--  -->
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid">
            <el-option label="--请选择--" value="" disabled> </el-option>
            <el-option
              v-for="i in roleList"
              :key="i.id"
              :label="i.rolename"
              :value="i.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!--  -->
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="form.username"
            autocomplete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="form.password"
            autocomplete="off"
            type="password"
            placeholder="请输入密码"
          ></el-input>
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
        <el-button
          type="primary"
          v-if="info.type == '添加'"
          @click="addManagerBtn"
          >添 加</el-button
        >
        <el-button
          type="primary"
          v-if="info.type == '编辑'"
          @click="modifyManagerBtn"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { addManager, modifyManager } from "../../../utils/request";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        roleid: null,
        username: "",
        password: "",
        status: 1
      }
    };
  },
  props: ["info"],
  computed: {
    ...mapGetters({
      roleList: "role/roleList"
    })
  },
  methods: {
    addManagerBtn() {
      if (!(this.form.username || this.form.password)) {
        this.$message.error("请输入用户名或密码");
        return;
      } else if (!this.form.roleid) {
        this.$message.error("请选所属角色");
        return;
      }
      addManager(this.form).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "添加操作成功"
        });
        this.cancel();
        this.acManagerList();
        this.acManagerCount();
      });
    },
    modifyManagerBtn() {
      modifyManager(this.form).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "修改管理员成功操作成功"
        });
        this.cancel();
        this.acManagerList();
      });
    },
    updataForm(data) {
      this.form = data;
    },
    cancel() {
      this.info.show = false;
      this.form = {
        roleid: null,
        username: "",
        password: "",
        status: 1
      };
    },
    ...mapActions({
      acRoleList: "role/acRoleList",
      acManagerList: "manager/acManagerList",
      acManagerCount: "manager/acManagerCount"
    })
  },
  mounted() {
    // 添加管理员,所属角色列表获取.
    this.acRoleList();
  }
};
</script>

<style></style>
