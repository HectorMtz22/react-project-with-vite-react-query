import useProducts from '../hooks/useProducts'

export function Products () {
  const { isLoading, isError, error, products, handleDelete, handleUpdate } = useProducts()

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
