import githubApiService from '@/services/githubApiService';

const initialState = () => ({
  id: null,
  login: null,
  name: null,
  avatarURL: null,
  info: {
    company: null,
    location: null,
    email: null,
    twitter: null, 
    blog: null,
  },
  followers: 0,
  following: 0,
  bio: null,
  createdAt: null,
  repos: [],
});

export default {
  state: initialState(),
  getters: {
  },
  mutations: {
    SET_USER(state, data) {
      Object.keys(state).forEach(key => {
        switch (key) {
          case 'info': {
            state.info.company = data.company;
            state.info.location = data.location;
            state.info.email = data.email;
            state.info.twitter = data.twitter_username;
            state.info.blog = data.blog;
            break;
          }
          case 'avatarURL': {
            state[key] = data.avatar_url;
            break;
          }
          case 'createdAt': {
            state[key] = data.created_at;
            break;
          }
          default: {
            state[key] = data[key];
            break;
          }
        }
      })
    },
    SET_REPOS(state, data) {
      state.repos = data.slice(0,4).map((repo) => {
        return {
          id: repo.id,
          name: repo.name,
          fork: repo.fork,
          description: repo.description,
          language: repo.language,
          url: repo.html_url
        }
      })
    },
    RESET_USER(state) {
      const newState = initialState();
      Object.keys(newState).forEach(key => {
        state[key] = newState[key]
      });
    }
  },
  actions: {
    async getUser({ commit }, login) {
      commit('SET_LOADING', true);
      try {
        const response = await githubApiService.getUserByLogin(login);
        const data = await githubApiService.getUserRepos(login);
        commit('SET_USER', response);
        commit('SET_REPOS', data);
        commit('SET_ERROR_MESSAGE', '');
      } catch (error) {
        commit('SET_ERROR_MESSAGE', 'User not found');
      }
      commit('SET_LOADING', false);
    },
    resetUser({ commit }) {
      commit('RESET_USER');
    }
  }
}
