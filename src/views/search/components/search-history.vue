<template>
<div class="search-history">
 <van-cell title="搜索历史" >
  <template v-if="showDel">
     <span @click="$emit('clearSearch')">全部删除</span>&nbsp;
   <span @click="showDel=false">完成</span>
  </template>
   <van-icon v-else @click="showDel=true" name="delete" />
 </van-cell>
 <van-cell :title="text" v-for="(text,index) in searchHistory" :key="index" @click="historyChange(text,index)">
   <van-icon v-if="showDel"  name="close"/>
 </van-cell>
 </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistory: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      showDel: false
    }
  },
  methods: {
    historyChange (text, index) {
      if (this.showDel === true) {
        this.searchHistory.splice(index, 1)
      } else {
        this.$emit('search', text)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.search {
  color: #ccc;
}
</style>
