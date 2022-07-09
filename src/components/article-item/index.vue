<template>
  <div class="article-item">
    <van-cell :title="article.title">
      <template #default v-if="article.cover.type === 1">
        <van-image class="img" :src="article.cover.images[0]"></van-image>
      </template>

      <template #label>
        <div class="img-container" v-if="article.cover.type === 3">
          <van-image
            v-for="item in article.cover.images"
            :key="item"
            :src="item"
          ></van-image>
        </div>
        <div class="label-container">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.img {
  width: 200px;
}
.img-container {
  display: flex;
  justify-content: space-between;
  .van-image {
    width: 200px;
    height: 200px;
  }
}
/deep/.label-container span {
  margin-left: 10px;
}
</style>
