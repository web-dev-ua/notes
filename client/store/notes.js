import { createFormData, createPutFormData } from '@/services/helpers'

export const actions = {
  async index (context, params) {
    return await this.$axios.get('notes', { params })
  },
  async show (context, id) {
    return await this.$axios.get(`notes/${id}`)
  },
  async create (context, payload) {
    const fd = createFormData(payload)
    return await this.$axios.post('notes', fd)
  },
  async update (context, payload) {
    const fd = createPutFormData(payload)
    return await this.$axios.post(`notes/${payload.id}`, fd)
  },
  async remove (context, id) {
    return await this.$axios.delete(`notes/${id}`)
  }
}
