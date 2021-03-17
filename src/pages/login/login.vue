<template>
  <div id="login">
    <div class="login-from">
      <h5>欢迎登陆</h5>
      <hr />
      <div>
        <label for="username">账号</label>
        <el-input
          v-model="user.username"
          placeholder="请输入账号"
          id="username"
        ></el-input>
      </div>
      <div>
        <label for="password">密码</label>
        <el-input
          v-model="user.password"
          placeholder="请输入密码"
          type="password"
          id="password"
        ></el-input>
      </div>
      <div id="sub">
        <el-button type="success" @click="login">登陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { managerLogin } from "../../utils/request";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      managerLogin(this.user).then(res => {
        if(res.data.code==500){
          this.$message.error('登陆错误')
          return
        }
        // context
        this.$message({
          type: "success",
          duration: 500,
          message: "登陆成功,正在跳转....."
        });
        this.acSession(JSON.stringify(res.data.list));
        this.$router.push("/");
      });
    },
    ...mapActions({
      acSession: "acSession"
    })
  }
};
</script>

<style>
#login {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to right, #553443, #303d60);
}
#login h5 {
  color: #333;
  font-size: 32px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
}
#login .login-from {
  position: absolute;
  padding: 30px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* transition: scale(-50%,-50%); */
  width: 500px;
  background: #eee;
  border-radius: 10px;
}
#login .login-from label {
  display: block;
  margin-bottom: 10px;
  font-size: 24px;
  color: #333;
  font-weight: bold;
  text-align: center;
}
#login div {
  margin-bottom: 20px;
}
#login .el-button {
  width: 100%;
}
</style>
