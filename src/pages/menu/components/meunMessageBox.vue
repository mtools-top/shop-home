<template>
  <div id="dialog">
    <el-dialog :title="info.title" :visible.sync="info.show" :beforeClose='cancel'>
      <el-form :model="form">
        <!--  -->
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.title"
            autocomplete="off"
            placeholder="请输入菜单名称"
          ></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" disabled :value="10000"></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="i in menuList" :key='i.id' :label="i.title" :value="i.id"></el-option>
            
          </el-select>
        </el-form-item>
        <!--  -->
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" @change="radioChange"
            >目录</el-radio
          >
          <el-radio v-model="form.type" :label="2" @change="radioChange"
            >菜单</el-radio
          >
        </el-form-item>
        <!--  -->
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type == 1"
        >

          <el-select v-model="form.icon">
            <el-option label="--请选择--" disabled value=""></el-option>
            <el-option
              v-for="i in icons"
              :key="i"
              :label="i"
              :value="i"
            >
            <i :class="i"></i>
            <span>{{i}}</span>
            </el-option>
          </el-select>

        </el-form-item>
        <!--  -->
        <el-form-item label="菜单目录" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url">
            <el-option label="--请选择--" disabled value=""></el-option>
            <el-option
              v-for="i in urls"
              :key="i"
              :label="i"
              :value="i"
            ></el-option>
          </el-select>
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
        <el-button type="primary" @click="menuSub" v-if="info.type == '添加'"
          >添 加</el-button
        >
        <el-button
          type="primary"
          @click="modifyForm(form)"
          v-if="info.type == '修改'"
          >修 改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions ,mapGetters} from "vuex";
import { addMenu, modifyMenu } from "../../../utils/request";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        pid: 10000,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      },
      // 所有图标
      icons: ["el-icon-s-tools", "el-icon-setting", "el-icon-user-solid",'el-icon-user','el-icon-s-goods','el-icon-goods'],
      // 所有菜单地址
      urls: [
        "index",
        "menu",
        "role",
        "manager",
        "cate",
        "specs",
        "goods",
        "member",
        "banner",
        "seckill"
      ]
    };
  },
  props: ["info"],
  computed:{
    ...mapGetters({
      menuList:'menu/menuList'
    })
  },
  methods: {
    // menu文件通过ref控制的函数,修改弹窗表单中默认信息
    editForm(data) {
      this.form = data;
    },
    // 弹窗修改按钮
    modifyForm(form) {
      modifyMenu(form)
        .then(err => {
          this.$message({
            type: "success",
            duration: 1000,
            message: "修改操作成功"
          });
          this.cancel();
          // 刷新列表页
          this.acMenuList();
        })
        .catch(err => {
          this.$message.error("修改操作失败");
          // 刷新列表页
          this.acMenuList();
        });
      // 刷新列表页
      this.acMenuList();
    },
    // 弹窗添加按钮
    menuSub() {
      console.log(this.form);
      //   this.info.show = false;
      addMenu(this.form)
        .then(res => {
          this.$message({
            type: "success",
            duration: 1000,
            message: "添加操作成功"
          });
          this.cancel();
          // 刷新列表页
          this.acMenuList();
        })
        .catch(err => {
          this.$message.error("添加操作失败");
          // 刷新列表页
          this.acMenuList();
        });
    },
    // 弹窗清空信息
    cancel() {
      this.form = {
        pid: 10000,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      };
      // 弹出窗口隐藏
      this.info.show = false;
    },
    // 弹窗单选切换时需要清空
    radioChange() {
      this.form.icon = "";
      this.form.url = "";
    },
    // 查询菜单列表
    ...mapActions({
      acMenuList: "menu/acMenuList"
    })
  }
};
</script>

<style></style>
