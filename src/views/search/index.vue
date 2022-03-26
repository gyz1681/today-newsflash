<template>
  <div class="search-page">
      <form class="search-input" action="/">
  <van-search
    v-model="searchText"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
    @focus="showResult = false"
  />
</form>
<!-- 搜索结果 -->
<SearchResults v-if="showResult" :search-text="searchText" />
<!-- 联想建议 -->
<SearchSuggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"/>
<!-- 搜索历史 -->
<SearchHistory v-else :search-history="searchHistory" @search="onSearch" @clearSearch="searchHistory=[]"/>

  </div>
</template>

<script>
import SearchResults from './components/search-results.vue'
import SearchSuggestion from './components/search-suggestion.vue.vue'
import SearchHistory from './components/search-history.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'Search',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResults
  },
  data () {
    return {
      searchText: '',
      // 定义变量控制搜索结果显示和隐藏
      showResult: false, // 保存返回来的联想建议
      searchHistory: getItem('SEARCH_HISTORY') || [] // 保存历史记录
    }
  },
  methods: {
    onCancel () {
      this.$router.back(-1)
    },
    onSearch (val) {
      // console.log('触发搜索结果') 触发显示结果
      // 直接调用onSearch方法，并且把点击的值传入更新数据
      this.searchText = val
      // 要求：不要有重复历史记录，最新的排在最前面
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)
      this.showResult = true
      // 更新文本框内容 ,存储历史记录
    }
  },
  watch: {
    searchHistory (val) {
      // console.log(val)
      // 侦听历史记录的变化
      const key = 'SEARCH_HISTORY'
      setItem(key, val)
    }
  }

}
</script>

<style lang="less" scoped>
.search-page{
  padding-top: 56px;
  .search-input{
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }

 /deep/ .van-field__left-icon{
 color:#ccc !important;
}

}

.van-search__action{
    color:#fff;
}
div /deep/.van-search {
    background-color: #2992FF ;
}

</style>>
