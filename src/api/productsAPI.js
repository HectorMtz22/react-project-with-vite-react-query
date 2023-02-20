import axios from 'axios'

const productsApi = axios.create({
  baseURL: 'http://localhost:3000/products'
})

export const getProducts = async () => {
  const res = await productsApi.get('/')
  return res.data
}

export const createProduct = async (product) => {
  const res = await productsApi.post('/', product)
  return res.data
}

export const deleteProduct = async (id) => {
  return await productsApi.delete(`/${id}`)
}

export const updateProduct = (product) => {
  return productsApi.put(`/${product.id}`, product)
}
