import request from '@/utils/request'

export const getAllChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/channels'
  })
}

export const addUserChannel = channel => {
  return request({
    method: 'patch',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
export const deletUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`

  })
}
