import useProducts from '../../hooks/useProducts'

export const Product = ({ product }) => {
  const { handleDelete, handleUpdate } = useProducts()
  return (
    <div>
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
  )
}
