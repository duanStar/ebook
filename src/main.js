import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import { errorHandler } from './utils/error'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(MpvueRouterPatch)
Vue.config.errorHandler = errorHandler

const app = new Vue(App)
app.$mount()
