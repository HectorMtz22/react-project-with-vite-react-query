import useProducts from '../hooks/useProducts'
import { Product } from './Product'

export function Products () {
  const { isLoading, isError, error, products } = useProducts()

  if (isLoading) return <h2>Loading...</h2>
  else if (isError) return <h2>{error.message}</h2>

  return products.map((product) => (
    <Product product={product} key={product.id} />
  ))
}
