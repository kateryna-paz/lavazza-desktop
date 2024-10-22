import PropsTypes from "prop-types";
import styles from "./Input.module.css";

Input.propTypes = {
  className: PropsTypes.string,
  type: PropsTypes.string,
  placeholder: PropsTypes.string,
  required: PropsTypes.bool,
  name: PropsTypes.string,
  label: PropsTypes.string,
  value: PropsTypes.string,
  onChange: PropsTypes.func,
};

function Input({
  className,
  type,
  placeholder,
  required,
  name,
  label,
  value,
  onChange,
}) {
  return (
    <div className={styles.inputGroup}>
      <input
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
      {label && <label>{label}</label>}
      <div className={styles.underline}></div>
    </div>
  );
}

export default Input;
