import { useQuery, useMutation, useQueryClient } from 'react-query'
import { deleteProduct, getProducts, updateProduct } from '../api/productsAPI'

export function Products () {
  const {
    isLoading,
    data: products,
    error,
    isError
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id)
  })

  const queryClient = useQueryClient()
  const deleteProductMutation = useMutation({
    mutationKey: 'deleteProduct',
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    }
  })
  const updateProductMutation = useMutation({
    mutationKey: 'updateProduct',
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    }
  })

  const handleDelete = (id) => {
    console.log(id)
    deleteProductMutation.mutate(id)
  }
  const handleUpdate = (product) => {
    console.log(product)
    updateProductMutation.mutate(product)
  }

  if (isLoading) return <h2>Loading...</h2>
  else if (isError) return <h2>{error.message}</h2>

  return products.map((product) => (
    <div key={product.id}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={() => handleDelete(product.id)}>Delete</button>
      <input
        type='checkbox'
        name='stock'
        id={product.id}
        checked={product?.inStock}
        onChange={(e) =>
          handleUpdate({ ...product, inStock: e.target.checked })}
      />
      <label htmlFor={product.id}>In Stock</label>
    </div>
  ))
}
