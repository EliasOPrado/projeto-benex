import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState(0.0);
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentId, setCurrentItemId] = useState(null)


  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/produtos/`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching food trucks:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/produtos/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error('Error deleting item:', response.status);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // make the update request
  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/produtos/${currentId}/`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: name,
          valor: value,
          descricao: description,
        }),
      });

      if (response.ok) {
        fetchData();
        setShowForm(false);
        setCurrentItemId(null);
      } else {
        console.error('Error updating item:', response.status);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

    // make the post request
    const handlePost = async (event) => {
      event.preventDefault();
  
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/produtos/`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: name,
            valor: value,
            descricao: description,
          }),
        });
  
        if (response.ok) {
          fetchData();
          setShowForm(false);
          setCurrentItemId(null);
        } else {
          console.error('Error updating item:', response.status);
        }
      } catch (error) {
        console.error('Error updating item:', error);
      }
    };
  
  // functions for form inputs that will
  // be used to send to the request..
  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleValueChange = (event) => {
    setValue(event.target.value)
  }

  // send the current item from the list
  // to the form
  const handleEditChange = (instance) => {
    setName(instance.nome);
    setValue(instance.valor);
    setCurrentItemId(instance.id);
    setDescription(instance.descricao);
    setShowForm(true);
  }

  return (
    <div className="main-container">
      <div className="navbar">
        <h3 className="logo">Bnex Challenge</h3>
        {showForm &&
        <button type="submit" className="update-button-navbar" onClick={() => setShowForm(false)}>Back to products</button>
        }
      </div>
      {showForm ?
        <div className="form-container">
          <h3>Update Product</h3>
          <form onSubmit={handleUpdate} className="form">
            <input 
            type="text" 
            name="nome"
            value={name}
            onChange={handleNameChange}
            className="main-input" />
            <input 
            type="number" 
            name="valor" 
            value={value}
            onChange={handleValueChange}
            className="main-input" />
            <textarea 
            rows="5" 
            cols="33"
            onChange={handleDescriptionChange}
            value={description}
            className="text-area-input"></textarea>
            <button 
            type="submit" 
            className="update-button"
            >Update</button>
          </form>
        </div>
        :
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
      }
    </div>
  );
}

export default App;
