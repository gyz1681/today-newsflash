<template>
  <div class="mine-container">
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image round class="avatar" fit="cover" :src="UserInfo.photo" />
          <span class="text">{{ UserInfo.name }}</span>
        </div>
        <div class="right">
          <van-button round size="mini" to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="dataitem">
          <span class="count">{{ UserInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="dataitem">
          <span class="count">{{ UserInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="dataitem">
          <span class="count">{{ UserInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="dataitem">
          <span class="count">{{ UserInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item>
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      title="退出登录"
      class="layout-cell"
      v-if="user"
      clickable
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MineIndex',
  data () {
    return {
      UserInfo: {}
    }
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout () {
      this.$dialog
        .confirm({
          title: '确认退出么？'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
      console.log('推出')
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.UserInfo = data.data
        console.log(data)
      } catch (err) {
        this.$toast('获取失败')
      }
    }
  }
}
</script>

<style>
.mine-container .header {
  height: 261px;
  background: url("~@/assets/banner.png");
  background-size: cover;
}
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mobile-img {
  height: 100px;
  width: 100px;
  margin-bottom: 15px;
}
.text {
  font-size: 28px;
  color: #fff;
}
.user-info .base-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 181px;
  box-sizing: border-box;
  padding: 76px 32px 23px;
}
.user-info .data-stats {
  display: flex;
}
.left {
  display: flex;
  align-items: center;
}
.left .text {
  color: #fff;
}
.left .avatar {
  height: 80px;
  width: 80px;
  margin-right: 15px;
  border: 2px solid #fff;
}
.data-stats .dataitem {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 80px;
  justify-content: center;
  align-items: center;
}
.data-stats .dataitem .count {
  font-size: 26px;
}
.data-stats .dataitem .text {
  font-size: 15px;
}
.grid-nav .text {
  color: black;
}
.grid-nav .gird-item {
  height: 120px;
}
.grid-nav .iconfont {
  font-size: 35px;
}
.grid-nav .icon-shoucang {
  color: #eb5253;
}
.grid-nav .icon-lishi {
  color: #ff9d1d;
}
.grid-nav .text {
  font-size: 20px;
}
.layout-cell {
  margin-top: 8px;
  text-align: center;
  color: #d86262;
}
</style>
