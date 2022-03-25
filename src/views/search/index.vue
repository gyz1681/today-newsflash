<template>
  <div>
      <form action="/">
  <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
  />
</form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onCancel () {
      this.$router.back(-1)
    },
    onSearch () {

    }
  }
}
</script>

<style lang="css" scoped>
div /deep/.van-search {
    background-color: #2992FF;
}
.van-search__action{
    color:#fff;
}

</style>>
