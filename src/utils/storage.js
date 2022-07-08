// 封装快速获取和设置本地存储的方法

// 获取数据的方法
// key
export function getLocal(key) {
  let data = localStorage.getItem(key);
  // 如果可以JOSN.parse那我就转化
  // 如果不支持JSON.parse >> 直接返回原始数据
  try {
    data = JSON.parse(data);
  } catch (e) {
    console.log(e);
  }
  return data;
}
// 参数
// key 数据

export function setLocal(key, data) {
  // 判断data是不是object，如果是objest执行JOSN.stringify，否则直接写入
  localStorage.setItem(
    key,
    typeof data === "object" ? JSON.stringify(data) : data
  );
}
