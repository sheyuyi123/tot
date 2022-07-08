<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar v-model="active" class="layout-tabbar" route>
      <van-tabbar-item to="/home">
        <template #icon>
          <TouiaoIcon icon="shouye"></TouiaoIcon>
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <TouiaoIcon icon="wenda"></TouiaoIcon>
        </template>
        问答
      </van-tabbar-item>
      <van-tabbar-item to="/viden">
        <template #icon>
          <TouiaoIcon icon="shipin"></TouiaoIcon>
        </template>
        视频
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <TouiaoIcon icon="wode"></TouiaoIcon>
        </template>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
