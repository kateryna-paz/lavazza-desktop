import styles from "./CategoryCard.module.css";

import PropTypes from "prop-types";

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  category: PropTypes.string.isRequired,
  margin: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

function CategoryCard({ image, name, margin, onClick }) {
  return (
    <div
      className={styles.card}
      style={{ margin: margin }}
      onClick={() => {
        onClick(name);
      }}
      tabIndex={0}
    >
      <img src={image} alt={name} className={styles.image} />
      <h2 className={styles.name}>{name}</h2>
    </div>
  );
}

export default CategoryCard;
