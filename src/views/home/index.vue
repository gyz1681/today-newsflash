<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        class="search-btn"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!--频道编辑弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
      <ChannelEdit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdateActive"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './component/article-list.vue'
import ChannelEdit from './component/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',

  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        // const { data } = await getUserChannels();
        // // console.log(data);
        // this.channels = data.data.channels;
        let channels = []
        if (this.user) {
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            channels = localChannels
          } else {
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    onUpdateActive (index, isChannelEditShow = true) {
      // console.log("home", index);
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>
.home-container {
  padding-top: 90px;
}
.home-container .van-nav-bar__title {
  max-width: unset;
}
.search-btn {
  width: 300px;
  height: 34px;
  background-color: #5babfb;
  border: none;
  font-size: 18px;
}
.van-nav-bar .van-icon {
  color: #fff;
}
.channel-tabs .van-tab {
  min-width: 100px;
  border-right: 1px solid #edeff3;
  color: #777;
}
.channel-tabs .van-tab--active {
  color: #333;
}
.channel-tabs .van-tabs__wrap {
  height: 40px;
  position: fixed;
  z-index: 1;
  top: 45px;
  left: 0;
  right: 0;
}
.hamburger-btn {
  position: fixed;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 45px;
  background-color: #fff;
  opacity: 0.902;
  width: 0.88rem;
  height: 1.0933rem;
}
.hamburger-btn::before {
  position: absolute;
  left: 0;
  content: "";
  width: 1px;
  height: 100%;
  background-image: url(~@/assets/gradient-gray-line.png);
  background-size: contain;
}
.placeholder {
  flex-shrink: 0;
  width: 0.88rem;
  height: 1.0933rem;
}
.home-container {
  padding-bottom: 40px;
}
</style>
