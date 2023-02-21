import { useQuery, useMutation, useQueryClient } from 'react-query'
import { deleteProduct, getProducts, updateProduct } from '../api/productsAPI'

export default function useProducts () {
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
    deleteProductMutation.mutate(id)
  }
  const handleUpdate = (product) => {
    updateProductMutation.mutate(product)
  }

  return {
    isLoading,
    products,
    error,
    isError,
    handleDelete,
    handleUpdate
  }
}
