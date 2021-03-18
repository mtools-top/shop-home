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
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value="" disabled> </el-option>
            <el-option label="顶级分类" :value="0"> </el-option>
            <el-option
              v-for="i in cateList"
              :key="i.id"
              :label="i.catename"
              :value="i.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!--  -->
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.catename"
            autocomplete="off"
            placeholder="请输入添加商品类型"
          ></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="uploadImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        <el-button type="primary" v-if="info.type == '添加'" @click="addCateBtn"
          >添 加</el-button
        >
        <el-button
          type="primary"
          v-if="info.type == '编辑'"
          @click="modifyCateBtn"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { addCate, modifyCate } from "../../../utils/request";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1
      },
      imageUrl: ""
    };
  },
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/cateList"
    })
  },
  methods: {
    addCateBtn() {
      if (!this.form.catename) {
        this.$message.error("请输入分类名称");
        return;
      }
      addCate(this.form).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "添加操作成功"
        });
        this.cancel();
        this.acCateList();
      });
    },
    // 接收cateList文件传来的数据,更新表单内容.从而编辑
    updataForm(data) {
      // this.imageUrl = this.$localhost + data.img;
      data.img = '';
      this.form = data;
    },
    // 编辑按钮
    modifyCateBtn() {
      console.log(this.form);
      modifyCate(this.form).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "修改商品分类操作成功"
        });
        this.cancel();
        this.acCateList();
      });
    },
    cancel() {
      this.info.show = false;
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1
      };
      this.imageUrl = "";
    },
    // 上传照片
    uploadImg(file) {
      console.log(file);
      // 判断图片类型,不采用type判断.用文件后缀判断
      let imgType = [".jpg", ".png", ".jpeg", ".gif"];
      let nowImgType = file.name.slice(file.name.lastIndexOf("."));
      // const isJPG = file.type === "image/jpeg";
      // 判断文件大小
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!imgType.some(item => item == nowImgType)) {
        this.$message.error("上传头像图片只能是" + imgType.join("|") + "格式!");
        return;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return;
      }
      // 上传图片,并显示在img标签中
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.img = file.raw;
    },
    ...mapActions({
      acCateList: "cate/acCateList"
    })
  },
  mounted() {}
};
</script>

<style scoped>
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
