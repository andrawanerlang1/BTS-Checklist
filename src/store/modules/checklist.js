import axios from 'axios'

export default {
  state: {
    allChecklist: ''
  },
  mutations: {
    setAllChecklist(state, payload) {
      state.allChecklist = payload
    }
  },
  actions: {
    getAllChecklist(context, payload) {
      console.log(context)
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/checklist`, payload)
          .then(result => {
            context.commit('setAllChecklist', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deleteChecklists(context, payload) {
      console.log(context)
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}/checklist/${payload}`)
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    saveChecklists(context, payload) {
      console.log(context)
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/checklist`, payload)
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    GetterAllChecklist(state) {
      return state.allChecklist
    }
  }
}
