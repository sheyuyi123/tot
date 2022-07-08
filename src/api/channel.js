import request from "@/utils/request";

export const RecomMended = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/channels",
  });
};
