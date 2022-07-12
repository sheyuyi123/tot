<template>
  <div class="home-container">
    <van-nav-bar fixed>
      <template #title>
        <van-button
          size="small"
          icon="sousuo"
          type="info"
          round
          block
          class="search-btn"
          to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs animated swipeable v-model="active" class="channel-tabs">
      <van-tab
        v-for="(item, index) in mended"
        :key="index"
        :title="item.name"
        to="/article"
        ><ArticleList :channel="item"
      /></van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="showPopup = true">
          <TouiaoIcon icon="gengduo"></TouiaoIcon>
        </div>
      </template>
    </van-tabs>

    <van-popup
      close-icon-position="top-left"
      closeable
      position="bottom"
      v-model="showPopup"
      style="height: 90%"
    >
      <ChannelEdit
        @changeActive="changeActive"
        :mended="mended"
        :active="active"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import ChannelEdit from "./components/channel-edit";
import ArticleList from "./components/article-list.vue";
import { RecomMended } from "@/api/channel";
import TouiaoIcon from "@/components/TouiaoIcon.vue";
import { USERSCHENNLE } from "@/constants/index";
import { getLocal } from "@/utils/storage";
export default {
  name: "HomePage",
  components: { TouiaoIcon, ArticleList, ChannelEdit },
  props: {},
  data() {
    return {
      showPopup: false,
      active: 0,
      mended: [],
      list: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.RecomMended();
  },
  mounted() {},
  methods: {
    async RecomMended() {
      const res = await RecomMended();
      // console.log(res);
      this.mended = res.data.data.channels;

      try {
        // 获取用户tokey
        const token = this.$store.state.user?.token;
        // 获取本地存储频道数据
        let channles = getLocal(USERSCHENNLE);
        if (token || !channles) {
          const res = await RecomMended();
          channles = res.data.data.channels;
        }
        this.mended = channles;
      } catch (e) {
        this.$toast("获取用户数据失败");
      }
    },
    changeActive(index, status) {
      this.active = index;
      // 弹层关闭
      this.showPopup = status;
    },
  },
};
</script>

<style scoped lang="less">
/deep/.van-nav-bar__title {
  width: 80%;
  max-width: unset;
}
.search-btn {
  background-color: #5babfb;
}
.van-nav-bar .van-icon {
  color: #fff;
}
/deep/ .channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    height: 80px;
    .van-tab__text {
      font-size: 27px;
      color: #777777;
    }
  }

  .van-tab--active .van-tab__text {
    color: #333 !important;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background: rgba(50, 150, 250, 1);
    border-radius: 3px;
    bottom: 8px;
  }
  .van-tabs__nav {
    padding: 0;
  }
}
.home-container {
  // margin-top: 80px;
  padding-top: 170px;
  padding-bottom: 80px;
}
.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
}
.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}
</style>
