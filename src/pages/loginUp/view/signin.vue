<template>
    <div class="page-better">
      <van-form @submit="fnSubmit" class="page-form">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="请输入密码"
          label="请输入密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round size="large" type="info" native-type="submit">
            登陆
          </van-button>
        </div>
        <div class="page-signup" @click="fnSignup">去注册</div>
      </van-form>
    </div>
</template>
<script>
export default {
  data () {
    return {
      title: "登陆",
      username: "",
      password: "",
    };
  },
  created () {
  },
  methods: {
    fnSignup () {
      this.$router.push("/signin");
    },
    fnSubmit () {
      let that = this;
      if (this.username.trim() == "") {
        that.$toast("请输入用户名！");
      } else if (this.username.match(/[<'">]/g)) {
        that.$toast("请输入合法字符！");
      } else {
        that.$axios({
          url: "/api/signin",
          method: "POST",
          data: {
            name: that.username,
            password: that.password,
          }
        }).then((res) => {
          let data = res.data;
          if (data.data == "") {
            that.$toast("用户名或密码错误");
          } else {
            that.$toast("登录成功");
            window.localStorage.setItem("token", data.token);
            window.localStorage.setItem("token_exp", new Date().getTime());
            window.location.href = "/funds/index.html"
          }
        }).catch((err) => {
          that.$toast(err);
        });
      }
    },
  }
};
</script>
<style scoped>
.page-form {
  margin-top: 20px;
}
.page-signup {
  position: absolute;
  right: 20px;
  color: #1989fa;
}
</style>
