import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import Cards from "../components/Cards";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState(0.0);
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isPostForm, setIsPostForm] = useState(false)
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
        resetFormFields();
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
          resetFormFields();
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

  const handleAddNewProduct = () => {
    setShowForm(true);
    setIsPostForm(true);
    setName("");
    setValue(0.0);
    setDescription("");
  };

  // send the current item from the list
  // to the form
  const handleEditChange = (instance) => {
    setName(instance.nome);
    setValue(instance.valor);
    setCurrentItemId(instance.id);
    setDescription(instance.descricao);
    setShowForm(true);
    setIsPostForm(false);
  }

  const resetFormFields = () => {
    setName("");
    setValue(0.0);
    setDescription("");
    setIsPostForm(false);
  };
  

  return (
    <div className="main-container">
       <Navbar 
       showForm={showForm} 
       setShowForm={setShowForm} 
       handleAddNewProduct={handleAddNewProduct} 
       />
      {
        showForm ?
        <Form
          handlePost={handlePost}
          handleUpdate={handleUpdate}
          name={name}
          handleNameChange={handleNameChange}
          value={value}
          handleValueChange={handleValueChange}
          description={description}
          handleDescriptionChange={handleDescriptionChange}
          isPostForm={isPostForm}
         />
        :
      <Cards 
        products={products}
        handleEditChange={handleEditChange}
        handleDelete={handleDelete}
      />
      }
    </div>
  );
}

export default App;
