const apiURL = 'https://api.github.com';
// import { fetch } from 'whatwg-fetch'; // NEEDS TO BE COMMENTED WHEN JEST TESING
/**
 * wrap fetch into post and get functions
 * with error checking
 */
const checkForError = response => {
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export default {
  async get (route) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`${apiURL}/${route}`, requestOptions);
    return checkForError(response);
  },
  async post (route, data) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    const response = await fetch(`apiURL/${route}`, requestOptions);
    return checkForError(response);
  }
}