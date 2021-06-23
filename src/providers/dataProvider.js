import { fetchUtils } from 'react-admin'
import { stringify } from 'query-string'

const apiUrl = 'http://odc-ep.herokuapp.com/api'
// const httpClient = fetchUtils.fetchJson
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'appliction/json' })
  }
  const token = localStorage.getItem('bearerToken')
  options.headers.set('Authorization', `Bearer ${token}`)
  return fetchUtils.fetchJson(url, options)
}

const applyDocumentFilters = (document) => {
  document.id = document.id || document._id

  return document
}

export default {
  getList: (resource) => {
    // const { page, perPage } = params.pagination
    // const { field, order } = params.sort
    // const query = {
    // sort: JSON.stringify([field, order]),
    //   range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    // filter: JSON.stringify(params.filter),
    // }
    const url = `${apiUrl}/${resource}`
    return httpClient(url).then(({ json }) => ({
      data: json.data.map((document) => {
        return applyDocumentFilters(document)
      }),
      total: json.count
      // parseInt(headers.get('content-range').split('/').pop(), 10),
    }))
  },

  getOne: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: applyDocumentFilters(json.data),
    }))
  }
  ,
  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`
    return httpClient(url).then(({ json }) => ({ data: json }))
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }))
  },

  update: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: applyDocumentFilters(json.data)
    }))
  },

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }))
  },

  create: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => (
      console.log(json),
      {
        data: { id: 'json._id', res: json.data },
      }))
  },

  delete: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json }))
  },

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    console.log(params)
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'DELETE',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }))
  },
}