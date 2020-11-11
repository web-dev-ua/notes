import Snackbar from '~/models/snackbar'

export const state = () => ({
  snackbar: {}
})

export const mutations = {
  setSnackbar (state, snackbar = {}) {
    state.snackbar = snackbar
  }
}

export const actions = {
  close ({ commit }) {
    commit('setSnackbar')
  },
  showError ({ commit }, text) {
    commit('setSnackbar', new Snackbar(text, 'pink'))
  },
  showSuccess ({ commit }, text) {
    commit('setSnackbar', new Snackbar(text, 'success'))
  }
}

export const getters = {
  snackbar: state => state.snackbar
}
