import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

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



  return (
    <div className="main-container">
      <div className="navbar">
        <h3 className="logo">Bnex Challenge</h3>
      </div>
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
              <i className="fa-regular fa-pen-to-square product-icon"></i>
              <a className="product-icon" href="#" onClick={() => handleDelete(product.id)}><i className="fa-solid fa-delete-left"></i></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
