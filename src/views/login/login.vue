<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon
        slot="left"
        name="cross"
        class="icon-close"
        @click="$router.back()"
      />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginFrom">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 5"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            native-type="button"
            round
            size="small"
            type="default"
            class="send-sms-btn"
            @click="sendMsg"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendMsg } from '@/api/user'

export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userRules: {
        mobile: [
          {
            required: true,
            message: '请输入正确内容'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入正确内容'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      // 按下登录按钮后进行的操作有
      // 1.获取表单数据
      const user = this.user
      // 2.进行表单数据验证
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0
      })
      // 3.提交表单数据到后台请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)

        this.$toast.success('登陆成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码不正确')
          this.$toast.fail('手机号或验证码不正确 ')
        } else {
          console.log('登录失败', err)
          this.$toast.fail('登陆失败')
        }
      }
      // 4.根据响应结果处理后续操作
    },
    async sendMsg () {
      console.log('sendMsg')
      // 1.校验手机号码
      try {
        await this.$refs.loginFrom.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        console.log('验证失败', err)
        return
      }

      // 2.验证通过显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        const res = await sendMsg(this.user.mobile)
        console.log('发送成功', res)
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送频繁，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style>
.login-container .iconfont {
  font-size: 30px;
}
.login-container .send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}

.login-btn-wrap {
  padding: 53px 33px;
}
.login-btn-wrap .login-btn {
  background-color: #6bd4fb;
  border: none;
}
</style>
