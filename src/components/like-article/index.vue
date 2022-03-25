<template>
  <van-icon
    :class="{ liked: value === 1 }"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onCollect"
    :loading="loading"
  />
</template>
<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        console.log(err)
        this.$toast('操作失败')
      }
    }
  }
}
</script>

<style>
.liked {
  color: #e5645f;
}
</style>
