<template>
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      :default-index="value"
      @change="onPickChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'updateGender',
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  props: {
    value: {
      type: Number,
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
        const localGender = this.localGender

        await updateUserProfile({
          gender: localGender
        })
        this.$emit('input', localGender)
        this.$emit('close')

        this.$toast.success('更新成功')
      } catch (err) {
        this.$$toast.fail('更新失败')
      }
    },
    onPickChange (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style>
</style>
