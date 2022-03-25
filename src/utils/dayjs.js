import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

Vue.filter('relativeTime', value => {
  return dayjs().from(dayjs(value))
})
// console.log(dayjs().format('YYYY-MM-DD'))

// console.log(dayjs().from(dayjs('1990')))
// 2 years ago
// dayjs().from(dayjs(), true) // 2 years

// dayjs().fromNow()

// dayjs().to(dayjs())

// dayjs().toNow()
