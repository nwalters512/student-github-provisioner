import axios from 'axios'

import { baseUrl } from './util'

export default axios.create({ baseURL: baseUrl })

export const fetchCourses = async () => {
  const res = await axios.get('/api/courses')
  return res.data
}

export const whoami = async () => {
  const res = await axios.get('/api/whoami')
  return res.data
}

export const createRepo = async courseId => {
  const res = await axios.post(`/api/github/${courseId}`)
  return res.data
}
