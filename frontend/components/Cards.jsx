import React from 'react'

export default function Cards({products, handleEditChange, handleDelete}) {
  return (
    <div className="cards-container">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <div className="card-left-side">
              <h3 className="card-title">
                <span>{product.id}</span> {product.nome}
              </h3>
              <p className="card-description">{product.descricao}</p>
            </div>
            <div className="card-right-side">
              <a className="product-icon" href="#" onClick={() => handleEditChange(product)}><i className="fa-regular fa-pen-to-square product-icon"></i></a>
              <a className="product-icon" href="#" onClick={() => handleDelete(product.id)}><i className="fa-solid fa-delete-left"></i></a>
            </div>
          </div>
        ))}
    </div>
  )
}
