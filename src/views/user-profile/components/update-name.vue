<template>
  <div class="update-name">
    <van-nav-bar
      left-text="取消"
      right-text="完成"
      title="设置昵称"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="filed">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  data () {
    return {
      localName: this.value
    }
  },
  props: {
    value: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中、、、',
        forbidClick: true,
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await updateUserProfile({
          name: localName
        })
        this.$emit('input', localName)
        this.$emit('close')

        this.$toast.success('更新成功')
      } catch (err) {
        this.$$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style>
.filed {
  padding: 20px;
}
</style>
