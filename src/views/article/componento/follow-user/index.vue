<template>
  <van-button
    v-if="!isFollwed"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="follow"
    :loading="isFollwLoading"
    >关注</van-button
  >
  <van-button
    v-else
    @click="follow"
    class="follow-btn"
    round
    size="small"
    :loading="isFollwLoading"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";
export default {
  name: "FollowUser",
  model: {
    prop: "isFollwed",
    event: "changeisFollwed",
  },
  data() {
    return {
      isFollwLoading: false,
    };
  },
  props: {
    autId: {
      request: true,
    },
    isFollwed: {
      request: true,
    },
  },
  methods: {
    async follow() {
      this.isFollwLoading = true;
      try {
        if (this.isFollwed) {
          await deleteFollow(this.autId);
        } else {
          await addFollow(this.autId);
        }
        this.$emit("changeisFollwed", !this.isFollwed);

        this.$notify({
          type: "success",
          message: this.isFollwed ? "关注成功" : "取消关注",
        });
        this.isFollwLoading = false;
      } catch (e) {
        console.log(e);
        this.$notify({
          type: "danger",
          message: "操作失败",
        });
        this.isFollwLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
