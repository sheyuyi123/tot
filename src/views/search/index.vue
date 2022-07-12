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
    <SearchResult v-if="isShowResult"></SearchResult>
    <!-- 搜索建议 -->
    <SearchSuggestion
      @onSearch="onSearch"
      :searchText="searchText"
      v-else-if="searchText"
    ></SearchSuggestion>
    <!-- 搜索历史 -->
    <SearchHistory v-else></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from "@/views/search/components/search-history.vue";
import SearchSuggestion from "@/views/search/components/search-suggestion.vue";
import SearchResult from "@/views/search/components/search-result.vue";
export default {
  name: "SearchPage",
  components: { SearchHistory, SearchSuggestion, SearchResult },
  props: {},
  data() {
    return {
      searchText: "",
      isShowResult: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSearch(value) {
      // 默认 >> 搜索历史
      // 如果输入框有内容 >> 搜索建议
      // 按下回车 >> 搜索结果
      console.log("开始");
      this.isShowResult = true;
      this.searchText = value;
    },
    onCancel() {
      console.log("取消");
    },
  },
};
</script>

<style scoped></style>
