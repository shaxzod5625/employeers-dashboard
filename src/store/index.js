import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const url = 'http://localhost:3000/employees'

export default new Vuex.Store({
  state: {
    employees: [],
    oneEmployeer: {}
  },
  mutations: {
    ADD_EMPLOYEER(state, user) {
      state.employees.push(user)
    },
    DELETE_EMPLOYEER(state, id) {
      state.employees.splice(id, 1)
    },
    ONE_USER(state, user) {
      state.oneEmployeer = user
    },
    EDIT_USER(state, user) {
      state.employees[user.id] = user
    }
  },
  actions: {
    async getEmployees() {
      await axios.get(url)
        .then(res => {
          this.state.employees = res.data
        })
        .catch(e => {
          console.log(e)
          throw e
        })
    },
    async addEmploteer({ commit }, user) {
      try {
        let newUser = {
          ...user,
          id: this.state.employees.length + 1
        }
        await axios.post(`${url}`, newUser)
          .then(res => {
            commit('ADD_EMPLOYEER', res.data)
          })
          .catch(e => {
            console.log(e);
            throw e
          })
      } catch (e) {
        console.log(e);
        throw e
      }
    },
    async deleteEmployeer({ commit }, id) {
      await axios.delete(`${url}/${id}`)
        .then(res => {
          commit('DELETE_EMPLOYEER', id)
        })
        .catch(e => {
          console.log(e);
          throw e
        })
    },
    async oneEmployeer({ commit }, id) {
      await axios.get(`${url}/${id}`)
        .then(res => {
          commit('ONE_USER', res.data)
        })
        .catch(e => {
          console.log(e)
          throw e
        })
    },
    async editEmployeer({ commit }, user) {
      await axios.put(`${url}/${user.id}`, user)
        .then(res => {
          commit('EDIT_USER', res.data)
        })
        .catch(e => {
          console.log(e)
          throw e
        })
    }
  },
  modules: {
  }
})
