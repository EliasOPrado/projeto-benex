import React from "react";

export default function Cards(props) {
  /* 
   Cards component used to display created produts 
   Using different functionalities to edit products
   using the handleEditChange. And delete a product,
   using the handleDelete() function.

   Properties:
   - props:
     - products: State.
     - handleDelete(): Used to delete specific item.
     - handleEditChange(): Used to add actions when the button for update
       a specific product is clicked.
  */
  return (
    <div className="cards-container">
      {props.products.map((product) => (
        <div className="card" key={product.id}>
          <div className="card-left-side">
            <h3 className="card-title">
              {product.nome}
            </h3>
            <p className="card-description">{product.descricao}</p>
          </div>
          <div className="card-right-side">
            <a className="product-icon" href="#" onClick={() => props.handleEditChange(product)}><i className="fa-regular fa-pen-to-square product-icon"></i></a>
            <a className="product-icon" href="#" onClick={() => props.handleDelete(product.id)}><i className="fa-solid fa-delete-left"></i></a>
          </div>
        </div>
      ))}
    </div>
  )

}
