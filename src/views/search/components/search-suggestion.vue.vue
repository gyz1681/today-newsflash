<template>
<div class="search-suggestion">
  <van-cell icon="search" v-for="(text,index) in suggestion" :key="index" @click="$emit('search',text)">
    <!-- 当我们点击某个建议搜索的列表时，给父组件定义文本框更新事件并且传值 -->
    <div slot="title" v-html="highlight(text)"  ></div>
    <!-- 使用v-html指令可以绑定渲染带有HTML标签的字符串，所以这里需要使用插槽 -->
  </van-cell>
</div>
</template>
<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestion: [] // 联想建议数据列表
    }
  },
  methods: {
    // 封装函数发起联想建议的函数 发起请求
    async getSearchSuggestion (q) {
      try {
        const { data } = await getSearchSuggestion(q)
        // console.log(data)
        this.suggestion = data.data.options
      } catch (err) {
        this.$toast('获取数据失败，请稍后再试')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式// 中间的内容都会当做匹配字符串来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动new RegExp
      // RegExp 正则表达式构造函数
      // 参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      // 参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  },
  watch: {
    searchText: {
      // 当searvhText 发生改变的时候就会调用handler函数
      // 按需引入ludash 的防抖函数进行优化
      handler: debounce(function (value) {
        // 数据发生变化调用请求函数
        this.getSearchSuggestion(value)
      }, 200),
      immediate: true // 开启立即调用
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion{
 /deep/ .active {
     color:blue;
  }
}
</style>
