<template>
  <van-icon
    :class="{ collected: value }"
    :name="value ? 'star' : 'star-o'"
    @click="onCollect"
  />
  <!-- <van-button icon="star-o"></van-button> -->
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  data () {
    return {
      loading: false
    }
  },
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast('请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style>
.collected {
  color: #ffa500;
}
</style>
