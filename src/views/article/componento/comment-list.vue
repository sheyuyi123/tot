<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="出错了，点击重试"
    >
      <CommentItem
        @reply-click="$emit('reply-click', $event)"
        v-for="item in list"
        :key="item.com_id"
        :comment="item"
      ></CommentItem>
      <!-- <van-cell :title="item.content" v-for="item in list" :key="item.art_id" /> -->
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import CommentItem from "./article-comment-item.vue";
import { getComments } from "@/api/comment";
export default {
  name: "ArticleComment",
  components: { CommentItem },
  props: {
    source: {
      required: true,
    },
    list: {
      request: true,
    },
    type: {
      type: String,
      default: "a",
    },
  },
  data() {
    return {
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      limit: 10,
      offset: null, // 请求下一页数据的页码
      error: false, // 总数据条数
    };
  },

  methods: {
    async onLoad() {
      try {
        const res = await getComments({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit,
        });
        this.list.push(...res.data.data.results);
        this.loading = false;
        if (res.data.data.last_id === res.data.data.end_id) {
          this.finished = true;
        } else {
          this.offset = res.data.data.last_id;
        }
      } catch (e) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.van-list {
  margin-bottom: 45px;
}
</style>
