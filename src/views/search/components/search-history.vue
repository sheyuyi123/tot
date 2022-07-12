<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <van-tag type="danger" class="btn">全部删除</van-tag>
        <van-tag type="success" class="btn">完成</van-tag>
        <van-icon name="delete"> </van-icon>
      </template>
    </van-cell>
    <van-cell title="删除1 ">
      <template #default>
        <van-icon name="close"></van-icon>
      </template>
    </van-cell>
    <van-cell title="删除1 ">
      <template #default>
        <van-icon name="close"></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.btn {
  margin-left: 10px;
}
</style>
