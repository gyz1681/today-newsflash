<template>
  <div class="update-photo">
    <img :src="img" class="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'update-photo',
  data () {
    return {
      cropper: null
    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false

      //   crop(event) {
      //     console.log(event.detail.x);
      //     console.log(event.detail.y);
      //     console.log(event.detail.width);
      //     console.log(event.detail.height);
      //     console.log(event.detail.rotate);
      //     console.log(event.detail.scaleX);
      //     console.log(event.detail.scaleY);
      //   },
    })
  },
  methods: {
    onConfirm () {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        //   console.log(blob);
        // updateUserPhoto({
        //     photo:blob
        // })
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserPhoto(formData)
        console.log(data)
        this.$emit('close')
        //   console.log(this.cropper.getData());
        this.$emit('update-photo', data.data.photo)
      })
    }
  }
}
</script>

<style>
.update-photo {
  background-color: #000;
  height: 100%;
}
.img {
  display: block;
  max-width: 100%;
}
.update-photo .toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
}
.update-photo .toolbar .cancel {
  width: 90px;
  height: 90px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.update-photo .toolbar .confirm {
  width: 90px;
  height: 90px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>
