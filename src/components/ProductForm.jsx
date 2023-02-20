import { useMutation, useQueryClient } from 'react-query'
import { createProduct } from '../api/productsAPI'

export function ProductForm () {
  const queryClient = useQueryClient()
  const addProductMutation = useMutation({
    mutationKey: 'createProduct',
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const product = Object.fromEntries(formData)
    addProductMutation.mutate({
      ...product,
      inStock: true
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' name='name' placeholder='Enter the name of the product' required />

      <label htmlFor='description'>Description</label>
      <input type='text' id='description' name='description' placeholder='Enter the description' required />

      <label htmlFor='price'>Price</label>
      <input type='number' id='price' name='price' placeholder='$ USD' required />

      <button type='submit'>Add Product</button>
    </form>
  )
}
