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
  const [isPostForm, setIsPostForm] = useState(false);
  const [currentId, setCurrentItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    /*
     fetches data from the backend server
     and set the data to the `products`state.
    */
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
    /*
      Deletes a single item from database based on the itemId

      Behaviours:
      - setIsloading(): State used to block button during request.
      - fetchData(): Used to retrieve data from db updating the product view.
    */
    // block button during request.
    setIsLoading(true)

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/produtos/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        fetchData();
      } else {
        console.error("Error deleting item:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }finally {
      // block button during request.
      setIsLoading(false)
    }
  };

  const handleUpdate = async (event) => {
    /*
      Updates a single item from database based on the itemId

      Behaviours:
      - setShowForm(): Used to hide/show form
      - fetchData(): Used to retrieve data from db updating the product view.
      - setCurrentId(): Used to get the id that will be used into the update function.
      - resetFormFields(): Used to reset the fields from the form after the response.ok.
    */
    event.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/produtos/${currentId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: name,
            valor: value,
            descricao: description,
          }),
        }
      );

      if (response.ok) {
        fetchData();
        setShowForm(false);
        setCurrentItemId(null);
        resetFormFields();
      } else {
        console.error("Error updating item:", response.status);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handlePost = async (event) => {
    /*
      Function used to create a new post into DB.

      Behaviours:
      - setIsLoading(): Load balancing to avoid sending multiple posts when-
        clicking button multiple times.
      - fetchData(): Used to retrieve data from db updating the product view.
      - setShowForm(): Used to hide/show form.
      - resetFormFields(): Used to reset the fields from the form after the response.ok.
    */
    event.preventDefault();

    // block button during request.
    setIsLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/produtos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        console.error("Error updating item:", response.status);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // functions for form inputs that will
  // be used to send to the request..
  const handleNameChange = (event) => {
    // get name input value
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    // get description input value
    setDescription(event.target.value);
  };

  const handleValueChange = (event) => {
    // get valor input value
    setValue(event.target.value);
  };

  const handleAddNewProduct = () => {
    /*
    Actions setted when button to create
    new product is clicked.
    */
    setShowForm(true);
    setIsPostForm(true);
    setName("");
    setValue(0.0);
    setDescription("");
  };

  const handleEditChange = (instance) => {
    /*
    Actions setted when button to to update
    a specific product is clicked.
    */
    setName(instance.nome);
    setValue(instance.valor);
    setCurrentItemId(instance.id);
    setDescription(instance.descricao);
    setShowForm(true);
    setIsPostForm(false);
  };

  const resetFormFields = () => {
    // reset all the form fields
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
      {showForm ? (
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
          isLoading={isLoading}
        />
      ) : (
        <Cards
          products={products}
          handleEditChange={handleEditChange}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
