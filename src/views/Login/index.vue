<template>
  <div class="login-container">
    <van-nav-bar title="登录" left="guanbi">
      <template #left>
        <van-icon name="cross" color="#fff" @click="$router.back()" />
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
        :maxlength="11"
        type="number"
      >
        <template #left-icon>
          <TouiaoIcon icon="shouji"></TouiaoIcon>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        :maxlength="6"
        type="number"
      >
        <template #left-icon>
          <TouiaoIcon icon="yanzhengma"></TouiaoIcon>
        </template>
        <template #button>
          <van-count-down
            @finish="isShowCountDown = false"
            v-if="isShowCountDown"
            :time="time"
            format=" ss s"
          />
          <van-button
            v-else
            size="small"
            native-type="button"
            type="primary"
            class="send-sms-btn"
            @click="yanzhengma"
            :disabled="isDisabled"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      isDisabled: false,
      isShowCountDown: false,
      time: 3000,
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只能6位",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // value自动从表单里面获取的值
      // 获取到的值是对象：key >> 表单的name值  value >> 用户输入的值
      // await后面写的是promise
      // 只有promise成功了的情况下才会继续执行

      // data数据满足接口文档的格式就可以
      // 如果捕获await的错误， 用 tey catch
      try {
        const res = await login(this.user);
        this.$store.commit("setUser", res.data.data);
        console.log(res);
        Toast.success("登录成功");
        this.$router.push("/");
      } catch (e) {
        // e >> 错误对象信息
        // if (e && e.response && e.response.data && e.response.data.message){
        //
        // }
        // 使用  可选链  运算符进行数据是否存在的判断
        // 为什么要判断：如果直接从undefined获取属性，会直接报错，导致程序停止进行

        Toast.fail(e?.response?.data?.message || "服务端错误");
        // 什么时候提示成功
        // 什么时候提示失败
      }
    },
    async yanzhengma() {
      // 通过传入表单name值，决定校验哪个表单 validate(name?: string | string[])
      // Promise：异步解决方案。解决了什么问题？回调地狱 >> 链式调用形式 >> 每一次then返回一个新的promise对象
      // async await >> 链式调用 (不够优雅) >> 看起来是同步形式
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        this.isDisabled = true;
        // TODO:发送验证码请求
        await getSmsCode(this.user.mobile);
        // 展示倒计时？
        this.isShowCountDown = true;
        // 获取成功以后进行提示
        Toast.success("发送验证码成功");
      } catch (e) {
        // 如果获取失败了，进行错误的提示
        Toast.fail(e.response.data.message);
        this.isShowCountDown = false;
      } finally {
        this.isDisabled = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
