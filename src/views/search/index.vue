<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResult :searchText="searchText" v-if="isShowResult"></SearchResult>
    <!-- 搜索建议 -->
    <SearchSuggestion
      @onSearch="onSearch"
      :searchText="searchText"
      v-else-if="searchText"
    ></SearchSuggestion>
    <!-- 搜索历史 -->
    <SearchHistory
      @deleteAll="searchHistories = []"
      @onSearch="onSearch"
      :searchHistories="searchHistories"
      v-else
    ></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from "@/views/search/components/search-history.vue";
import SearchSuggestion from "@/views/search/components/search-suggestion.vue";
import SearchResult from "@/views/search/components/search-result.vue";
import { getLocal, setLocal } from "@/utils/storage";
import { HISTORYKEY } from "@/constants/index.js";
export default {
  name: "SearchPage",
  components: { SearchHistory, SearchSuggestion, SearchResult },
  props: {},
  data() {
    return {
      searchText: "",
      isShowResult: false,
      searchHistories: getLocal(HISTORYKEY) || [],
    };
  },
  computed: {},
  watch: {
    searchHistories(val) {
      setLocal(HISTORYKEY, val);
    },
  },
  created() {},
  methods: {
    onSearch(value) {
      // 默认 >> 搜索历史
      // 如果输入框有内容 >> 搜索建议
      // 按下回车 >> 搜索结果
      console.log("开始");
      // 搜索结果页面展示
      this.isShowResult = true;

      this.searchText = value;
      // 添加之前，先判断value是否已经在搜索历史列表里面
      const index = this.searchHistories.indexOf(value);
      if (index != -1) {
        // 找到的这项删除
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(value);
    },
    onCancel() {
      console.log("取消");
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped></style>
