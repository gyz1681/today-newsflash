<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">你的频道</div>

      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fixChannels.includes(channel.id)"
        >
        </van-icon>
        <span
          class="title-text"
          slot="text"
          :class="{ active: index === active }"
          >{{ channel.name }}</span
        >
      </van-grid-item>
    </van-grid>

    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        icon="plus "
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deletUserChannel
} from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'channelEdit',
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fixChannels: [0]
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        if (this.fixChannels.includes(channel.id)) {
          return
        }
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
        this.deleteChannel(channel)
      } else {
        this.$emit('update-active', index)
      }
    },
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    async onAddChannel (channel) {
      console.log(channel)
      this.myChannels.push(channel)
      if (this.user) {
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (err) {
          this.$toast('保存失败，一会再试')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    async deleteChannel (channel) {
      try {
        if (this.user) {
          await deletUserChannel(channel.id)
        } else {
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('保存失败')
      }
    }
  },
  created () {
    this.loadAllChannels()
  },
  computed: {
    recommendChannels () {
      const channels = []
      this.allChannels.forEach((channel) => {
        const ret = this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id
        })
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    },
    ...mapState(['user'])
  }
}
</script>

<style>
.channel-edit {
  padding: 50px 0;
}
.title-text {
  font-size: 20px;
  color: #333333;
}
.edit-btn {
  width: 60px;
  height: 30px;
}
.grid-item {
  height: 50px;
  width: 140px;
}
.grid-item .van-grid-item__content {
  background-color: #f4f5f6;
  white-space: nowrap;
}
.grid-item .van-grid-item__content .van-grid-item__icon-wrapper {
  position: unset;
}
.channel-edit .recommend-grid .grid-item .van-grid-item__content {
  flex-direction: row;
}
.channel-edit
  .recommend-grid
  .grid-item
  .van-grid-item__content
  .van-icon-plus {
  font-size: 16px;
}
.channel-edit
  .recommend-grid
  .grid-item
  .van-grid-item__content
  .van-grid-item__text {
  margin-top: 0;
  /* justify-content: center;
  text-align: center; */
}
.my-grid .grid-item .van-icon-clear {
  position: absolute;
  right: -5px;
  top: -5px;
  font-size: 15px;
  color: #cacaca;
  z-index: 2;
}
.grid-item .van-grid-item__content .active {
  color: red;
}
</style>
