import React from 'react'

export default function Form(props) {

  return (
    <div className="form-container">
      {props.isPostForm ? 
        <h3>Add A New Product</h3>
        :
        <h3>Update Product</h3>
      }
      <form onSubmit={props.isPostForm ? props.handlePost : props.handleUpdate} className="form">
        <input 
        type="text" 
        name="nome"
        value={props.name}
        onChange={props.handleNameChange}
        className="main-input" />
        <input 
        type="number" 
        name="valor" 
        value={props.value}
        onChange={props.handleValueChange}
        className="main-input" />
        <textarea 
        rows="5" 
        cols="33"
        onChange={props.handleDescriptionChange}
        value={props.description}
        className="text-area-input"></textarea>
        {props.isPostForm ? 
          <button 
          type="submit" 
          className="update-button"
          >Post
          </button>
        :
          <button 
          type="submit" 
          className="update-button"
          >Update
          </button>
        }
      </form>
  </div>
  )
}
