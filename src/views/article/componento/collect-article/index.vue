<template>
  <van-button class="btn" :loading="loading" @click="changeCollected">
    <template #icon>
      <van-icon
        :color="isCollected ? 'red' : ''"
        :name="isCollected ? 'star' : 'star-o'"
      ></van-icon>
    </template>
  </van-button>
</template>

<script>
import { deleteCollect, addCollect } from "@/api/article";
export default {
  name: "CollectArticle",
  model: {
    prop: "isCollected",
    event: "changeCollected",
  },
  props: {
    isCollected: {
      required: true,
    },
    artId: {
      request: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async changeCollected() {
      this.loading = true;
      try {
        if (this.isCollected) {
          await deleteCollect(this.artId);
        } else {
          await addCollect(this.artId);
        }
        this.$emit("changeCollected", !this.isCollected);
        this.$toast(this.isCollected ? "取消收藏" : "收藏成功");
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.btn {
  border: none;
}
</style>
