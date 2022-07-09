// 注册 dayjs 时间包
import dayjs from "dayjs";
// 默认英文
// 注册中文语音包
import "dayjs/locale/zh-cn";
// 引入相对时间的包
import relativeTime from "dayjs/plugin/relativeTime";
// 注册相对时间
dayjs.extend(relativeTime);
// 注册中文语音包
dayjs.locale("zh-cn");
// 当前时间 t0 指定时间 时隔多久
console.log(dayjs().to(dayjs("2021-01-01")));

import Vue from "vue";

Vue.filter("relativeTime", (value) => {
  return dayjs().to(dayjs(new Date(value)));
});
