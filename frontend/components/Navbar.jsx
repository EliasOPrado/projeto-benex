export default function Navbar(props) {
  /*
   Navbar component used to display logo and buttons
   conditionally.

   Properties:
   - props:
      - showForm: State
      - setShowForm: State setter
      - handleAddNewProduct(): 
  */
    return (
      <>
        <div className="navbar">
          <h3 className="logo">Bnex Challenge</h3>
          {props.showForm ? (
            <button type="submit" className="update-button-navbar" onClick={() => props.setShowForm(false)}>
              Back to products
            </button>
              ) : (
            <button type="submit" className="update-button-navbar" onClick={props.handleAddNewProduct}>
              Add a new product
            </button>
          )}
        </div>
      </>
    );
  }