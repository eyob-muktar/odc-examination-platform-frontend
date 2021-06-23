
export default {
  // called when the user attempts to log in
  login: async ({ email, password }) => {

    const request = new Request('http://odc-ep.herokuapp.com/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(({ accessToken, user, organizations }) => {
        console.log(organizations)
        localStorage.setItem('permission', user.role)
        localStorage.setItem('bearerToken', accessToken)
        organizations ? localStorage.setItem('org-id', organizations[0]._id) : ''

      })
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem('bearerToken')
    localStorage.removeItem('permission')
    localStorage.removeItem('org-id')
    return Promise.resolve()
  },
  // called when the API returns an error
  checkError: () => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('bearerToken')
      return Promise.reject()
    }
    return Promise.resolve()
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem('bearerToken')
      ? Promise.resolve()
      : Promise.reject()
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => {
    const role = localStorage.getItem('permission')
    return Promise.resolve(role)
  }
}