<template>
  <div class="channel-edit">
    <van-cell title="频道编辑" style="text-align: center"></van-cell>
    <van-cell title="我的频道">
      <template #default>
        <van-button
          class="edit-btn"
          plain
          round
          size="mini"
          type="danger"
          @click="isEdit = !isEdit"
        >
          {{ isEdit ? "完成" : "编辑" }}
        </van-button>
      </template>
    </van-cell>
    <van-grid :gutter="10" class="my-channel">
      <van-grid-item
        class="channel_item"
        v-for="(value, index) in mended"
        :key="value.id"
        @click="onMyChannelClick(value, index)"
      >
        <template #icon v-if="isEdit && index != 0">
          <van-icon name="clear"></van-icon>
        </template>
        <template #text>
          <span class="text" :class="{ active: active === index }">
            {{ value.name }}</span
          >
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道"> </van-cell>
    <van-grid :gutter="10" direction="horizontal">
      <van-grid-item
        icon="plus"
        class="channel_item"
        v-for="value in recommendChannels"
        :key="value.id"
        @click="addChannel(value)"
      >
        <template #text>
          <span class="text">{{ value.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { Notify } from "vant";
import differenceBy from "lodash/differenceBy";
import { fetchAllChannels } from "@/api/channel";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    mended: {
      type: Array,
      default: () => {},
    },
    active: {
      type: Number,
    },
  },
  data() {
    return {
      allchannels: [],
      isEdit: false,
    };
  },
  computed: {
    recommendChannels() {
      return differenceBy(this.allchannels, this.mended, "id");
    },
    // recommendChannels() {
    //   return this.allchannels.filter((item) => {
    //     // 从所以的频道数据里面，找到我的频道数据 >> 过滤掉
    //     return !this.mended.come((mendedItem) => mendedItem.id === item.id);
    //   });
    // },
  },
  watch: {},
  created() {
    this.fetchAllChannels();
  },
  mounted() {},
  methods: {
    async fetchAllChannels() {
      const res = await fetchAllChannels();
      // console.log(res);
      this.allchannels = res.data.data.channels;
    },
    addChannel(channel) {
      this.mended.push(channel);
    },
    onMyChannelClick(channel, index) {
      console.log(channel, index);

      if (this.isEdit) {
        if (index === 0) {
          return Notify({ type: "danger", message: "不让删除" });
        }
        if (index <= this.active) {
          this.$emit("changeActive", this.active - 1, true);
        }
        this.mended.splice(index, 1);
      } else {
        this.$emit("changeActive", index, false);
      }
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  .edit-btn {
    width: 100px;
  }
}
/deep/.channel_item .van-grid-item__content {
  background-color: #f4f5f6;
}
.van-grid-item__content .text {
  font-size: 20px;
  color: #222;
  margin-top: 0;
  &.active {
    color: red;
  }
}
/deep/.van-grid-item__content .van-icon {
  // color: #222;
  font-size: 20px;
  margin-right: 5px;
}
.my-channel {
  /deep/.van-icon {
    position: absolute;
    font-size: 30px;
    right: -15px;
    top: -15px;
    color: #cacaca;
  }
  .channel_item {
    /deep/ .van-grid-item__icon-wrapper {
      position: unset;
    }
  }
}
</style>
