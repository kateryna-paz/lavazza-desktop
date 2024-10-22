import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styles from "./BackArrowButton.module.css";
import PropTypes from "prop-types";

BackArrowButton.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func,
};

function BackArrowButton({ className, size = 60, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };
  return (
    <button className={`${styles.button} ${className}`} onClick={handleClick}>
      <IoArrowBackCircleOutline size={size} />
    </button>
  );
}

export default BackArrowButton;
