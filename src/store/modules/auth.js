import axios from 'axios'
import router from '../../router/index'

export default {
  state: {
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    },
    setUserById(state, payload) {
      state.user = payload
    },
    delUser(state) {
      state.user = ''
      state.token = null
    }
  },
  actions: {
    logins(context, payload) {
      console.log(context)
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/login`, payload)
          .then(result => {
            localStorage.setItem('token', result.data.data.token)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    register(context, payload) {
      console.log(context)
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/register`, payload)
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    logout(context) {
      console.log(context)
      localStorage.removeItem('token')
      router.push('/login')
    },
    interceptorRequest(context) {
      axios.interceptors.request.use(
        function(config) {
          config.headers.Authorization = `Bearer ${context.state.token}`
          return config
        },
        function(error) {
          return Promise.reject(error)
        }
      )
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(
        function(response) {
          return response
        },
        function(error) {
          if (
            error.response.data.status === 403 &&
            (error.response.data.msg === 'invalid token' ||
              error.response.data.msg === 'invalid signature' ||
              error.response.data.msg === 'jwt expired' ||
              error.response.data.msg === 'jwt malformed')
          ) {
            alert(error.response.data.msg)
            context.dispatch('logout')
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    }
  }
}
