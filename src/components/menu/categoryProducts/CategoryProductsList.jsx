import PropTypes from "prop-types";
import ProductCard from "../productCard/ProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/features/categoryProductsSlice";

import Loader from "../../UI/loader/Loader";
import styles from "./CategoryProductsList.module.css";

CategoryProductsList.propTypes = {
  category: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
};

function CategoryProductsList({ category, addToCart }) {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(
    (state) => state.categoryProducts
  );

  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [dispatch, category]);
  return (
    <div className={styles.container}>
      {isLoading && <Loader />}

      {error && (
        <h3>
          An error occurred during fetching categories, please try again.
          <br />
          {error}
        </h3>
      )}

      {!isLoading &&
        !error &&
        Array.isArray(products) &&
        products.length === 0 && <h3>No products available.</h3>}

      {!isLoading &&
        !error &&
        Array.isArray(products) &&
        products.length > 0 && (
          <div className="pl-4 flex flex-row flex-wrap justify-evenly gap-3">
            {products.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  margin={"10px 0"}
                  addToCart={addToCart}
                />
              );
            })}
          </div>
        )}
    </div>
  );
}

export default CategoryProductsList;
