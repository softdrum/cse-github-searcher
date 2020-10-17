import search from '@/store/modules/search.store.js'
require('jest-fetch-mock').enableMocks()
import "babel-polyfill";
fetchMock.dontMock();

const query = {
  input: "test",
  selectValue: "desc",
}

const mockResponseData = {
  total_count: 1,
  items: [
    {
      id: 1,
      login: 'test',
      avatar_url: 'some url'
    }
  ]
}

const searchResult = {
  users: mockResponseData.items,
  totalCount: mockResponseData.total_count,
  query: {
    login: query.input,
    order: query.selectValue,
    page: 1,
  },
}

fetchMock.mockIf(/^https?:\/\/api.github.com\/search\/users.*$/, req => {
  return Promise.resolve({
    ok: true,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mockResponseData)
  })
})

describe("fetch users", () => {
  beforeEach(() => {
    fetchMock.doMock();
  })
  
  it("gets users using fetch api and commits mutation SET_SEARCH_RESULT", async () => {
    const commit = jest.fn()
    await search.actions.fetchUsers({commit}, query)
    expect(commit).toHaveBeenCalledWith('SET_SEARCH_RESULT', searchResult);
  })
})