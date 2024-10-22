import styles from "./Button.module.css";
import PropTypes from "prop-types";

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.string,
  onClick: PropTypes.func,
};

function Button({ className, children, width, height, fontSize, onClick }) {
  const customStyles = {
    width: width || "auto",
    height: height || "auto",
    fontSize: fontSize || "1rem",
  };

  return (
    <button
      className={styles[className] || styles.defaultButton}
      style={customStyles}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
