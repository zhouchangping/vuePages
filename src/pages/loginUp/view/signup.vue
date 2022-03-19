<template>
    <div>
      <van-form @submit="fnSubmit">
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
        <van-field
          v-model="repeatpass"
          type="password"
          name="请确认密码"
          label="请确认密码"
          placeholder="请确认密码"
          :rules="[{ required: true, message: '请确认密码' }]"
        />
        <van-uploader
          v-model="fileList"
          multiple
          :max-count="1"
          :before-read="beforeRead"
          :after-read="afterRead"
        />
        <div style="margin: 16px">
          <van-button round size="large" type="info" native-type="submit">
            注册
          </van-button>
        </div>
      </van-form>
    </div>
</template>
<script>
export default {
  data () {
    return {
      username: "",
      password: "",
      repeatpass: "",
      fileList: []
    };
  },
  created () {
  },
  methods: {
    fnSubmit () {
      let that = this;
      if (this.username.trim() == "") {
        alert("请输入用户名！");
      } else if (this.username.match(/[<'">]/g)) {
        alert("请输入合法字符！");
      } else {
        that.$axios({
          url: "/api/signup",
          method: "POST",
          data: {
            avator: that.dataImage,
            name: that.username,
            password: that.password,
            repeatpass: that.repeatpass
          }
        }).then((res) => {
          let data = res.data;
          console.log(res);
          if (data.data == 1) {
            that.$toast("用户名存在");
          }
          else if (data.data == 2) {
            that.$toast("请输入重复的密码");
          }
          else if (data.data == 3) {
            that.$toast("注册成功");
            that.$router.push("/singin");
          }
        }).catch((err) => {
          alert(err);
        });
      }
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // this.file = file;
      // var data = new FormData();
      // data.append("file", file.file);
      // console.log(data);
      this.dataImage = file.content;
      return true;
    },
    onOversize (file) {
      console.log(file);
      that.$toast("文件大小不能超过 500kb");
    },
    // 返回布尔值
    beforeRead (file) {
      if (file.type !== "image/jpeg") {
        console.log(32434);
        that.$toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
    // 返回 Promise
    asyncBeforeRead (file) {
      return new Promise((resolve, reject) => {
        if (file.type !== "image/jpeg") {
          that.$toast("请上传 jpg 格式图片");
          reject();
        } else {
          let img = new File(["foo"], "bar.jpg", {
            type: "image/jpeg",
          });
          resolve(img);
        }
      });
    },
  },
  components: {
  }
};
</script>
<style scoped>
</style>
