import { useDispatch, useSelector } from "react-redux";
import styles from "./CategoryPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts } from "../../store/features/categoryProductsSlice";
import CategoryProductsList from "../../components/menu/categoryProducts/CategoryProductsList";
import BackArrowButton from "../../components/UI/backArrowButton/BackArrowButton";
import Loader from "../../components/UI/loader/Loader";

function CategoryPage() {
  let { category } = useParams();

  const dispatch = useDispatch();

  const { products, isLoading, error } = useSelector(
    (state) => state.categoryProducts
  );

  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [dispatch, category]);

  return (
    <>
      <div className={styles.container}>
        <BackArrowButton className={styles.backButton} />
        <h1>{category}</h1>

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
          products.length > 0 && <CategoryProductsList products={products} />}
      </div>
    </>
  );
}

export default CategoryPage;
