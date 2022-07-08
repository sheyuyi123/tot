import request from "@/utils/request";
// import store from "@/store/index";

// 获取登录接口
export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

// 获取验证码接口
export const getSmsCode = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

export const fetchUserInfo = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/",
    // headers: {
    //   // vuex里面的token
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  });
};
