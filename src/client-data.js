import axios from 'axios'

import { baseUrl } from './util'

const baseAxios = axios.create({ baseURL: baseUrl })

export default baseAxios

export const fetchCourses = async () => {
  const res = await baseAxios.get('/api/courses')
  return res.data
}

export const whoami = async () => {
  const res = await baseAxios.get('/api/whoami')
  return res.data
}

export const createRepo = async courseId => {
  const res = await baseAxios.post(`/api/github/${courseId}`)
  return res.data
}
