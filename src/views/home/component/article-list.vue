<template>
  <div class="art-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      :success-text="refreshSuccessText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败。从新加载"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></ArticleItem>
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'art-list',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isreFreshLoading: false,
      refreshSuccessText: ''
    }
  },
  methods: {
    // onLoad() {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }

    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 1000);

    // },
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // if (Math.random() >= 0.5) {
        //   JSON.parse("sdf");
        // }
        // console.log(data)
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }

      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      // 加载状态结束

      // 数据全部加载完成
    },
    // 下拉帅新触发调用
    async onRefresh () {
      // console.log('onRefresh')
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // if (Math.random() >= 0.1) {
        //   JSON.parse("sdf");
        // }
        const { results } = data.data
        this.list.unshift(...data.data.results)
        this.isreFreshLoading = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}`
      } catch (err) {
        console.log(err)
        this.isreFreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
      // 请求获取数据，把数据放到列表顶部
      // 关闭刷新loading状态
    }
  }
}
</script>

<style>
.art-list {
  height: 80vh;
  overflow-y: auto;
}
</style>
