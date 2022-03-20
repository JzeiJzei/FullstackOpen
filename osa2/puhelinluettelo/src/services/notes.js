import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const getIDbyName = (name) => {
  return axios.get(baseUrl, {params: {name: name}}).then(res => res.data[0].id)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id , newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteResource = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll,
  getIDbyName,
  create,
  update,
  deleteResource
}