import { useState } from "react";
import Input from "../input/Input";
import styles from "./RegisterForm.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../auth/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterForm() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const authError = useSelector((state) => state.register.error);
  const dispatch = useDispatch();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => field === "")) {
      toast.error("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Your passwords do not match");
      return;
    }

    if (authError) {
      toast.error(authError);
      return;
    }
    const response = await dispatch(
      registerUser(
        formData.firstname,
        formData.lastname,
        formData.email,
        formData.password
      )
    );

    if (response.success) {
      toast.success(response.success);
      localStorage.setItem("userToken", response.token);
      setTimeout(() => {
        nav("/home");
      }, 3000);
    } else {
      toast.error(response.error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-32 before:h-32 before:-left-8 before:bottom-4 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-40 after:h-40 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-0 after:-right-12">
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.title}>Register</p>
        <p className={styles.message}>
          Create a new account for staff and signup now.
        </p>
        <div className={styles.flex}>
          <Input
            type="text"
            label={"Firstname"}
            required={true}
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label={"Lastname"}
            required={true}
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
          />
        </div>
        <Input
          type="email"
          label={"Email"}
          required={true}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          type="password"
          label={"Password"}
          required={true}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Input
          type="password"
          label={"Confirm password"}
          required={true}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <ToastContainer className="z-20" />
        <button type="submit" className={styles.submit}>
          Register
        </button>
        <p className={styles.signin}>
          Already have a staff account? <NavLink to={"/"}>Log in</NavLink>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
