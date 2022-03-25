<template>
  <van-cell
    class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId: article.art_id,
      },
    }"
  >
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image :src="img" fit="cover" class="cover-item-img"></van-image>
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>

    <van-image
      class="rigth-cover"
      slot="default"
      :src="article.cover.images[0]"
      v-if="article.cover.type === 1"
      fit="cover"
    ></van-image>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.article-item .title {
  font-size: 20px;
  color: #3a3a3a;
}
.article-item .van-cell__value {
  flex: unset;
  width: 100px;
  height: 60px;
  padding-left: 20px;
}
.article-item .right-cover {
  width: 100px;
  height: 60px;
}
.article-item .label-info-wrap span {
  font-size: 10px;
  color: #b4b4b4;
  margin-right: 15px;
}
.article-item .cover-wrap {
  display: flex;
  padding: 10px 0;
}
.article-item .cover-wrap .cover-item:not(:last-child) {
  flex: 1;
  height: 100px;
  padding-right: 2px;
}
.article-item .cover-wrap .cover-item .cover-item-img {
  width: 100%;
  height: 100px;
}
</style>
