import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import "./Login.css";
import { fetchCurrentUser, loginUser } from "../../slices/userSlice";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Проверка на пустые поля
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Email and password must not be empty", {toastId: "empty_fields"});
      return; // Прерываем выполнение, если какое-либо поле пустое
    }

    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        dispatch(fetchCurrentUser());
        navigate("/");
        toast.success("You logged in.", {toastId: "login_success"});
      })
      .catch((error) =>
        toast.error(error.message || "An unexpected error occurred", {toastId: "login_error"})
      );
  };

  const handleSignUpClick = () => {
    navigate("/reg");
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Log in</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label htmlFor="email" className="login-form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="login-form-field"
            placeholder="Enter your email address"
          />
        </div>
        <div className="login-form-group">
          <div className="login-password-label-container">
            <label htmlFor="password" className="login-form-label">
              Password
            </label>
            <button
              onClick={togglePasswordVisibility}
              type="button"
              className="login-toggle-password"
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
              {isPasswordVisible ? (
                <BiHide className="icon" />
              ) : (
                <BiShow className="icon" />
              )}
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="login-form-field"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="submit-log-button">
          Log in
        </button>
        <div className="line" />
        <div className="login-register-helper">Don't have an account?</div>
        <button onClick={handleSignUpClick} className="registration-button">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Login;
