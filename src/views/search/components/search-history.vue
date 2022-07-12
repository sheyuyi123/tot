<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <template v-if="isDeleteStatus">
          <van-tag type="danger" class="btn" @click="deleteAll"
            >全部删除</van-tag
          >
          <van-tag type="success" class="btn" @click="isDeleteStatus = false"
            >完成</van-tag
          >
        </template>
        <van-icon name="delete" v-else @click="isDeleteStatus = true">
        </van-icon>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="clickHistoryItem(item, index)"
    >
      <template #default>
        <van-icon name="close" v-if="isDeleteStatus"></van-icon>
      </template>
    </van-cell>
    <!-- <van-cell title="删除1 ">
      <template #default>
        <van-icon name="close"></van-icon>
      </template>
    </van-cell> -->
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  props: {
    searchHistories: {
      type: Array,
    },
  },
  data() {
    return {
      isDeleteStatus: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    deleteAll() {
      this.$emit("deleteAll");
    },
    clickHistoryItem(item, index) {
      if (this.isDeleteStatus) {
        this.searchHistories.splice(index, 1);
      } else {
        this.$emit("onSearch", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  margin-left: 10px;
}
</style>
