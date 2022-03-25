import request from '../utils/request'
// import store from '@/store'
export const login = data => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}
export const sendMsg = mobile => {
  return request({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`

  })
}

export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/v1_0/user'
    // headers: {
    //     Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/channels'
    // headers: {
    //     Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

export const addFollow = target => {
  return request({
    method: 'post',
    url: '/v1_0/user/followings',
    // headers: {
    //     Authorization: `Bearer ${store.state.user.token}`
    // }
    data: {
      target
    }
  })
}
export const deleteFollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
    // headers: {
    //     Authorization: `Bearer ${store.state.user.token}`
    // }

  })
}

export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/profile'
    // headers: {
    //     Authorization: `Bearer ${store.state.user.token}`
    // }

  })
}

export const updateUserProfile = data => {
  return request({
    method: 'patch',
    url: '/v1_0/user/profile',
    // headers: {
    //     Authorization: `Bearer ${store.state.user.token}`
    // }
    data
  })
}

export const updateUserPhoto = data => {
  return request({
    method: 'patch',
    url: '/v1_0/user/photo',
    // headers: {
    //     Authorization: `Bearer ${store.state.user.token}`
    // }
    data
  })
}
