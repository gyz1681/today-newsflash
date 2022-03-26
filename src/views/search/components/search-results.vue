<template>
<div class="search-results">
 <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
   :error.sync="error"
  error-text="请求失败，点击重新加载"
>
  <van-cell v-for="artical in list"
  :key="artical.art_id"
  :title="artical.title" @click="$router.push(`/article/${artical.art_id}`)"/>
</van-list>
</div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResults',
  props: {
    searchText: {
      typr: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false,
      per_page: 20
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        const { results } = data.data
        // console.log(results)
        // 将数据添加到数组列表中
        this.list.push(...results)
        // 将本次加载的loading关闭
        this.loading = false
        // 判断是否还有数据
        if (results.length) {
          // 如果有，则更新获取下一个数据的页码
          this.page++
        } else {
          // 如果没有则将加载状态finished设置为true
          this.finished = true
        }
      // 展示加载失败的提示状态
      // 加载失败loading为false
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    router () {
      console.log('sdfs')
    }
  }

}
</script>

<style>

</style>
