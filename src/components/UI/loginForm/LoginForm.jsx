import { useState } from "react";
import Input from "../input/Input";
import styles from "./LoginForm.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../auth/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const nav = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(credentials).some((field) => field === "")) {
      toast.error("All fields are required");
      return;
    }

    const response = await dispatch(
      loginUser(credentials.email, credentials.password)
    );

    if (response.success) {
      toast.success(response.success);
      localStorage.setItem("userToken", response.token);
      setTimeout(() => {
        nav("/home");
      }, 2000);
    } else {
      toast.error(response.error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-32 before:h-32 before:-left-8 before:bottom-4 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-40 after:h-40 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-0 after:-right-12">
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.title}>Log In</p>
        <p className={styles.message}>
          Log in now and start your new work day!
        </p>
        <Input
          type="email"
          label={"Email"}
          required={true}
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
        />
        <Input
          type="password"
          label={"Password"}
          required={true}
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
        />
        <ToastContainer className="z-20" />
        <button type="submit" className={styles.submit}>
          Login
        </button>
        <p className={styles.signin}>
          Have not got a staff account yet?{" "}
          <NavLink to={"/register"}>Register now</NavLink>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
