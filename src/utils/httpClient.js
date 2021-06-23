import { fetchUtils } from 'react-admin'

const HttpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'appliction/json' })
  }
  console.log('aa')
  const { token } = JSON.parse(localStorage.getItem('bearerToken'))
  options.headers.set('Authorization', `Bearer ${token}`)
  return fetchUtils.fetchJson(url, options)
}

export default HttpClient