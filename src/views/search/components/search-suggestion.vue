<template>
  <div>
    <van-cell
      @click="hancleClick(item)"
      v-for="(item, index) in list"
      :key="index"
      icon="search"
    >
      <template #title>
        <div v-html="highLight(item)"></div>
      </template>
    </van-cell>
    <!-- <van-cell icon="search" title="搜索"></van-cell>
    <van-cell icon="search" title="搜索"></van-cell>
    <van-cell icon="search" title="搜索"></van-cell> -->
  </div>
</template>

<script>
// 鲁大师 的防抖
import { debounce } from "lodash";
import { getSearchSuggestion } from "@/api/search";
export default {
  name: "SearchSuggestion",
  data() {
    return {
      list: [],
    };
  },
  props: {
    searchText: String,
  },
  watch: {
    // 监听搜索内容的变化 >> 发送请求获取搜索建议列表数据
    searchText: {
      // 防抖
      handler: debounce(function (value) {
        this.getSuggestion(value);
      }, 500),
      immediate: true, // 首次也需要监听
    },
  },
  methods: {
    highLight(item) {
      // 构建替换正则表达式 g 全局 i 忽略大小写
      const reg = new RegExp(this.searchText, "gi");
      // 把获取的字符串替换新的字符串
      return item.replace(
        reg,
        `<span style="color:red">${this.searchText}</span>`
      );
    },
    hancleClick(value) {
      // console.log(value);
      this.$emit("onSearch", value);
    },
    async getSuggestion(q) {
      const res = await getSearchSuggestion(q);
      // console.log(res);
      this.list = res.data.data.options;
    },
  },
};
</script>

<style lang="less" scoped></style>
