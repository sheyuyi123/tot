<template>
  <van-button class="btn" :loading="loading" @click="changeDingZang">
    <template #icon>
      <van-icon
        :color="isDingZang === 1 ? 'red' : ''"
        :name="isDingZang === 1 ? 'good-job' : 'good-job-o'"
      />
    </template>
  </van-button>
</template>

<script>
import { addLike, deleteLike } from "@/api/article";
export default {
  name: "DingZang",
  model: {
    prop: "isDingZang",
    event: "changeDingZang",
  },
  data() {
    return {
      loading: false,
    };
  },

  props: {
    isDingZang: {
      required: true,
    },
    aotId: {
      request: true,
    },
  },

  created() {},

  methods: {
    async changeDingZang() {
      console.log(111);
      this.loading = true;
      try {
        if (this.isDingZang === 1) {
          const res = await deleteLike(this.aotId);
          console.log(res);
          this.$emit("changeDingZang", -1);
        } else {
          await addLike(this.aotId);
          this.$emit("changeDingZang", 1);
        }

        this.$toast(this.isDingZang === -1 ? "取消点赞" : "点赞成功");
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
