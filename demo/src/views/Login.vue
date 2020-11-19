<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="@/assets/logo.png">
      </div>
      <el-form class="login_form" :model="loginForm" ref="loginForm" label-width="0px" :rules="loginRules">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-s-custom" clearable ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" show-password prefix-icon="el-icon-lock" clearable ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login('loginForm')">登录</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, message: '长度大于1', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度大于6', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    login (form) {
      // TODO
      this.$refs[form].validate((valid) => {
        if (!valid) {
          this.$message.error('请输入正确的登录信息')
        } else {
          sessionStorage.setItem('userName', this.loginForm.username)
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #01111E;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        border: 1px solid #eeeeee;
        background-color: #ffffff;
        padding: 10px;
        box-shadow: 0 0 10px #dddddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -35%);
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eeeeee;
            size: 10%;
        }
    }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

</style>
