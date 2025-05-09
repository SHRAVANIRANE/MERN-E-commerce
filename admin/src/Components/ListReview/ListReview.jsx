import React from "react";
import "./ListReview.css";
const ListReview = () => {
  const [allproducts, setAllProducts] = useState([]);

  // Fetching data from the backend API
  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allreviews")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo(); // Fetch updated data after removing a product
  };

  return (
    <div className="list-revew">
      <h1>All Reviews List</h1>
      <div className="listreview-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listreview-allproducts">
        {allproducts.map((product, index) => {
          return (
            <React.Fragment key={index}>
              <div className="listreview-format-main listreview-format">
                <img
                  src={product.image}
                  className="listreview-review-icon"
                  alt=""
                />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => remove_product(product.id)}
                  className="listproduct-remove-icon"
                  src={cross_icon}
                  alt="Remove product"
                />
              </div>
              <hr /> {/* Add hr tag after each product */}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
export default ListReview;
