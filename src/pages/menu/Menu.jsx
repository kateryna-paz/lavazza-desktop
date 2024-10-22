import CategoryList from "../../components/menu/categoryList/CategoryList";
import styles from "./Menu.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/features/menuSlice";
import { addToCart } from "../../store/features/cartSlice";
import Loader from "../../components/UI/loader/Loader";
import Cart from "../../components/menu/cart/Cart";
import CategoryProductsList from "../../components/menu/categoryProducts/CategoryProductsList";
import BackArrowButton from "../../components/UI/backArrowButton/BackArrowButton";

function Menu() {
  const dispatch = useDispatch();

  const { categories, isLoading, error } = useSelector((state) => state.menu);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div className={styles.menuContainer}>
      <div className={styles.leftPanel}>
        <Cart />
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.flexHeader}>
          {selectedCategory && (
            <BackArrowButton
              className={styles.backButton}
              onClick={() => setSelectedCategory(null)}
            />
          )}
          <h1>{selectedCategory || "Categories"}</h1>
        </div>
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
          Array.isArray(categories) &&
          categories.length === 0 && <h3>No categories available.</h3>}

        {!isLoading &&
          !error &&
          Array.isArray(categories) &&
          categories.length > 0 &&
          !selectedCategory && (
            <CategoryList
              categories={categories}
              onCategoryClick={handleCategoryClick}
            />
          )}

        {selectedCategory && (
          <>
            <CategoryProductsList
              category={selectedCategory}
              addToCart={handleAddToCart}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Menu;
