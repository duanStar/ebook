import { getOpenId } from './index'
import { setError } from '../utils/error'

export function getSetting(auth, onSuccess, onFail) {
  mpvue.getSetting({
    success(res) {
      if (res.authSetting[`scope.${auth}`]) {
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail(err) {
      setError(err.message)
    }
  })
}

export function getUserInfo(onSuccess, onFail) {
  mpvue.getUserInfo({
    success: (result) => {
      const { userInfo } = result
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(result)
      }
    },
    fail: (err) => {
      setError(err.message)
    }
  })
}

export function setStorageSync(key, data) {
  mpvue.setStorageSync(key, data)
}

export function getStorageSync(key, data) {
  const value = mpvue.getStorageSync(key, data)
  return value
}

export function getUserOpenId(callback) {
  mpvue.login({
    success(res) {
      if (res.code) {
        getOpenId(res.code).then(res => {
          const { openid } = res.data.data
          setStorageSync('openid', openid)
          callback && callback(openid)
        }).catch(err => {
          console.log(err)
          hideLoading()
        })
      } else {
        console.log(res)
      }
    },
    fail(err) {
      setError(err.message)
    }
  })
}

export function showLoading(title) {
  mpvue.showLoading({
    title,
    mask: true
  })
}

export function hideLoading(title) {
  mpvue.hideLoading()
}

export function showToast(title, icon = 'none', mask = true) {
  return mpvue.showToast({
    title,
    icon,
    duration: 2000,
    mask
  })
}

export function showModal(title, callback) {
  mpvue.showModal({
    title: '提示',
    content: `是否确认将《${title}》图书移出书架?`,
    showCancel: true,
    cancelText: '取消',
    cancelColor: '#000000',
    confirmText: '确定',
    confirmColor: '#3CC51F',
    success: (result) => {
      if (result.confirm) {
        callback && callback()
      }
    }
  })
}

export function setNavigationBarTitle(title) {
  mpvue.setNavigationBarTitle({
    title
  })
}
