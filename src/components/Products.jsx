import { useQuery } from 'react-query'
import { getProducts } from '../api/productsAPI'

export function Products () {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })

  if (isLoading) return <h2>Loading...</h2>
  else if (isError) return <h2>{error.message}</h2>

  return (
    <div>
      <h2>Products</h2>
      {JSON.stringify(data)}
    </div>
  )
}
