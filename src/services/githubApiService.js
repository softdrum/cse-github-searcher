import api from './api';

export default {
  searchUsers(login, order, page) {
    const query = `?q=${login}&sort=repositories&order=${order}&page=${page}`;
    return api.get(`search/users${query}`);
  },
  getUserByLogin(login) {
    return api.get(`users/${login}`);
  },
  getUserRepos(login) {
    return api.get(`users/${login}/repos`);
  }
}
