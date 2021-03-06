<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.art_id">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <FollowUser
            :autId="article.art_id"
            v-model="article.is_followed"
          ></FollowUser>
        </van-cell>

        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="countent"
          class="article-content markdown-body"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <comment-list
          @reply-click="onReplyClick"
          :list="commitList"
          :source="article.art_id"
        ></comment-list>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="isNotFound">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 发布文章评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post @postSuccess="postSuccess" :target="article.art_id" />
    </van-popup>
    <!-- /发布文章评论 -->

    <!------------------------ 评论回复 ------------------------------>
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <CommentReply
        v-if="isReplyShow"
        @close="isReplyShow = false"
        :currentComment="currentComment"
      ></CommentReply>
    </van-popup>
    <!------------------------ /评论回复 ------------------------------>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        @click="isPostShow = true"
        class="comment-btn"
        type="default"
        round
        size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="article.comm_count" color="#777" />
      <CollectArticle
        :artId="article.art_id"
        v-model="article.is_collected"
      ></CollectArticle>
      <DingZang :aotId="article.art_id" v-model="article.attitude"></DingZang>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import CollectArticle from "./componento/collect-article/index.vue";
import FollowUser from "./componento/follow-user/index.vue";
import DingZang from "./componento/dingzang/index.vue";
import { getArticleById } from "@/api/article";
// 引入美化markdown的样式文件
import "github-markdown-css";
import { ImagePreview } from "vant";
import CommentList from "./componento/comment-list.vue";
import CommentPost from "./componento/comment-post.vue";
import CommentReply from "./componento/comment-reply.vue";

// yarn add github-markdown-css -S
// 当前文件通过 import "github-markdown-css"; 引入 不需要加路径
//  内容添加类名 markdown-body
export default {
  name: "ArticleIndex",
  components: {
    FollowUser,
    CollectArticle,
    DingZang,
    CommentList,
    CommentPost,
    CommentReply,
  },
  props: {
    articleId: {
      type: [Number, String],
      required: false,
      isNotFound: false,
    },
  },
  data() {
    return {
      commitList: [],
      article: [],
      loading: false,
      isPostShow: false,
      isReplyShow: false,
      currentComment: {},
    };
  },
  provide: function () {
    return {
      articleId: this.articleId, // 或者写成 this.$route.params.articleId  也可以
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getArticleById();
  },
  mounted() {},
  methods: {
    onReplyClick(comment) {
      // console.log(comment);
      this.isReplyShow = true;
      this.currentComment = comment;
    },
    postSuccess(data) {
      console.log(data);
      this.commitList.unshift(data);
      this.isPostShow = false;
    },
    previewImg() {
      // console.log(this.$refs.countent);
      const imgs = this.$refs.countent.querySelectorAll("img");
      // console.log(imgs);
      const images = [];
      imgs.forEach((item, index) => {
        images.push(item.src);
        item.addEventListener("click", function () {
          ImagePreview({
            images: images,
            startPosition: index,
          });
        });
      });

      // console.log(images);
    },
    async getArticleById() {
      this.loading = true;
      try {
        const res = await getArticleById(this.articleId);
        // console.log(res);
        this.article = res.data.data;
        this.loading = false;

        this.$nextTick(() => {
          this.previewImg();
        });
      } catch (e) {
        this.loading = false;
        this.$toast("获取失败");
        this.isNotFound = e.response.status === 404;
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
