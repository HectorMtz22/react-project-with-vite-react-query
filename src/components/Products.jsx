import { useQuery } from 'react-query'
import { getProducts } from '../api/productsAPI'

export function Products () {
  const { isLoading, data: products, error, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id)
  })

  if (isLoading) return <h2>Loading...</h2>
  else if (isError) return <h2>{error.message}</h2>

  return products.map((product) => (
    <div key={product.id}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button>Delete</button>
      <input type='checkbox' name='stock' id={product.id} disabled={!product?.inStock} checked={product?.inStock} readOnly />
      <label htmlFor={product.id}>In Stock</label>
    </div>
  ))
}
