import githubApiService from '@/services/githubApiService';
import { getField, updateField } from 'vuex-map-fields';

export default {
  state: {
    searchQuery: {
      login: '',
      order: 'desc',
      page: 1
    },
    searchResult: {
      data: [],
      totalCount: 0,
      query: {
        login: '',
        order: '',
        page: 1,
      },
    },
    loading: false,
  },
  getters: {
    totalPages: state => {
      return Math.ceil(state.searchResult.totalCount / 30);
    },
    currentPage: state => { return state.searchResult.query.page },
    getField,
  },
  mutations: {
    SET_SEARCH_RESULT(state, data) {
      const { users, totalCount, query } = data;
      state.searchResult.data = users.map((user) => {
        return {
          id: user.id,
          login: user.login,
          avatarURL: user.avatar_url,
        }
      });
      state.searchResult.totalCount = totalCount;
      state.searchResult.query = { ...query };
    },
    SET_SEARCH_QUERY(state, value) {
      state.searchQuery = {
        ...state.searchQuery,
        ...value,
      }
    },
    SET_LOADING(state, value) {
      state.loading = value;
    },
    updateField,
  },
  actions: {
    async fetchUsers ({ commit, state }) {
      commit('SET_LOADING', true);
      commit('RESET_MESSAGES');
      try {
        const {login, order, page} = state.searchQuery;
        const isValidQuery = login && order && page;
        if (!isValidQuery) throw new Error('Wrong request!');
        const response = await githubApiService.searchUsers(login, order, page);
        const users = response.items;
        // github api allows to fetch only up to 1000 users
        const totalCount = response.total_count > 1000 ? 1000 : response.total_count;
        commit('SET_SEARCH_RESULT', {
          users,
          totalCount,
          query: {
            login,
            order,
            page,
          },
        });
        let infoMessage = `Found ${totalCount} ${totalCount === 1 ? 'user' : 'users'}`;
        infoMessage += users.length > 1 ? `. On page: ${users.length}` : '';
        commit('SET_INFO_MESSAGE', infoMessage);
        commit('SET_ERROR_MESSAGE', '');
      } catch (error) {
        commit('SET_ERROR_MESSAGE', error.message);
      }
      commit('SET_LOADING', false);
    },
    setSearchQuery({ commit }, data) {
      commit('SET_SEARCH_QUERY', data);
    }
  }
}
