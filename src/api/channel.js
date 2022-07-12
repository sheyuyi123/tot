import request from "@/utils/request";

export const RecomMended = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/channels",
  });
};

export const fetchAllChannels = () => {
  return request({
    method: "GET",
    url: "/v1_0/channels",
  });
};
export const fetchAllChannel = (channel) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/channels",
    data: {
      channels: [channel],
    },
  });
};
export const deleteUserChannel = (channelId) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/channels/${channelId}`,
  });
};
