<template>
  <div>
    <h1>demo</h1>
    <hr />
    <h4>{{ cound }}</h4>
    <h5>{{ user.name }}</h5>
    <van-field type="number" v-model.number="num"></van-field>

    <button @click="shuzi">shuzi++</button>
    <button @click="uname">shuzi++</button>
    <button @click="shuzi2">传数字</button>
  </div>
</template>

<script>
// store中定义数据
// 组件中获取数据

// 1.msaState 快速获取vuex state状态的方法
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["cound", "user"]),
  },
  methods: {
    shuzi() {
      // 调用mutations内部的方法，commit('mutations内部的事件名')
      this.$store.commit("shuzi");
    },
    uname() {
      this.$store.commit("uname");
    },
    shuzi2() {
      // 可以动态传递参数
      this.$store.commit("shuzi2", this.num);
    },
  },
};
</script>

<style lang="scss" scoped></style>
