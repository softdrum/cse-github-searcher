export default {
  state: {
    infoMessage: '',
    errorMessage: '',
  },
  mutations: {
    RESET_MESSAGES(state) {
      state.errorMessage = '';
      state.infoMessage = '';
    },
    SET_ERROR_MESSAGE(state, value) {
      if (typeof value === 'string') {
        if (value.length > 1) {
          state.errorMessage = value.charAt(0).toUpperCase() + value.slice(1);
        } else {
          state.errorMessage = value;
        }
      } 
    },
    SET_INFO_MESSAGE(state, value) {
      state.infoMessage = value;
    }
  },
  actions: {
    resetMessages({ commit }) {
      commit('RESET_MESSAGES');
    }
  },
}
