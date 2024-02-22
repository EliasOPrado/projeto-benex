export default function Navbar({ showForm, setShowForm, handleAddNewProduct }) {
    return (
      <>
        <div className="navbar">
          <h3 className="logo">Bnex Challenge</h3>
          {showForm ? (
            <button type="submit" className="update-button-navbar" onClick={() => setShowForm(false)}>
              Back to products
            </button>
          ) : (
            <button type="submit" className="update-button-navbar" onClick={handleAddNewProduct}>
              Add a new product
            </button>
          )}
        </div>
      </>
    );
  }