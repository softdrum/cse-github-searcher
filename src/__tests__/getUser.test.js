import userModule from '@/store/modules/user.store.js'
require('jest-fetch-mock').enableMocks()
import "babel-polyfill";
/**
 * WARNING!!!
 * jest-fetch-mock does not work with whatwg-fetch polyfill
 * so to pass this test you need to comment out whatwg import in api.js file
 */
fetchMock.dontMock();

const user = "test";

const userResponseData = {
  id: 1,
  login: 'test',
  name: 'username'
}
const reposResponseData = [
  {
    id: 11,
    name: 'repoName',
    language: 'Javascript'
  }
]

fetchMock.mockIf(/^https?:\/\/api.github.com\/users\/.*$/, req => {
  let data;
  if (req.url.endsWith(`/${user}`)) {
    data = userResponseData;
  } else if (req.url.endsWith(`/${user}/repos`)) {
    data = reposResponseData;
  }
  return Promise.resolve({
    ok: true,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
})

describe("get user", () => {
  beforeEach(() => {
    fetchMock.doMock();
  })
  
  it("gets user and repos from api and commits SET_USER and SET_REPOS", async () => {
    const commit = jest.fn()
    await userModule.actions.getUser({commit}, user)
    expect(commit).toHaveBeenCalledWith('SET_USER', userResponseData);
    expect(commit).toHaveBeenCalledWith('SET_REPOS', reposResponseData);
  })
  
  it("commit SET_ERROR_MESSAGE 'User not found' if no user found", async () => {
    const commit = jest.fn()
    await userModule.actions.getUser({commit}, 'nonExistentUser')
    expect(commit).toHaveBeenCalledWith('SET_ERROR_MESSAGE', 'User not found');
  })
})