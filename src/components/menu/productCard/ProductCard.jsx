import styles from "./ProductCard.module.css";
import PropTypes from "prop-types";

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  margin: PropTypes.string,
  addToCart: PropTypes.func.isRequired,
};

function ProductCard({ product, margin, addToCart }) {
  const { name, amount, variations, price } = product;

  const handleAddToCart = (name, size = null, amount, price) => {
    addToCart({ name, size, amount, price, quantity: 1 });
  };

  return (
    <div className={styles.card} style={{ margin: margin }}>
      <div className={styles.cardTitle}>
        <h1>{name}</h1>
      </div>

      <div className={styles.cardContent}>
        {variations && variations.length > 0 ? (
          variations.map((variation) => (
            <div className={styles.cardVariation} key={variation.size}>
              <p>
                Size: {variation.size[0]} ({variation.amount}ml)
              </p>
              <p>Price: {variation.price}₴</p>
              <button
                className={styles.addToCartButton}
                onClick={() =>
                  handleAddToCart(
                    name,
                    variation.size,
                    variation.amount,
                    variation.price
                  )
                }
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <div className={styles.cardDescription}>
            {amount && (
              <p>
                Amount: {amount}
                {typeof amount === "string" && amount.includes("ml")
                  ? ""
                  : "ml"}
              </p>
            )}
            {price && <p>Price: {price}₴</p>}
          </div>
        )}
      </div>

      {!variations && (
        <button
          className={styles.addToCartButton}
          onClick={() => handleAddToCart(name, null, amount, price)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
