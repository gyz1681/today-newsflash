<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text"> 首页</span>
      </van-tabbar-item>

      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text"> 问答</span>
      </van-tabbar-item>

      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="text"> 视频</span>
      </van-tabbar-item>

      <van-tabbar-item to="/mine">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="text"> {{ $store.state.user ? "我的" : "未登录" }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutIndex',
  data () {
    return {}
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>
.layout-tabbar .iconfont {
  font-size: 20px;
}
.layout-tabbar .text {
  font-size: 10px;
  color: black;
}
</style>
