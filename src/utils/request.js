function createFly() {
  if (mpvuePlatform === 'wx') {
    const Fly = require('flyio/dist/npm/wx')
    return new Fly()
  } else {
    return null
  }
}

function handleError(msg) {
  mpvue.showToast({
    title: msg,
    icon: 'error',
    duration: 2000,
    mask: true
  })
}

export function get(url, params = {}, showError = true) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.get(url, params).then(response => {
        if (response && response.data && response.data.error_code === 0) {
          resolve(response)
        } else {
          if (showError) {
            const msg = (response && response.data && response.data.msg) || '请求失败'
            handleError(msg)
          }
          reject(response)
        }
      }).catch(err => {
        if (showError) {
          handleError(err.message)
        }
        reject(err)
      })
    })
  }
}
export function post(url, params = {}, showError = true) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.post(url, params).then(response => {
        if (response && response.data && response.data.error_code === 0) {
          resolve(response)
        } else {
          if (showError) {
            const msg = (response && response.data && response.data.msg) || '请求失败'
            handleError(msg)
          }
          reject(response)
        }
      }).catch(err => {
        if (showError) {
          handleError(err.message)
        }
        reject(err)
      })
    })
  }
}
