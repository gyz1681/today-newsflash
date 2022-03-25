import request from '@/utils/request.js'

export const getArticles = params => {
  return request({
    method: 'get',
    url: '/v1_0/articles',
    params
  })
}

export const getArticleId = articleId => {
  return request({
    method: 'get',
    url: `/v1_0/articles/${articleId}`

  })
}

export const addCollect = target => {
  return request({
    method: 'post',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`

  })
}

export const addLike = target => {
  return request({
    method: 'post',
    url: 'v1_0/article/likings',
    data: {
      target
    }

  })
}

export const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`

  })
}
